import { NuxtConfig } from '@nuxt/types';
import TerserPlugin from 'terser-webpack-plugin';

const config: NuxtConfig = {
    buildModules: ['@nuxt/typescript-build'],
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    },
    head: {
        htmlAttrs: {
            lang: 'en'
        },
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
        extractCSS: true,
        filenames: {
            app: ({ isDev }): string => isDev ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
            chunk: ({ isDev }): string => isDev ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
            css: ({ isDev }): string => isDev ? 'css/[name].css' : 'css/[name].[contenthash].css',
        },
        publicPath: '/common/',
    },
    ssr: false,
    modules: [
        '@nuxtjs/google-analytics',
        '@nuxtjs/sitemap'
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    generate: {
        dir: 'public/',
    },
    'google-analytics': {
        id: 'UA-71464541-3'
    },
    sitemap: {
        path: '/sitemap.xml',
        hostname: 'https://tkskto.me',
    },
};

export default config;
