import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 상대 경로로 빌드해 github.io와 claude 아티팩트 양쪽에서 같은 결과물을 쓴다
export default defineConfig({
  plugins: [react()],
  base: './',
})
