const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    mode: "production",
    context: path.resolve(__dirname, "../"),
    entry: {
        public: './common/public.js'
    },
    output: {
        path: path.resolve(__dirname, '../busi/copy'),
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        }
                    },
                    "css-loader",
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: false
        }),

        // extract css into its own file
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].min.css',
            chunkFilename: '[id].[contenthash:8].css'
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
    ]
};