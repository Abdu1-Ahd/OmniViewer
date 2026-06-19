// esbuild.js — Build script for OmniViewer extension
// Bundles src/extension.ts into dist/extension.js
// The webview HTML/CSS/JS files are NOT bundled (they are loaded directly via webview URIs).

const esbuild = require("esbuild");
const path = require("path");

const isWatch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: ["src/extension.ts"],
  bundle: true,
  outfile: "dist/extension.js",
  external: [
    "vscode", // VS Code API — never bundle this
  ],
  format: "cjs",
  platform: "node",
  target: "node18",
  sourcemap: true,
  minify: !isWatch,
  logLevel: "info",
};

if (isWatch) {
  esbuild.context(buildOptions).then((ctx) => {
    ctx.watch();
    console.log("OmniViewer: watching for changes...");
  });
} else {
  esbuild.build(buildOptions).then(() => {
    console.log("OmniViewer: build complete → dist/extension.js");
  }).catch(() => process.exit(1));
}
