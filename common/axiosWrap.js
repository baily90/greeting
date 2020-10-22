import axios from 'axios'
import loading from './loading'
import { Toast } from 'vant'
Vue.use(loading)
const loadingInstance = Vue.prototype.$loading
let callStack = [];
function showLoading() {
	loadingInstance.show()
}
function hideLoading() {
	loadingInstance.hide()
}
const Axios = axios.create()
Axios.defaults.timeout = 8000
Axios.defaults.withCredentials = true
Axios.defaults.dataType = 'JSON'

// 请求拦截器
Axios.interceptors.request.use(config => {
    config.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        // 'wx_token': window.localStorage.getItem('wx_token')
    }
    config.params = {
        ...config.params,
        MOC_Token: "406b66f355a54ece97ea6171257fbd5a"
    }
    // if(config.method == 'get') {
    //     config.params = {
    //         ...config.params,
    //         MOC_Token: "406b66f355a54ece97ea6171257fbd5a"
    //     }
    // }else {
    //     config.data = {
    //         ...config.data,
    //         MOC_Token: "406b66f355a54ece97ea6171257fbd5a"
    //     }
    // }
    
    // 判断参数，展示loading动画
    if (callStack.length === 0) {
        showLoading(1);
    }
    callStack.push(config);
    // console.log(callStack)
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
            // console.log(callStack)
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
        // console.log(error.response.config)
        // // 若请求队列的长度大于0，此时一个请求返回，则pop出对应的请求
        if (callStack.length > 0) {
            //标记是哪个请求返回
            let idx = callStack.indexOf(error.response.config);
            idx > -1 && callStack.splice(idx, 1);
            // 若请求队列长度为0，代表所有请求执行完毕，隐藏loading动画（否则代表还有请求在执行中）
            if (callStack.length === 0) {
                hideLoading();
            }
        }
        
        // if (error.response.status) {
        //     switch (error.response.status) {
        //         case 404:
        //             console.log('网络请求不存在')
        //             break
        //         case 500:
        //             console.log('网络接口失败')
        //             break
        //         // 其他错误，直接抛出错误提示
        //         default:
        //     }
        //     return Promise.reject(error.response)
        // }
        Toast('未知错误,请稍候再试')
        return Promise.reject(error.response)
    }
)

export default Axios
