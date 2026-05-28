import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // ✅ Habilita ambiente de browser simulado (jsdom) para testes React
    environment: 'jsdom',

    // ✅ Arquivo de configuração global dos testes
    setupFiles: ['./src/tests/setupTests.js'],

    // ✅ Habilita APIs globais do Vitest (describe, it, expect) sem imports
    globals: true,

    // ✅ Configurações de cobertura de código
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/setupTests.js',
      ],
    },
  },
})
