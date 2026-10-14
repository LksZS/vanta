import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: "0.0.0.0", allowedHosts: true },
  preview: { host: "0.0.0.0", allowedHosts: true },
  build: {
    sourcemap: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "motion",
              test: /node_modules\/(motion|framer-motion|motion-dom|motion-utils)\//,
            },
            { name: "gsap", test: /node_modules\/(gsap|@gsap)\// },
          ],
        },
      },
    },
  },
});
