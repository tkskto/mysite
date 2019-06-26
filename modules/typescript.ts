module.exports = function () {
    // Add .ts & .tsx extension to Nuxt
    this.nuxt.options.extensions.push('ts');

    // Extend build
    this.extendBuild(config => {
        // Add TypeScript
        config.module.rules.push({
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
                appendTsSuffixTo: [/\.vue$/],
                configFile: 'tsconfig.json',
            },
        });
        // Add .ts extension in webpack resolve
        if (!config.resolve.extensions.includes('.ts')) {
            config.resolve.extensions.push('.ts')
        }
    })
};
