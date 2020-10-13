const path = require('path');
const vueLoaderConfig = require('./vue-loader.conf');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const config = require('../config');
const utils = require('./utils');
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve(config.basePathStr),
            '@components': resolve(config.componentPathStr)
        }
    },
    module: {
        rules: [
            // {
            // 	test: /\.(js|vue)$/,
            // 	loader: 'eslint-loader',
            // 	enforce: 'pre',
            // 	include: [resolve(config.basePathStr), resolve('test')],
            // 	options: {
            // 		formatter: require('eslint-friendly-formatter')
            // 	}
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
                include: [resolve(config.basePathStr), resolve('test'), resolve('components')]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000, // 图片尽量走url
                    name: utils.assetsPath('img/[name].[ext]'),
                    // emitFile: false
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000, // 图片尽量走url
                    name: utils.assetsPath('img/[name].[ext]'),
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000, // 图片尽量走url
                    name: utils.assetsPath('img/[name].[ext]'),
                }
            }
        ]
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new VueLoaderPlugin(),
    ]
};
