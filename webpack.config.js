module.exports = {
    entry: './_dev/ts/Main.ts',
    output: {
        path: `${__dirname}/public`,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader']
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    devServer: {
        contentBase: `${__dirname}/public`,
        inline: true,
        hot: true
    },
    // ソースマップを有効に
    devtool: 'source-map'
};