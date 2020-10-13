process.env.NODE_ENV = 'testing';
process.env.BABEL_ENV = 'test';

const path = require('path');
const karma =  require('karma');
const Server = karma.Server;
const cfg = karma.config;
const utils = require('./utils');
const config = require('../config');

const arvs = process.argv.slice(2);
let isAll = false, singleRun = false;

if (!utils.validateCmdParam(arvs, 'test')) return;
arvs.forEach(arv => {
    if (arv === '--single-run') {
        singleRun = true;
    } 
});
const taskList = [];

if (arvs[0] === 'all') {
    isAll = true;
}
if (isAll) {
    utils.scan(config.basePath, taskList);
} else {
    utils.scan(path.resolve(config.basePath, arvs[0]), taskList);
}

// 自动化测试脚本的匹配路径
const files = [];
taskList.forEach(task => {
    task = task.replace(`${config.basePathStr}`, '').replace('\\', '/');
    const filesPath = `./specs${task}/**/*.spec.js`;
    files.push(filesPath);

});

// karma的扩展配置
const extendConfig = {};
extendConfig.files = files;
extendConfig.singleRun = singleRun;

const karmaConfig = cfg.parseConfig(path.resolve('./test/unit/karma.conf.js'), extendConfig);
new Server(karmaConfig, exitCode => {
    console.log(`Karma has exited with ${exitCode}`);
    process.exit(exitCode);
}).start();