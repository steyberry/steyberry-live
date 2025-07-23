import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  base: command === 'build' ? '/steyberry/' : '/',
  build: {
    outDir: "dist",
  },
}));
