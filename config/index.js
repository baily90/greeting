// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
module.exports = {
    basePathStr: 'busi',
    componentPathStr: 'components',
    basePath: path.resolve(__dirname, '../', 'busi'),
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        assetsCdnPublicPath: '/static',
        productionSourceMap: false,

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: false,
        commonResource: {
            js: [

            ],
            css: [
                // '/webapp/copy/public.min.css'
            ]
        }
    },
    dev: {
        env: require('./dev.env'),
        port: 3009,
        autoOpenBrowser: false,
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        proxyTable: 
        [
            {
                pattern: ['/moahr'],
                options: {
                    target: 'http://moa.qa.17u.cn/',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/moahr': '/moahr', // rewrite path
                    }
                }
            }
        ],

        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
};
