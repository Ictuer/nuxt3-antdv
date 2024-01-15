// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  modules: [
    '@ant-design-vue/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
      },
    ],
  ],
  ssr: false,
  antd: {},
  css: ['~/tailwind.css', '~/antd.css'],
  imports: {
    dirs: ['utils', 'use', 'store'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    server: {
      strictPort: true,
      hmr: {
        clientPort: 2302,
      },
      watch: {
        usePolling: true,
      },
    },
    vue: {
      script: {
        defineModel: true,
      },
    },
  },
  experimental: {
    payloadExtraction: false,
    noVueServer: true,
    appManifest: false,
  },
})
