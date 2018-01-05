module.exports = function (options) {
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
        config.module.rules.push({
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
                configFile: 'tsconfig.json',
            },
        });
        for (const rule of config.module.rules) {
            if (rule.loader === 'vue-loader') {
                rule.options.loaders.ts = 'ts-loader?{"appendTsSuffixTo":["\\\\.vue$"], "configFile": "tsconfig.json"}!tslint-loader';
            }
        }
    });
};
