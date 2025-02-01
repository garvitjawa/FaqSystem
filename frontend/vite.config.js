import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // <-- Add this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.PORT}`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // <-- The alias will now resolve correctly
    },
  },
});
