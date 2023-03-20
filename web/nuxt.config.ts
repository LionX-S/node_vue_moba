// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';
export default defineNuxtConfig({
  modules:[
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
    css:{
      preprocessorOptions:{
        scss:{
          additionalData:'@use "@/assets/main.scss" as *;'
        }
      }
    }
  },
})
