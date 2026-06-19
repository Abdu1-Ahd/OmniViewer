// src/extension.ts
// OmniViewer — Extension Entry Point
// Registers all CustomEditorProviders and activates the extension.

import * as vscode from 'vscode';

/**
 * Called by VS Code when the extension is first activated.
 * Registers every CustomEditorProvider defined in package.json contributes.customEditors.
 */
export function activate(context: vscode.ExtensionContext): void {
  console.log('[OmniViewer] Extension activated.');

  // ─── Providers will be registered here, one per phase ─────────────────────
  // Phase 1:  ImageProvider, SvgProvider
  // Phase 2:  ArchiveProvider
  // Phase 3:  CsvProvider
  // Phase 4:  ExcelProvider, ParquetProvider
  // Phase 5:  PdfProvider, EpubProvider
  // Phase 6:  Model3DProvider
  // Phase 7:  SqliteProvider, DuckdbProvider
  // Phase 8:  MarkdownProvider, MermaidProvider, DiagramProvider
  // ──────────────────────────────────────────────────────────────────────────

  vscode.window.showInformationMessage('OmniViewer is active — scaffold ready!');
}

/**
 * Called by VS Code when the extension is deactivated.
 */
export function deactivate(): void {
  console.log('[OmniViewer] Extension deactivated.');
}
