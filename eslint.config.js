import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dist-ssr']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    /* Every page must export a `route` alongside its component — that export
       is how the build discovers the page at all (see src/pages/README.md).
       Fast Refresh gives up on a module that exports a non-component, which
       for a page means a full reload on edit: an acceptable trade for a route
       table nobody has to maintain by hand. */
    files: ['src/pages/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': ['error', { allowExportNames: ['route'] }],
    },
  },
  {
    /* These two are primitive libraries rather than screens: class-name
       constants, a brand-asset helper, an inline-markup renderer. They are
       imported by components and are not themselves refreshable. */
    files: ['src/components/ui.tsx', 'src/components/PageLayout.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
