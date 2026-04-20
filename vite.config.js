import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // Исправлено название пакета
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Устанавливаем @ как алиас для папки src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})