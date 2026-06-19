// src/types.ts
// Shared TypeScript interfaces used across all providers and webviews.

import * as vscode from 'vscode';

// ─── Webview Message Protocol ──────────────────────────────────────────────

/** Messages sent FROM the extension host TO a webview panel. */
export type ExtensionMessage =
  | { type: 'init'; payload: unknown }
  | { type: 'chunk'; payload: unknown }
  | { type: 'error'; message: string }
  | { type: 'theme'; isDark: boolean };

/** Messages sent FROM a webview panel TO the extension host. */
export type WebviewMessage =
  | { type: 'ready' }
  | { type: 'requestChunk'; offset: number }
  | { type: 'openEntry'; path: string }    // Used by archive viewer
  | { type: 'extractEntry'; path: string }; // Used by archive viewer

// ─── Archive ───────────────────────────────────────────────────────────────

/** A single entry within a ZIP/TAR/7z/RAR archive. */
export interface ArchiveEntry {
  /** Full path within the archive, e.g. "folder/file.txt" */
  path: string;
  /** True if this entry is a directory */
  isDirectory: boolean;
  /** Uncompressed size in bytes (0 for directories) */
  size: number;
  /** Compressed size in bytes */
  compressedSize: number;
  /** Last modified date */
  modified?: Date;
}

// ─── Tabular Data ─────────────────────────────────────────────────────────

/** Metadata about a tabular file (CSV, XLSX, Parquet). */
export interface TabularMeta {
  /** Column headers */
  columns: string[];
  /** Estimated total row count (-1 if unknown) */
  rowCount: number;
  /** File size in bytes */
  fileSize: number;
}

// ─── Provider Context ─────────────────────────────────────────────────────

/** Common context passed to every provider's resolve method. */
export interface ProviderContext {
  extensionUri: vscode.Uri;
  document: vscode.CustomDocument;
  webviewPanel: vscode.WebviewPanel;
}
