const path = require('path');
const config = require('../config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');
exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {
    options = options || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };
    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        // const loaders = [cssLoader];
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
        if (loader) {
            loaders.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)

        if (options.extract) {
            // return ExtractTextPlugin.extract({
            //     use: loaders,
            //     fallback: 'vue-style-loader'
            //   })
            return [MiniCssExtractPlugin.loader].concat(loaders);
        }
        return ['vue-style-loader'].concat(loaders);
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.cssLoaders(options);
    /* eslint-disable guard-for-in */
    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp(`\\.${extension}$`),
            use: loader
        });
    }
    return output;
};


/**
 *  检验参数合法性，标准写法为：node build/build.js pagePath --watch
 * 1.参数不能为空，如：node build/build.js
 * 2.指定的目录必须存在，如：node build/build.js xxx  ,但是xxx是不存在的
 * @param {*} params 命令后面的参数列表
 */
exports.validateCmdParam = function validateCmdParam(params, mode) {
    let result = true;
    if (params.length === 0) {
        if (mode === 'build') {
            console.log('参数不能为空，正确的格式为：node build/build pagePath');
        } else if (mode === 'dev') {
            console.log('参数不能为空，正确的格式为：node build/dev-server pagePath');
        } else if (mode === 'test') {
            console.log('参数不能为空，正确的格式为：node build/karma pagePath');
        }
        result = false;
    } else if (params.length > 0 && params[0].toLowerCase() !== 'all') {
        const absolutePath = path.resolve(config.basePath, params[0]);
        if (!fs.existsSync(absolutePath)) {
            console.log('路径不存在');
            result = false;
        }
    }
    return result;
};

/**
 * 检查目录是不是符合规范的目录，规范如下：
 * 1.入口文件main.js必须在根目录下；
 * 2.模板文件tempalte.html必须有，且要在根目录下；
 * @param {String} pageDir
 */
function checkPageDir(pageDir) {
    let hasMain = false;
    let hasTemplate = false;
    const files = fs.readdirSync(pageDir);
    files.forEach(file => {
        if (file === 'main.js') {
            hasMain = true;
        } else if (file === 'template.html') {
            hasTemplate = true;
        }
    });
    return hasMain && hasTemplate;
}

const copyReg = /\Wcopy$/;
/**
 * 扫描文件夹，找出所有符合规范的目录，建立任务列表
 * @param {String} dirPath 需要扫描的文件夹路径
 * @param {Array} taskList 任务列表
 * @param {Array} copyDirs 需要拷贝的文件夹列表
 */
exports.scan = function scan(dirPath, taskList, copyDirs) {
    const absolutePath = path.resolve(__dirname, '../', dirPath);
    const relativePath = absolutePath.replace(path.resolve(__dirname, '../'), '').slice(1);
    if (copyDirs && copyReg.test(relativePath)) {
        copyDirs.push(relativePath);
    }
    if (checkPageDir(absolutePath)) {
        taskList.push(relativePath);
        // return;
    }
    const files = fs.readdirSync(absolutePath);
    files.forEach(file => {
        const fullPath = path.resolve(absolutePath, file);
        const relativePath = fullPath.replace(path.resolve(__dirname, '../'), '').slice(1);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            // if (checkPageDir(fullPath)) {
            //     taskList.push(relativePath);
            // } 
            // else {
            scan(relativePath, taskList, copyDirs);
            // }
        }
    });
};

exports.computeTaskList = function computeTaskList(mode) {
    // 获得命令后面的参数
    const arvs = process.argv.slice(2);

    // 校验参数正确性
    if (!this.validateCmdParam(arvs, mode)) {
        process.exit();
    }
    const taskList = [];
    if (arvs[0] === 'all') {
        this.scan(config.basePath, taskList);
    } else {
        this.scan(path.resolve(config.basePath, arvs[0]), taskList);
    }

    console.log(`本次要执行的任务列表：${taskList}`);
    return taskList;
};
