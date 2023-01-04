import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV !== "production" ? "/test" : "/forms/",
  server: {
    host: true,
    port: 8081,
    fs: {
      strict: false,
      allow: ["."],
    },
    hmr: {
      host: ".ucontactcloud.com/test/ws",
    },
  },
});
