import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: {
    host: true,  // 🔹 외부 접속 허용 (localhost 외부 IP 접근 가능)
    strictPort: true,
    port: 5173,  // 🔹 Vite 개발 서버 포트 (Ngrok과 일치해야 함)
    allowedHosts: ['.ngrok-free.app', 'localhost']  // 🔹 모든 Ngrok 도메인 허용
  }
});
