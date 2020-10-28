const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const InjectCommonPlugin = require('./injectCommonPlugin');
const baseWebpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const env = config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        // path: config.build.assetsRoot,
        filename: 'build.js',
        chunkFilename: '[name].js',
        // publicPath: config.build.assetsCdnPublicPath,

    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    externals: {
        vue: 'Vue'
    },

    // devtool: '#source-map',
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new UglifyJsPlugin({
            sourceMap: false
        }),

        // extract css into its own file
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),

        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'manifest',
        //   chunks: ['vendor']
        // }),
        // copy custom static assets
        // 注入公共js、css
        new InjectCommonPlugin()
    ]
});

module.exports = webpackConfig;
