import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            directoryAsNamespace: true,
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js',  // 引入文件名的名称
                entryFileNames: 'js/[name]-[hash].js',  // 包的入口文件名称
                assetFileNames: '[ext]/[name]-[hash].[ext]' // 资源文件像 字体，图片等
            }
        }
    }
})
