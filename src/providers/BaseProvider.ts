// src/providers/BaseProvider.ts
// Abstract base class for all OmniViewer CustomEditorProviders.
// Provides: nonce generation, webview URI mapping, theme detection, message helpers.

import * as vscode from 'vscode';
import * as crypto from 'crypto';
import { ExtensionMessage, WebviewMessage } from '../types';

export abstract class BaseProvider {
  protected readonly extensionUri: vscode.Uri;

  constructor(extensionUri: vscode.Uri) {
    this.extensionUri = extensionUri;
  }

  // ─── Nonce (Content-Security-Policy) ──────────────────────────────────────

  /** Generates a cryptographically random nonce for CSP. */
  protected generateNonce(): string {
    return crypto.randomBytes(16).toString('base64');
  }

  // ─── Webview URI helpers ──────────────────────────────────────────────────

  /**
   * Converts a local file URI so it can be used inside a webview.
   * VS Code requires all local resources to go through this conversion.
   */
  protected webviewUri(panel: vscode.WebviewPanel, ...pathSegments: string[]): vscode.Uri {
    return panel.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, ...pathSegments)
    );
  }

  // ─── Theme helpers ────────────────────────────────────────────────────────

  /** Returns true if VS Code is currently using a dark colour theme. */
  protected isDarkTheme(): boolean {
    const kind = vscode.window.activeColorTheme.kind;
    return kind === vscode.ColorThemeKind.Dark || kind === vscode.ColorThemeKind.HighContrast;
  }

  // ─── Message helpers ─────────────────────────────────────────────────────

  /** Sends a typed message from the extension host to the webview. */
  protected postMessage(panel: vscode.WebviewPanel, message: ExtensionMessage): void {
    panel.webview.postMessage(message);
  }

  /**
   * Registers a message listener from the webview and returns a disposable.
   * Override or chain this in subclasses.
   */
  protected onWebviewMessage(
    panel: vscode.WebviewPanel,
    handler: (msg: WebviewMessage) => void
  ): vscode.Disposable {
    return panel.webview.onDidReceiveMessage(handler);
  }

  // ─── CSP builder ─────────────────────────────────────────────────────────

  /**
   * Builds a strict Content-Security-Policy header string for webview HTML.
   * @param nonce - The nonce to allow for inline scripts
   * @param webview - The webview to derive the source policy from
   */
  protected buildCsp(nonce: string, webview: vscode.Webview): string {
    const src = webview.cspSource;
    return [
      `default-src 'none'`,
      `style-src ${src} 'unsafe-inline'`,
      `script-src 'nonce-${nonce}' ${src}`,
      `img-src ${src} data: blob:`,
      `font-src ${src}`,
      `worker-src blob:`,
      `connect-src 'none'`,
    ].join('; ');
  }
}
