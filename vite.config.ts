
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['leaflet', 'gsap', 'swiper']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      external: mode === 'development' ? [] : undefined,
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['gsap', 'swiper'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select']
        },
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    },
    chunkSizeWarningLimit: 1000
  }
}));
