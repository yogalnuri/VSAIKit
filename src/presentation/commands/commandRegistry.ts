/**
 * Command Registry
 *
 * Centralized command registration for the extension.
 * Registers all VS Code commands and their handlers.
 */

import * as vscode from 'vscode';
import { ExtensionLogger } from '@shared/utils/logger';
import { COMMANDS } from '@shared/constants';
import { SidebarProvider } from '../sidebar/sidebarProvider';
import { WebViewProvider } from '../webview/webviewProvider';

export class CommandRegistry {
  private logger = ExtensionLogger.getInstance();

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly sidebarProvider: SidebarProvider,
    private readonly webviewProvider: WebViewProvider
  ) {}

  public registerCommands(): void {
    this.registerHelloWorldCommand();
    this.registerOpenSidebarCommand();
    this.registerOpenWebViewCommand();

    this.logger.info('All commands registered successfully');
  }

  private registerHelloWorldCommand(): void {
    const disposable = vscode.commands.registerCommand(COMMANDS.HELLO_WORLD, async () => {
      this.logger.info('Hello World command executed');
      await vscode.window.showInformationMessage('Hello World! AI Extension is active.');
    });

    this.context.subscriptions.push(disposable);
  }

  private registerOpenSidebarCommand(): void {
    const disposable = vscode.commands.registerCommand(COMMANDS.OPEN_SIDEBAR, async () => {
      this.logger.info('Open Sidebar command executed');
      await vscode.commands.executeCommand('ai-assistant-view.focus');
    });

    this.context.subscriptions.push(disposable);
  }

  private registerOpenWebViewCommand(): void {
    const disposable = vscode.commands.registerCommand(COMMANDS.OPEN_WEBVIEW, async () => {
      this.logger.info('Open WebView command executed');
      this.webviewProvider.showPanel('AI Extension - Main Panel');
    });

    this.context.subscriptions.push(disposable);
  }
}
