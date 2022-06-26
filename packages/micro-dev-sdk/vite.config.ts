import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";

const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esNext",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MicroDevSdk",
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
