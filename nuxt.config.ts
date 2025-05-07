// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    site: {
        url: 'https://tkskto.me'
    },
    devtools: { enabled: true },
    modules: [
        '@nuxt/ui',
        '@nuxt/eslint',
        '@nuxtjs/sitemap',
    ],
    ssr: false,
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
                { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
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
