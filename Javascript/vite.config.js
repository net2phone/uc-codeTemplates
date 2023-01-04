import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV !== "production" ? "/test" : "/forms/",
  server: {
    host: true,
    port: 8081,
    base: "/test/",
    fs: {
      strict: false,
      allow: ["."],
    },
    hmr: {
      host: ".ucontactcloud.com/test/ws",
    },
  },
});
