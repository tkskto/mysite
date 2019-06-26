const articles = require('./static/assets/blog/articles.json');
const isDev = (process.env.NODE_ENV !== 'production');
const generateDynamicRoutes = callback => {
    const routes = articles.map(item => {
        return `/blog/${item.title}/`;
    });
    callback(null, routes);
};

module.exports = {
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    },
    head: {
        title: 'Takeshi Kato',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' },
            { hid: 'http-equiv', name: 'http-equiv', content: 'IE=edge' }
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
        extactCss: true,
        filenames: {
            css: 'css/common.[contenthash].css',
            manifest: 'js/manifest.[hash].js',
            vendor: `js/common${isDev ? '' : '.[chunkhash:8]'}.js`,
            app: `js/app${isDev ? '' : '.[chunkhash:8]'}.js`,
            chunk: `js/[name]${isDev ? '' : '.[chunkhash:8]'}.js`
        },
        publicPath: '/common/',
        ssr: false
    },
    mode: 'spa',
    modules: [
        '~modules/typescript.ts',
        '@nuxtjs/google-analytics',
    ],
    generate: {
        dir: 'public/',
        routes: generateDynamicRoutes,
    },
    'google-analytics': {
        id: 'UA-71464541-3'
    },
    sitemap: {
        path: '/sitemap.xml',
        hostname: 'https://tkskto.me',
        generate: true,
        routes: generateDynamicRoutes,
    },
};
