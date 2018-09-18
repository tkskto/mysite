module.exports = function (options) {
    // Add .ts extension for store, middleware and more
    this.nuxt.options.extensions.push('ts');
    // Extend build
    this.extendBuild((config) => {
        config.module.rules.push({
            test: /\.ts$/,
            loader: 'tslint-loader',
            enforce: 'pre',
            options: {
                configFile: 'tslint.json',
                tsConfigFile: 'tsconfig.json',
            },
        });
        const tsLoader = {
            loader: 'ts-loader',
            options: {
                appendTsSuffixTo: [/\.vue$/],
            },
        };
        // Add TypeScript loader
        // config.module.rules.push(Object.assign(
        //     {
        //         test: /((client|server)\.js)|(\.tsx?)$/,
        //     },
        //     tsLoader,
        // ));
        // Add TypeScript loader for vue files
        config.module.rules.push({
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
                configFile: 'tsconfig.json',
            },
        });
        for (const rule of config.module.rules) {
            if (rule.loader === 'vue-loader') {
                rule.options.loaders.ts = tsLoader;
            }
        }
        // for (const rule of config.module.rules) {
        //     if (rule.loader === 'vue-loader') {
        //         rule.options.loaders.ts = 'ts-loader?{"appendTsSuffixTo":["\\\\.vue$"], "configFile": "tsconfig.json"}!tslint-loader';
        //     }
        // }
        // Add .ts extension in webpack resolve
        if (config.resolve.extensions.indexOf('.ts') === -1) {
            config.resolve.extensions.push('.ts');
        }
    });
};
