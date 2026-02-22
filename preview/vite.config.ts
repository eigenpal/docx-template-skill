import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      allow: [
        // Allow serving files from project root and parent directories
        path.resolve(__dirname),
        path.resolve(__dirname, ".."),
        // Allow common project locations
        process.cwd(),
      ],
    },
  },
});
