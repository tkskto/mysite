module.exports = {
    head: {
        title: 'takeshi kato',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: `This is my hobby and record.` }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    loading: { color: '#3B8070' },
    build: {
        extend: function (config, ctx) {
            if (ctx.dev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
            config.module.rules.push({
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules(?!(\/|\\)@nuxtjs)/,
                options: Object.assign({}, this.babelOptions)
            });
            config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin');
        },
        ssr: false,
        vendor: ['babel-polyfill', 'three', 'gsap']
    },
};
