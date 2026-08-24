import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/*
 * Make generated CSS non-render-blocking.
 *
 * CSS is preloaded first and then applied asynchronously.
 * This removes CSS files from the initial render-blocking
 * request chain while still loading them with high priority.
 */
const deferCss = () => ({
  name: "defer-css",

  transformIndexHtml(html) {
    return html.replace(
      /<link rel="stylesheet"([^>]*href="[^"]+\.css"[^>]*)>/g,
      (match, attrs) => {
        return `<link rel="preload" as="style"${attrs} onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet"${attrs}></noscript>`;
      }
    );
  },
});

export default defineConfig({
  plugins: [
    react(),
    deferCss(),
  ],

  build: {
    cssCodeSplit: true,

    minify: "esbuild",

    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});