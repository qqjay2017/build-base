import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";

const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2015",
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "HelpWebModule",
      formats: ["umd", "es"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  server: {
    proxy: {
      "/api/": {
        target: "http://ymsl.kxgcc.com:30872",
        // target: 'https://test-scm.kxgcc.com:30195',
        changeOrigin: true,
      },
      "/public/": {
        target: "http://ymsl.kxgcc.com:30872",
        changeOrigin: true,
      },
    },
  },
});
