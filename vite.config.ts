import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  // One HTML entry, and it is only a shell. `pnpm build` runs three steps:
  // this client build, an SSR build of `src/entry-server.tsx`, and then
  // `scripts/prerender.mjs`, which writes a real HTML file per route per
  // language into dist/ and hands the client bundle markup to hydrate.
  //
  // Both languages used to be separate Vite entry points. They are not any
  // more, because every page needs both and hand-maintaining two HTML files
  // per page does not scale past the two we had.
  //
  // In dev, Vite's own fallback serves this shell for any unknown path, so
  // `/legal/`, `/es/`, `/es/legal/` and anything a new page adds all work
  // without configuration. The client reads the route and the language out of
  // location.pathname.
})
