// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  experimental: {
    viteEnvironmentApi: true,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  site: {
    url: 'https://tkskto.me'
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Takeshi Kato',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "This is takeshi kato's Web site. I'm a frontend developer." },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  css: [
    '@/assets/css/common.css',
  ],
});
