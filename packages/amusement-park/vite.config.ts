import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": {
        target: "http://ymsl.kxgcc.com:30872",
        // target: 'https://test-scm.kxgcc.com:30195',
        changeOrigin: true,
        pathRewrite: { "^": "" },
      },
      "/public/": {
        target: "http://ymsl.kxgcc.com:30872",
        changeOrigin: true,
        pathRewrite: { "^": "" },
      },
    },
  },
});
