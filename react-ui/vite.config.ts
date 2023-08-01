import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Configure the vite development server to proxy any requests it
      // receives on localhost:5173/hello to localhost:8080/
      '/hello': {
        // Using "localhost" doesn't work on all Node.js v20,
        // so using 127.0.0.1 is the safer option for compat
        target: 'http://127.0.0.1:8080/'
      }
    }
  }
})
