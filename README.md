<!-- TOC -->

- [1. webapp工程](#1-webapp工程)
    - [1.1 前期准备](#11-前期准备)
    - [1.2 目录结构介绍](#12-目录结构介绍)
    - [1.3 说明](#13-说明)
        - [1.3.1 通用说明](#131-通用说明)
        - [1.3.2 关于环境与构建](#132-关于环境与构建)
        - [1.3.3 访问路径](#133-访问路径)
        - [1.3.4 纯静态页面构建写法](#134-纯静态页面构建写法)
        - [1.3.5 本地静态图片的引用方式](#135-本地静态图片的引用方式)
        - [1.3.6 devServer 反向代理使用须知](#136-devserver-反向代理使用须知)
    - [1.4 命令相关](#14-命令相关)
        - [1.4.1 dev-server 服务启动命令](#141-dev-server-服务启动命令)
        - [1.4.2 build 构建压缩命令](#142-build-构建压缩命令)
        - [1.4.3 karma 单元测试命令](#143-karma-单元测试命令)
        - [1.4.4 --local参数 本地化包命令](#144---local参数-本地化包命令)
    - [1.5 eslint相关](#15-eslint相关)

<!-- /TOC -->

# 1. webapp工程
> 基于vueJS的纯前端工程

## 1.1 前期准备

* vue学习：`https://cn.vuejs.org/v2/guide/`,`https://github.com/vuejs/vue`；
* cd webapp : 进入webapp主目录；
* npm install : 安装依赖；

## 1.2 目录结构介绍

* build - 构建启动命令脚本文件目录
* config - 配置文件目录
* busi - 源文件目录
* release - build命令构建压缩后的文件目录
* test - 单元测试文件目录
* common - 公共js文件目录
* components - 公共组件目录

## 1.3 说明

### 1.3.1 通用说明
* 本架构是基于vue脚手架（webpack）改造，现开发、生产构建都是通过build.js完成，如果是开发阶段，配合dev-server，同样能实现监听文件改变以及热重载功能。单元测试都是通过karma.js完成。
* 一个有效页面的文件夹下应该包含template.html（模板文件） 和 main.js(入口文件)。
* 凡经构建的页面(包含模板文件和入口文件) 架子均会在构建后的index.html中 引入公共css和js(common.css, public.js, es6-promise.js)，具体版本由架子决定(/config/index.js)，故每个页面的template.html中无需重复引入公共css、js（重复引用可能会出错，切勿！）。

### 1.3.2 关于环境与构建
* 本地开发过程使用dev-server命令，进行本地自测；自测OK后提交源码即可。
* 测试环境采用的是服务端构建模式，只要有代码提交到对应分支，对应环境每5min检查一次代码更新情况，若有新代码提交，则触发测试服务器的构建脚本。
* 线上环境只发布/release文件夹中的代码，其他目录不发布！
* 对于不经构建的纯静态html、图片、json文件等，若想发布到线上，需放到busi/../copy/ 或 release/static/ 目录下。

### 1.3.3 访问路径
* 页面访问路径之本地环境：`http://localhost:8080/项目路径/`，如：`http://localhost:8080/one` ，`localhost` 可换为 `本地ip地址` ；

### 1.3.4 纯静态页面构建写法
> 代码示例见 /busi/more/staticPage

* 使用vue模板的写法写静态页面的好处 —— 便于引入公共css和js；便于清cdn缓存，上线前不用改css和js引用的版本号；
* template.html中必须引入vue核心js(如：vue-2.4.1.runtime.min.js)，其他无用的js引用可删除(如：axios-0.16.2.min.js, vue-router.2.7.0.min.js等)；

### 1.3.5 本地静态图片的引用方式
> 代码示例见 /busi/one

* vue模板引用

```html
<img src="../assets/icon.png"/>
```

* css引用

```css
.icon{background:'url(../assets/icon.png)'}
```

* js引用

```html
<img :src='imgUrl'>
```

```js
// 勿用：这种写法图片不会被构建，将无法访问到图片。
const imgUrl = '../assets/icon.png';

// 可用：require方式
const imgUrl = require('../assets/icon.png');

// 可用：架子提供的功能
// 需将图片放入 /release/static/项目目录/ 路径下！！！
import setting from '@common/setting';
const imgUrl = `${setting.staticBasePath}项目目录/icon.png`;
```

### 1.3.6 devServer 反向代理使用须知
> 本地devServer服务支持反向代理功能，从而可以在手机上进行扫码测试。

* 页面访问域名：本机电脑可用localhost和本机ip地址，手机扫码必须使用ip地址访问；

* 接口访问的域名需和页面访问的域名保持一致；

```js
import setting from '@common/setting';
const oneApiUrl = `${setting.apiPrefix}/接口path`;
```

* config/index.js里面进行反向代理配置；

```js
{
    pattern: ['/h5RetailApi'],//填写要访问接口path的第一层目录(若和页面访问path有重复，可增加几层目录)
    options: {
        target: 'https://mall.lvmama.com',//要进行反向代理的目标域名
        changeOrigin: true,
        secure: false //不验证证书的安全性
    }
}
```


## 1.4 命令相关 

### 1.4.1 dev-server 服务启动命令
* node build/dev-server all<br>
构建busi文件夹下所有有效页面，业务代码引用为相对路径，并启动dev-server服务
* node build/dev-server 项目路径<br>
如：node build/dev-server more/one<br>
项目或单页面构建，默认生成的资源以相对路径引用，并启动dev-server服务

### 1.4.2 build 构建压缩命令
* node build/build all<br>
构建busi文件夹下所有有效页面，业务代码引用为pics路径
* node build/build 项目路径<br>
如：node build/build more<br>
项目或单页面构建，默认生成的资源以pics绝对路径引用

### 1.4.3 karma 单元测试命令
* node build/karma all<br>
执行test/unit/specs下所有以.spec.js结尾的测试脚本
* node build/karma 项目路径<br>
如：node build/karma one<br>
执行test/unit/specs/one下所有以.spec.js结尾的测试脚本

### 1.4.4 --local参数 本地化包命令
* 生成本地化文件夹，通常用法是：`node build/build testOnePage --local localDirName`；
* localDirName是本地化文件夹名称，必须紧跟在--local参数后面，如果不传则默认为local；

## 1.5 eslint相关
构建的时候很可能会出现eslint报错信息，如果使用vscode编辑器，建议装ESLint插件，它会检测.eslinttrc配置文件，当不符合规则的时候，会有提示


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
