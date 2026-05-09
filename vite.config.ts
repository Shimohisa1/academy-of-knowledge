import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
<<<<<<< HEAD
=======
import { viteSingleFile } from "vite-plugin-singlefile";
>>>>>>> 5408e3c (update)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()],
=======
  plugins: [react(), tailwindcss(), viteSingleFile()],
>>>>>>> 5408e3c (update)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
