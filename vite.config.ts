import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// 插件，无需手动引入 ref，reactive 等api
import AutoImport from 'unplugin-auto-import/vite'
// 插件，无需手动引入 公共组件 
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({ 
    	/* options */
    	// 这是vue3的配置
		  imports:['vue'],
      dts:"src/auto-import.d.ts" // 生成在src路径下名为auto-import.d.ts的声明文件
    }),
    Components({
      // ui库解析器，也可以自定义
      resolvers: [
        ElementPlusResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      // 配置公共组件引用路径，现已使用插件，不再手动引入组件，但此配置依然保留
      custom: resolve(__dirname, 'src/components/custom'),
      home: resolve(__dirname, 'src/components/home'),
      '@': resolve(__dirname, 'src'),
      // 配置静态图片引用路径
      '/images': './src/assets/images'
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境时移出console，移除断点
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
