import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      port: 3000,
    },
    plugins: [
      vue(),
      Pages(),
    ],
    resolve: {
      alias: [
        { find: '~', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      ],
    },
  }
})
