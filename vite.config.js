import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
// target: "http://localhost:8000",
export default defineConfig({
  server: {
    proxy: {
      "/graphql": {
        target: "https://minha-api-nine.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
});
