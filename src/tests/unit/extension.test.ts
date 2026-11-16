/**
 * Extension Activation Test
 *
 * Tests the basic activation of the extension.
 */

import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Activation Tests', () => {
  test('Extension should be present', () => {
    const ext = vscode.extensions.getExtension('your-publisher.ai-vscode-extension');
    assert.ok(ext);
  });

  test('Extension should activate', async () => {
    const ext = vscode.extensions.getExtension('your-publisher.ai-vscode-extension');
    assert.ok(ext);
    await ext?.activate();
    assert.ok(ext?.isActive);
  });
});
