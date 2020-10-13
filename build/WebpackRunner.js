
const fs = require('fs-extra');
const rm = require('rimraf');
const chalk = require('chalk');
const webpack = require('webpack');
process.env.NODE_ENV = 'production';
const webpackConfig = require('./webpack.prod.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('../config');
const performace = {
    workerId: 0,
    totalTime: 0,
    times: []
};

let runnerConfig;
function excutor() {
    if (runnerConfig.taskList.length === 0) {
        // process.send(`执行ok`);
        // 计算总耗时
        let totalTime = 0;
        performace.times.forEach(ele => {
            totalTime += ele.cost;
        });
        performace.totalTime = totalTime;
        performace.workerId = runnerConfig.workerId;

        // const performanceText = fs.readFileSync(path.resolve(__dirname, 'performance')).toString();
        // let parsedText = performanceText && JSON.parse(performanceText);
        let parsedText = [];
        if (parsedText instanceof Array){
            parsedText.push(performace);
        } else {
            parsedText =  [];
            parsedText.push(performace);
        }
        
        fs.writeFileSync(path.resolve(__dirname, 'performance'), JSON.stringify(parsedText, null, 2));
        if (!runnerConfig.debug) {
            process.send({code:1, id:performace.workerId});
            process.exit(0);
        }
        return;
    }
    const originPath = runnerConfig.taskList.shift();  // 类似于 busi/one    
    const tempBuildPath = path.resolve(__dirname, '../', originPath); // 绝对路径
    // 设置入口文件和输出路径
    webpackConfig.entry = path.resolve(`${tempBuildPath}${path.sep}main.js`);

    // 绝对路径转相对路径，例如："e:\website\static_project\webapp\busi\testOnePage"  =》  "testOnePage"
    const relativePath = tempBuildPath.replace(path.resolve(__dirname, '../', config.basePathStr), '');

    if (runnerConfig.isLocal) {
        webpackConfig.output.path = path.resolve(__dirname, '../release', `./${relativePath}`, runnerConfig.localDirName);
        webpackConfig.output.publicPath = '';
vi 
        // 本地化不要生成map文件
        webpackConfig.devtool = false;
    } else {
        webpackConfig.output.path = path.resolve(__dirname, '../release', `.${relativePath}`);
        webpackConfig.output.publicPath = './';
        // webpackConfig.output.publicPath = `${config.build.assetsCdnPublicPath}${relativePath.replace(/\\/g, '/')}/`;
        // webpackConfig.output.publicPath = `${relativePath.replace(/\\/g, '/')}/`;

        // 非本地化时生成bundle分析报告
        if (config.build.bundleAnalyzerReport) {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
                return plugin.constructor.name !== 'BundleAnalyzerPlugin';
            });
            webpackConfig.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'bundleAnalyzeReport.html',
                openAnalyzer: false
            }));
        }
    }
    webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
        return plugin.constructor.name !== 'HtmlWebpackPlugin';
    });

    webpackConfig.plugins.unshift(new HtmlWebpackPlugin({
        inject: true,
        filename: path.resolve(__dirname, '../release', `.${relativePath}`, runnerConfig.isLocal ? runnerConfig.localDirName : '', 'index.html'),
        template: path.resolve(tempBuildPath, 'template.html'),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    }));

    // 先删除，再执行build
    rm(path.resolve(__dirname, '../release', `.${relativePath}`, runnerConfig.isLocal ? runnerConfig.localDirName : ''), err => {

        if (err) throw err;

        webpack(webpackConfig, (err, stats) => {
            if (err) throw err;
            process.stdout.write(`${stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            })}\n\n`);

            console.log(chalk.cyan(`${tempBuildPath}  Build complete.\n`));
            performace.times.push({
                path: originPath,
                cost: stats.endTime - stats.startTime
            });
            excutor();
        });
    });
}

process.on('message', (data) => {
    runnerConfig = data;
    excutor();
});

process.on('uncaughtException', err => {
    console.error('An uncaught error occurred!');
    console.error(err.stack);
    process.send({code: -1, err: err});
});


module.exports = function debug(data) {
    runnerConfig = data;
    excutor();
};