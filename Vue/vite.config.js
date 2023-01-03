import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: process.env.NODE_ENV !== "production" ? "/test/" : "/forms/",
  // server: {
  //   host: true,
  //   port: 8081,
  //   // origin: "https://fcampanella.ucontactcloud.com/test",
  //   base: "/test/",
  //   fs: {
  //     strict: false,
  //     allow: ["."],
  //   },
  //   hmr:{
  //     host:".ucontactcloud.com/test/ws"
  //   }
  // },
});
