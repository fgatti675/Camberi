import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    // One entry point per language. Both load the same bundle; the locale is
    // read from the URL path. Separate HTML files give each language its own
    // <html lang>, title, description and hreflang tags, which is what makes
    // the two versions indexable as distinct pages.
    rollupOptions: {
      input: {
        en: resolve(__dirname, 'index.html'),
        es: resolve(__dirname, 'es/index.html'),
      },
    },
  },
})
