import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/mig_game/',
  server: {
    open: true,
    port: 3013
  }
});
