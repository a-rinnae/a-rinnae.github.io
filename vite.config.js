import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/discord-favorite-gif-tool/",
  plugins: [react()],
});
