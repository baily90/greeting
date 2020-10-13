const UA = window.navigator.userAgent
export default {
    /**
     *
     * 微信小程序
     * @returns 
     */
    weichat() {
        return /miniProgram/gi.test(UA) && /Micromessenger/gi.test(UA)
    },
    /**
     * 内部方法，反射调用Object.toString
     * @private
     * @param {any} item 需要toString操作的变量
     * @returns {string} 结果值
     */
    _toString(item) {
        return Object.prototype.toString.call(item);
    },

    /**
     * 内部方法，判断传入参数是不是stirng类型
     * @private
     * @param {any} item 需要判断的变量
     * @returns {boolean} 结果值
     */
    _isString(item) {
        return this._toString(item) === '[object String]';
    },

    /**
     * 获取url参数
     * @param {string} key 所要获取的url参数的键
     * @param {string} url 所要从该url获取参数，若不传默认为location.search
     * @returns {string|array} 获取到的参数，若有多个，则返回数组
     */
    getPara(key, url = location.search) {
        if (!this._isString(key)) return;
        let urlReg = new RegExp(`(?:&|\\?)${key}=(.*?)(?=&|$)`, 'g'),
            res = [],
            match;
        while (match = urlReg.exec(url)) {
            res.push(decodeURIComponent(match[1]));
        }
        // 如果有多个结果返回数组，否则直接返回获取的字符串
        return res.length > 1 ?
            res :
            res[0];
    },
    /**
     * 获取对象的指定属性
     * 属性可以是一个用点号连接的多层级路径
     * @param {object} object 对象
     * @param {string} path 属性值，可以是路径，如：'a.b.c[0].d'
     * @param {any} [defaultVal=''] 取不到属性时的默认值
     * @returns {any} 获取到的属性值
     */
    getPathValue(object, path, defaultVal = '') {
        if (!this._isObject(object) || this.isEmpty(path)) return defaultVal;
        let pathArr = path.split(/\.|\[|\].?/),
            self = this;
        // 依次迭代获取对应的值，若中间出现undefined则返回默认值
        return pathArr.reduce((res, cur) => {
            if (!self.isUndef(res)) {
                return self.isEmptyStr(cur) ?
                    res :
                    self.isUndef(res[cur]) ?
                        defaultVal :
                        res[cur];
            } else {
                return defaultVal;
            }
        }, object);
    },

    /**
     * 是否是手机号
     * @param {string} phoneNumber 手机号
     * @returns {boolean} true/false
     */
    isCorrectPhone(phoneNumber) {
        if (phoneNumber && /^1[3456789]\d{9}$/.test(phoneNumber)) {
            return true
        } else {
            return false
        }
    },

    /**
     * 是否Android
     * @returns {boolean} true/false
     */
    isAndroid() {
        const ua = navigator.userAgent;
        return ua.indexOf('Android') > -1;
    },

    /**
     * 是否Ios
     * @returns {boolean} true/false
     */
    isIos() {
        const ua = navigator.userAgent;
        return ua.indexOf('iPhone OS') > -1 || ua.indexOf('iPad') > -1;
    },

    // warning:只能匹配微信，不能保证是小程序
    isMiniWeixin() {
        const ua = navigator.userAgent;
        return ua && ua.indexOf('micromessenger') > 0;
    },
    // 支付宝小程序
    isMiniAlipay() {
        const ua = navigator.userAgent;
        return (ua && ua.indexOf('alipayclient') > 0 && ua.indexOf('miniprogram') > 0)
    },
    // 微信小程序
    isMiniprogam() {
        const ua = navigator.userAgent;
        return (ua && ua.indexOf('micromessenger') > 0 && ua.indexOf('miniprogram') > 0)
    },

    /**
     * 是否Ios
     * @returns {boolean} true/false
     */
    isIPhoneX() {
        const ua = navigator.userAgent;
        return ua.indexOf('iPhone OS') > -1 && ((screen.width === 375 && screen.height === 812) || (screen.width === 414 && screen.height === 896));
    },

    /**
     * 格式化日期，传入时间戳或者Date对象
     * format为格式化模板，可选 yyyy-MM-dd hh:mm:ss week 分别对应替换对应date对象的year,month,date,hour,minute,second,day
     * 如：传入yyyy年MM月dd日 hh时mm分ss秒 week 则返回2017年8月1日 17时24分06秒 周二
     *     传入yyyy-MM-dd 则返回 2017-08-01
     *     传入yyyy-M-d 则返回 2017-8-1
     * @param {number|date} date 传入的date对象或者时间戳
     * @param {string} format 格式化模板
     * @param {boolean} isUTC 是否用UTC标准时间来格式化
     * @returns {string} 格式化后的字符串
     */
    dateFormat(date = new Date(), format = 'yyyy-MM-dd', isUTC = false) {

        // 入参格式错误，返回空字符串
        if (this._toString(date) !== '[object Date]' || !this._isString(format)) {
            return '';
        }

        let year = isUTC ? date.getUTCFullYear() : date.getFullYear(),
            month = isUTC ? date.getUTCMonth() + 1 : date.getMonth() + 1,
            datestr = isUTC ? date.getUTCDate() : date.getDate(),
            hour = isUTC ? date.getUTCHours() : date.getHours(),
            minute = isUTC ? date.getUTCMinutes() : date.getMinutes(),
            second = isUTC ? date.getUTCSeconds() : date.getSeconds(),
            day = isUTC ? date.getUTCDay() : date.getDay(),

            // 替换各个字符串的正则
            regArr = [
                /y+/,
                /M+/,
                /d+/,
                /h+/,
                /m+/,
                /s+/,
                'week'
            ],
            strArr = [year, month, datestr, hour, minute, second, day],
            weekdayArr = ['日', '一', '二', '三', '四', '五', '六'],
            self = this;

        // 根据传入的长短返回对应的字符串，
        // 若所需长短小于传入的字符串长短，则直接返回
        // 若所需长短大于传入的字符串长短，则在前面添加0
        function getResStr(str, len) {
            let strLen = str.length;

            if (len >= strLen) {
                return Array(len - strLen + 1).join(0) + str;
            } else {
                return str;
            }
        }

        return regArr.reduce((res, cur, index) => {
            return res.replace(cur, (mat) => {
                let len = mat.length;

                return cur === 'week' ? `周${weekdayArr[day]}` : getResStr(String(strArr[index]), len);
            });
        }, format);
    },
    // 根据环境变量反射域名
    hostRefect() {
        const { NODE_ENV } = process.env
        if(NODE_ENV === 'production') return 'http://air.nongnet.net/fontEnd'
        return 'http://localhost:3009'
    }
}