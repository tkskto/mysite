module.exports = {
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    },
    head: {
        title: 'takeshi kato',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {hid: 'description', name: 'description', content: 'This is my hobby and record.'}
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: false,
    loadingIndicator: false,
    /*
    ** Build configuration
    */
    build: {
        vendor: ['three', 'three-device-orientation', 'gsap', 'vuex-class', 'nuxt-class-component'],
        extactCss: true,
        filenames: {
            css: 'css/common.[contenthash].css',
            manifest: 'js/manifest.[hash].js',
            vendor: 'js/common.[chunkhash].js',
            app: 'js/app.[chunkhash].js',
            chunk: 'js/[name].[chunkhash].js'
        },
        publicPath: '/common/',
        ssr: false
    },
    mode: 'spa',
    modules: ['~modules/typescript.ts'],
    generate: {
        dir: 'public/'
    }
};
