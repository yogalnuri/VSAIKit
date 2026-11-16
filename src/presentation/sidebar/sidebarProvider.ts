/**
 * Sidebar Provider
 *
 * Manages the sidebar webview for the AI Assistant.
 * Implements VSCodeWebviewViewProvider interface.
 */

import * as vscode from 'vscode';
import { ExtensionLogger } from '@shared/utils/logger';

export class SidebarProvider implements vscode.WebviewViewProvider {
  private logger = ExtensionLogger.getInstance();
  private view?: vscode.WebviewView;

  constructor(private readonly extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    __context: vscode.WebviewViewResolveContext<unknown>,
    __token: vscode.CancellationToken
  ): void | Thenable<void> {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    webviewView.webview.html = this.getHtmlContent(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((message) => {
      this.handleMessage(message);
    });

    this.logger.info('Sidebar provider initialized');
  }

  private handleMessage(message: unknown): void {
    this.logger.debug('Sidebar message received', message);

    const msg = message as Record<string, unknown>;
    switch (msg.command) {
      case 'ready':
        this.logger.info('Sidebar ready');
        break;
      case 'sendMessage':
        this.handleSendMessage(msg.data);
        break;
      default:
        this.logger.warn(`Unknown sidebar command: ${msg.command}`);
    }
  }

  private handleSendMessage(data: unknown): void {
    this.logger.info('Processing message from sidebar', data);
    // TODO: Implement actual message processing
  }

  public sendMessage(message: unknown): void {
    if (this.view) {
      this.view.webview.postMessage(message);
    }
  }

  private getHtmlContent(__webview: vscode.Webview): string {
    const nonce = getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Assistant</title>
        <style>
          body {
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            padding: 20px;
            margin: 0;
          }
          .container {
            max-width: 100%;
          }
          h1 {
            font-size: 18px;
            margin-top: 0;
          }
          .status {
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            background-color: var(--vscode-editor-lineHighlightBackground);
          }
          .status.ready {
            color: #4ec9b0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>AI Assistant</h1>
          <div class="status ready" id="status">Ready to assist</div>
          <p>This is a minimal sidebar implementation.</p>
        </div>
        <script nonce="${nonce}">
          const vscode = acquireVsCodeApi();
          vscode.postMessage({ command: 'ready' });
        </script>
      </body>
      </html>`;
  }
}

function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
