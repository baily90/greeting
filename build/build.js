console.time('totalCost');
process.on('exit',e => {
    console.timeEnd('totalCost');
});
require('./check-versions')();
const fs = require('fs-extra');
const path = require('path');
const cp = require('child_process');
const os = require('os');
const utils = require('./utils');
const config = require('../config');
class Build {
    /**
     * @param {*} arvs 命令行参数
     */
    constructor(arvs) {

        // 命令参数
        this.arvs = arvs;

        // 命令行参数是否验证通过
        this.isValidation = true;

        // 需要执行webpack命令的任务列表
        this.taskList = [];

        // 是否全部编译
        this.isAll = false;

        // 是否生成本地化包
        this.isLocal = false;

        // 是否生成本地化包
        this.localDirName = 'local';

        // 子进程数量,默认是cpu内核数量
        this.workerCount = os.cpus().length;

        // 记录已经执行完成的进程数量
        this.completeWorkerCount = 0;
        
        // 需要复制的目录
        this.copyDirs = [];
        this.init();
    }
    init() {
        // if (!this.validateCmdParam()) {
        if (!utils.validateCmdParam(this.arvs, 'build')) {
            this.isValidation = false;
            return;
        }
        this.convertArvsToLowcase();
        this.resolveCmdParam();
        if (this.isAll) {
            utils.scan(config.basePath, this.taskList, this.copyDirs);
        } else {
            utils.scan(path.resolve(config.basePath, this.arvs[0]), this.taskList, this.copyDirs);
        }

        if (this.isLocal && this.taskList.length > 1) {
            this.localDirName = 'local';
            console.log('如果是多页面，则文件夹名称统一为‘local’');
        }
        console.log(`本次要copy的任务列表：${this.copyDirs}`);
        console.log(`本次要执行的任务列表：${this.taskList}`);
    }

    /**
     * 将数组里面的参数部分转换为小写
     */
    convertArvsToLowcase() {
        this.arvs.map((currentValue, index) => {
            if (index !== 0 && !currentValue.includes('--')) { return currentValue.toLowerCase(); }
            return currentValue;
        }, this.arvs);
    }

    /**
     * 解析命令行参数，设置isAll、isLocal、localDirName
     */
    resolveCmdParam() {
        if (this.arvs[0] === 'all') {
            this.isAll = true;
        }

        if (this.arvs.includes('--local')) {
            const localIndex = this.arvs.indexOf('--local');
            const localDirName = this.arvs[localIndex + 1];
            this.isLocal = true;
            if (localDirName && !localDirName.includes('--')) {
                this.localDirName = localDirName;
            } else {
                this.localDirName = 'local';
            }
        }
    }

    /**
     * 开启子进程
     * @param {Array} tasks 任务列表
     * @param {Number} index 进程编号
     */
    startWorker(tasks,index) {
        const runnerConfig = {
            taskList: tasks,
            isLocal: this.isLocal,
            localDirName: this.localDirName,
            workerId: index
        };
        const worker = cp.fork(`${__dirname}/WebpackRunner.js`);
        worker.send(runnerConfig);
        worker.on('message', data => {
            if (data.code !== 1) {
                // 子进程异常，程序退出
                process.exit(0);
            } else if (++this.completeWorkerCount === this.workerCount) {
                this.copyDirs.forEach(dir => {
                    const releaseDirCopy = dir.replace(config.basePathStr, 'release');
                    fs.removeSync(releaseDirCopy);
                    // fs.removeSync
                    fs.copy(dir, releaseDirCopy).then(() => {
                        console.log(`${dir}文件夹复制成功`);
                    }).catch(error => {
                        console.log(`${dir}文件夹复制失败`);
                        console.error(error.stack);
                    });
                });
            }
        });

        // const debug = require('./WebpackRunner');
        // runnerConfig.debug = true;
        // debug(runnerConfig);
    }

    /**
     * 如果不是全部构建，则启动一个子进程执行即可；
     * 如果是第一次执行，则按照worker数量启动子进程执行，完成后记录性能数据（performance）；
     * 如果已经有性能数据，则依据此做性能调优；
     */
    run() {
        if (!this.isValidation) return;
        const length = this.taskList.length;
        const countPerGroup = Math.floor(length / this.workerCount);
        const yushu = length % this.workerCount;

        // if (!this.isAll) {
        //     this.startWorker(this.taskList, 0);
        //     return;
        // }

        const isExist = fs.existsSync(path.resolve(__dirname, 'performance'));
        let text;
        if (isExist && this.isAll) {
            text = fs.readFileSync(path.resolve(__dirname, 'performance')).toString();
        }
        // 如果有性能数据,通过分析上一次的执行结果，调整执行任务，达到缩短运行时间的目的
        if (isExist && text) {
            let needToGroupArr = [];
            const splitArray = text ? JSON.parse(text) : [];

            // 解析上一次性能数据，然后放至needToGroupArr
            splitArray.forEach(workerTimes => {
                needToGroupArr = needToGroupArr.concat(workerTimes.times);
            });

            // 剔除needToGroupArr里面有，但是tasklist里面没有的数据（例如页面文件夹被删除等）
            needToGroupArr = needToGroupArr.filter(timeData => {
                return this.taskList.includes(timeData.path);
            });

            let totalTime = 0;
            needToGroupArr.forEach(timeData => {
                totalTime += timeData.cost - 0;
            });
            // 页面平均耗时，如果有新增页面，则将此作为默认耗时
            const average = Math.round(totalTime / (needToGroupArr.length || 1));

            // 加上needToGroupArr里面没有，但是tasklist里面有的数据（新增页面）
            this.taskList.forEach(path => {
                const onlyIntaskList = !needToGroupArr.some(ele => {
                    return ele.path === path;
                });
                if (onlyIntaskList) {
                    needToGroupArr.push({
                        path: path,
                        cost: average
                    });
                }
            });

            // 结合上次性能数据和子进程数量分组
            const groups = this.splitGroup(needToGroupArr, this.workerCount);

            // 清除上一次的性能数据
            fs.writeFile(path.resolve(__dirname, 'performance'), '');

            // 依次启动子进程
            groups.forEach((tasks, index) => {
                this.startWorker(tasks, index);
            });
        } else { // 如果没有性能数据，则根据cpu内核数量分配task，然后开启子进程执行task
            // 清除上一次的性能数据
            fs.writeFile(path.resolve(__dirname, 'performance'), '');

            // 依次启动子进程
            for (let i = 0; i < this.workerCount; i++) {
                const startIndex = i * countPerGroup;
                let tasks = this.taskList.slice(startIndex ,startIndex + countPerGroup);
                if (i === this.workerCount - 1){
                    tasks = this.taskList.slice(startIndex ,startIndex + countPerGroup + yushu);
                }
                this.startWorker(tasks, i);
            }
        }
    }

    /**
     * 将源数组分成几组，保证每组的cost之和尽量接近
     * @param {Array} array 待分组数组
     * @param {number} gCount 要分为几组
     * @returns {Array}
     *  源数据结构
            [
                {
                    path: 'E:\git\webapp\busi\my\memberLevel\hydj_index',
                    cost: 100
                },
                {
                    path: 'E:\git\webapp\busi\my\myBenefits\detail',
                    cost: 80
                }
                .....
            ]
     */
    splitGroup(array,gCount) {
        let distArray = [];
        for (let i = 0; i < gCount; i++) {
            distArray[i] = [];
        }
    
        // 从小到大排序
        let sourceArray = array.sort((a, b) => {
            return a.cost - b.cost;
        });
        // 把余数剔除
        const yushu = sourceArray.length % gCount;
        const yuArray = sourceArray.slice(0,yushu);
        sourceArray = sourceArray.slice(yushu);
    
        const countPerGroup = sourceArray.length / gCount;
        for (let i = 0; i < countPerGroup; i++) {
            const isOdd = i / 2 === 0;
            for (let j = 0; j < gCount; j++) {
                if (isOdd){
                    distArray[j].push(sourceArray[(i * gCount) + j]);
                } else {
                    distArray[gCount - 1 - j].push(sourceArray[(i * gCount) + j]);
                }
            }
        }
        yuArray.forEach((ele, index) => {
            distArray[index % gCount].push(ele);
        });
        
        // 补偿算法：将每组的cost求和，从和最大的组里面，选取最小值放入和最小的组里面，最多补偿10次，如果最大与最小相处小于5s，则跳出补偿
        for (let i = 0; i < 10; i++) {
            const sumArr = distArray.map(ele => {
                let sum = 0;
                ele.forEach(ele1 => {
                    sum += ele1.cost;
                });
                return sum;
            });
            const _sumArr = Array.from(sumArr); 
            const sumSortedArr = _sumArr.sort();
            const len = sumSortedArr.length;
            const maxIndex = sumArr.findIndex(ele => {
                return ele === sumSortedArr[len - 1];
            });
            const minIndex = sumArr.findIndex(ele => {
                return ele === sumSortedArr[0];
            });
            if (sumSortedArr[len-1] - sumSortedArr[0] < 5000) break;
            const temp = distArray[maxIndex].shift();
            distArray[minIndex].unshift(temp);
        }

        distArray = distArray.map(ele => {
            return ele.map(ele1 => {
                return ele1.path;
            });
        });
        return distArray;
    }
}

/**
 * 初始化函数
 */
const init = function () {
    // const arvs = ['invoice'];
    const arvs = process.argv.slice(2);

    new Build(arvs).run();
};

init();
