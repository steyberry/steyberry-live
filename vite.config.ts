import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  base: '/',
  build: {
    outDir: "dist",
  },
}));
