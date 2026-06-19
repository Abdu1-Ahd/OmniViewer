# Skills

This folder stores **agent skill files** — reusable prompt instructions you can hand to an AI coding assistant to give it context-specific knowledge about OmniViewer.

## How to Use

1. Drop a `.md` skill file in this folder.
2. When starting a new session with your AI assistant, say:
   > "Read the skill file at `skills/<name>.md` and follow its instructions."

## Planned Skills

| File | Purpose |
|---|---|
| `adding-a-new-provider.md` | Step-by-step guide for implementing a new CustomEditorProvider |
| `webview-design-system.md` | CSS variables, component patterns, and UX rules for all webview panels |
| `testing-a-provider.md` | How to write and run unit tests for a new provider |
| `publishing.md` | How to cut a release: tag → CI → Open VSX → GitHub Release |
