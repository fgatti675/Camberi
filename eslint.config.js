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
    /* These two are primitive libraries rather than screens: class-name
       constants, a brand-asset helper, an inline-markup renderer. They are
       imported by components and are not themselves refreshable. */
    files: ['src/components/ui.tsx', 'src/components/PageLayout.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
