/**
 * WebView Provider
 *
 * Manages webview panels for detailed views.
 * Handles communication between the extension and webview content.
 */

import * as vscode from 'vscode';
import { ExtensionLogger } from '@shared/utils/logger';
import { IWebViewMessage, IWebViewResponse } from '@shared/types';

export class WebViewProvider {
  private logger = ExtensionLogger.getInstance();
  private panel?: vscode.WebviewPanel;

  constructor(private readonly extensionUri: vscode.Uri) {}

  public showPanel(title: string = 'AI Extension'): void {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.Beside);
      return;
    }

    this.panel = vscode.window.createWebviewPanel('aiWebview', title, vscode.ViewColumn.Beside, {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    });

    this.panel.webview.html = this.getHtmlContent();

    this.panel.webview.onDidReceiveMessage((message: IWebViewMessage) => {
      this.handleMessage(message);
    });

    this.panel.onDidDispose(() => {
      this.panel = undefined;
      this.logger.info('WebView panel disposed');
    });

    this.logger.info('WebView panel created');
  }

  private handleMessage(message: IWebViewMessage): void {
    this.logger.debug('WebView message received', message);

    const response: IWebViewResponse = {
      success: true,
      data: `Echo: ${message.command}`,
    };

    switch (message.command) {
      case 'getState':
        this.logger.info('Getting state from webview');
        break;
      case 'setState':
        this.logger.info('Setting state from webview', message.data);
        break;
      case 'sendMessage':
        this.logger.info('Processing message from webview', message.data);
        break;
      default:
        response.success = false;
        response.error = `Unknown command: ${message.command}`;
    }

    this.sendResponse(response);
  }

  private sendResponse(response: IWebViewResponse): void {
    if (this.panel) {
      this.panel.webview.postMessage(response);
    }
  }

  private getHtmlContent(): string {
    const nonce = getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Extension Webview</title>
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
            font-size: 20px;
            margin-top: 0;
          }
          .section {
            margin: 20px 0;
            padding: 15px;
            border-left: 3px solid var(--vscode-focusBorder);
            background-color: var(--vscode-editor-lineHighlightBackground);
            border-radius: 4px;
          }
          .section h2 {
            margin-top: 0;
            font-size: 14px;
          }
          button {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 16px;
            border-radius: 2px;
            cursor: pointer;
            font-size: 12px;
          }
          button:hover {
            background-color: var(--vscode-button-hoverBackground);
          }
          input {
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            padding: 8px;
            border-radius: 2px;
            font-family: var(--vscode-font-family);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>AI Extension</h1>
          
          <div class="section">
            <h2>Information</h2>
            <p>This is a minimal webview implementation with Clean Architecture foundation.</p>
            <p>The extension is ready for AI provider integration via Genkit.</p>
          </div>

          <div class="section">
            <h2>Test Communication</h2>
            <input type="text" id="messageInput" placeholder="Enter message..." />
            <button onclick="sendMessage()">Send Message</button>
          </div>

          <div class="section">
            <h2>Response</h2>
            <div id="response">Waiting for response...</div>
          </div>
        </div>

        <script nonce="${nonce}">
          const vscode = acquireVsCodeApi();

          function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value || 'test';
            vscode.postMessage({
              command: 'sendMessage',
              data: { text: message }
            });
          }

          window.addEventListener('message', event => {
            const message = event.data;
            document.getElementById('response').textContent = JSON.stringify(message, null, 2);
          });
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
