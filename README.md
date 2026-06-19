# OmniViewer

**The Ultimate Rich-File Viewer for VS Code.**

Tired of installing separate extensions for CSVs, PDFs, SVGs, and 3D models? OmniViewer is a unified, high-performance editor that allows you to preview and interact with virtually any structured or binary file type.

## Why OmniViewer?
- **Virtualized Tables:** Instantly open multi-gigabyte CSV, Excel, or Parquet files without crashing the editor.
- **Rich Media & Vectors:** Advanced SVG inspection (grids, color pickers) and 3D model viewing.
- **Archive Navigation:** Browse and extract specific files from ZIP/TAR archives directly in the editor.

## Supported Formats
Please see [`Language-List.txt`](./Language-List.txt) for the complete list, which includes:
- Tabular & Big Data (CSV, Parquet, Excel)
- Vector & Raster Graphics (SVG, WebP, AVIF)
- Archives & Compressed (ZIP, TAR, 7z)
- Structured Documents (PDF, EPUB)
- 3D Models & CAD (GLTF, STL, OBJ)
- Local Databases (SQLite, DuckDB)

## Architecture
Utilizes lazy-loaded WASM parsers and VS Code's Custom Editor API to keep memory footprint exceptionally low.
