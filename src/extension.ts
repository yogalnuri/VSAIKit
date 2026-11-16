/**
 * Extension Entry Point
 *
 * This is the main activation point for the VS Code extension.
 * It initializes the extension, registers commands, and sets up
 * the sidebar and webview panels.
 */

import * as vscode from 'vscode';
import { ExtensionLogger } from '@shared/utils/logger';
import { SidebarProvider } from '@presentation/sidebar/sidebarProvider';
import { WebViewProvider } from '@presentation/webview/webviewProvider';
import { CommandRegistry } from '@presentation/commands/commandRegistry';

let extensionContext: vscode.ExtensionContext;
const logger = ExtensionLogger.getInstance();

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  extensionContext = context;

  logger.info('Activating AI Extension...');

  try {
    // Register sidebar provider
    const sidebarProvider = new SidebarProvider(context.extensionUri);
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider('ai-assistant-view', sidebarProvider)
    );

    // Register webview panel provider
    const webviewProvider = new WebViewProvider(context.extensionUri);

    // Register commands
    const commandRegistry = new CommandRegistry(context, sidebarProvider, webviewProvider);
    commandRegistry.registerCommands();

    logger.info('AI Extension activated successfully');
  } catch (error) {
    logger.error('Failed to activate extension', error);
    throw error;
  }
}

export function deactivate(): void {
  logger.info('Deactivating AI Extension...');
}

export function getExtensionContext(): vscode.ExtensionContext {
  return extensionContext;
}
