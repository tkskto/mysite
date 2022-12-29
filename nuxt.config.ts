export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            title: 'Takeshi Kato',
            meta: [
                {name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.'},
            ],
            link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
        },
    },
    webpack: {
        extractCSS: true,
    },
    ssr: false,
    typescript: {
        strict: true,
    },
});
