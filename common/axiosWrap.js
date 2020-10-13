import axios from 'axios'
import apis from './apis'
let callStack = [];
/**
 * 添加类名工具方法
 */
function addClass(dom, str) {
	if (dom.className !== undefined && dom.className.indexOf(str) === -1) {
		dom.className += dom.className.length > 0 ? ' ' + str : str;
	}
	return;
}

/**
 * 去除类名工具方法
 */
function removeClass(dom, str) {
	if (dom.className !== undefined && dom.className.indexOf(str) > -1) {
		dom.className.indexOf(str) == 0 ? dom.className = dom.className.replace(str, '') : dom.className = dom.className.replace(' ' + str, '');
	}
	return;
}
function showLoading() {
	let lvLd = document.getElementById('lv-ld');

	// 若已存在动画元素，则添加类名即可
	if (lvLd) {
		removeClass(lvLd, 'lv-ld-hd');

		//若不存在动画元素，创建之
	} else {
		lvLd = document.createElement('div');
		let ldDot1 = document.createElement('i'),
		    ldDot2 = document.createElement('i'),
		    ldDot3 = document.createElement('i');

        lvLd.id = 'lv-ld';
        addClass(lvLd, 'lv-ld');

		lvLd.appendChild(ldDot1);
		lvLd.appendChild(ldDot2);
		lvLd.appendChild(ldDot3);

		document.body && document.body.appendChild(lvLd);
	}
}

/**
 * 隐藏loading动画，添加对应类名
 * 
*/
function hideLoading() {
	let lvLd = document.getElementById('lv-ld'),
		lvDot = document.getElementById('lv-dot');

	if (lvLd) {
		addClass(lvLd, 'lv-ld-hd');
	}
	if (lvDot) {
		addClass(lvDot, 'lv-ld-hd');
	}
}

// 随机生成16位16进制
function getRamNumber() {
    var result = ''
    for (var i = 0; i < 16; i++) {
        result += Math.floor(Math.random() * 16).toString(16) // 获取0-15并通过toString转16进制
    }
    // 默认字母小写，手动转大写
    return result.toUpperCase() // 另toLowerCase()转小写
}

const Axios = axios.create()
Axios.defaults.timeout = 8000
Axios.defaults.withCredentials = true
Axios.defaults.dataType = 'JSON'

let oAes = {}

// 请求拦截器
Axios.interceptors.request.use(config => {
    config.cityApp = {}
    config.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'wx_token': window.localStorage.getItem('wx_token')
    }
    // 判断参数，展示loading动画
    if (callStack.length === 0) {
        showLoading(1);
    }
    callStack.push(config);
    console.log(callStack)
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
Axios.interceptors.response.use(
    response => {
        // console.log(Axios.interceptors.request)
        // 若请求队列的长度大于0，此时一个请求返回，则pop出对应的请求
        if (callStack.length > 0) {
            //标记是哪个请求返回
            let idx = callStack.indexOf(response.config);
            idx > -1 && callStack.splice(idx, 1);
            console.log(callStack)
            // 若请求队列长度为0，代表所有请求执行完毕，隐藏loading动画（否则代表还有请求在执行中）
            if (callStack.length === 0) {
                hideLoading();
            }
        }
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    // 服务器状态码不是200的情况
    error => {
        console.log(error.response.config)
        // 若请求队列的长度大于0，此时一个请求返回，则pop出对应的请求
        if (callStack.length > 0) {
            //标记是哪个请求返回
            let idx = callStack.indexOf(error.response.config);
            idx > -1 && callStack.splice(idx, 1);
            // 若请求队列长度为0，代表所有请求执行完毕，隐藏loading动画（否则代表还有请求在执行中）
            if (callStack.length === 0) {
                hideLoading();
            }
        }
        if (error.response.status) {
            switch (error.response.status) {
                case 404:
                    console.log('网络请求不存在')
                    break
                case 500:
                    console.log('网络接口失败')
                    break
                // 其他错误，直接抛出错误提示
                default:
            }
            return Promise.reject(error.response)
        }
        return Promise.reject(error.response)
    }
)

export default Axios
