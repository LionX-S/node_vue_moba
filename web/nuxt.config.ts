// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';
// 判断运行环境
export default defineNuxtConfig({
  devServer:{
    port: 8888
  },
  runtimeConfig:{
    public:{
      apiBase:''
    }
  },
  app: {
    head: {
      title: "电磁力",
      meta: [
        { name: 'keywords', content: '博客,nuxt3,电磁力,vue3,分享' },
        { name: 'description', content: '基于nuxt3的个人博客系统' }
      ]
    }
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
        vuetify()
      ))
    }
  ],
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/main.scss" as *;'
        }
      }
    }
  }
})
