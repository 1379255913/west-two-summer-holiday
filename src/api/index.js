import axios from 'axios'
// import qs from 'qs'
import router from '@/router/index'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import qs from 'qs'

const toLogin = () => {
    useUserStore().logout().then(() => {
        router.push({
            name: 'login',
            query: {
                redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined
            }
        })
    })
}

const api = axios.create({
    baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
    timeout: 10000,
    responseType: 'json',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
})

api.interceptors.request.use(
    request => {
        const userStore = useUserStore()
        /**
         * 全局拦截请求发送前提交的参数
         * 以下代码为示例，在请求头里带上 token 信息
         */
        if (userStore.isLogin) {
            request.headers['Authorization'] = userStore.token
        }
        // 是否将 POST 请求参数进行字符串化处理
        if (request.method === 'post'||request.method === 'put') {
            if (request.data) {
                request.data=qs.stringify(request.data)
            }
            // request.data = qs.stringify(request.data, {
            //     arrayFormat: 'brackets'
            // })
        }
        return request
    }
)

api.interceptors.response.use(
    response => {
        const userStore = useUserStore()
        /**
         * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
         * 假设返回数据格式为：{ status: 1, error: '', data: '' }
         * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
         * 请求出错时 error 会返回错误信息
         */

        if (response.data.code === 200) {
            if (!userStore.token) {

            }
            // 请求成功并且没有报错
            return Promise.resolve(response)
        } else {
            // 这里做错误提示
            ElMessage.error(response.data.message)
            return Promise.reject(response)
        }


    },
    error => {
        let message = error.message
        if (message == 'Network Error') {
            message = '后端网络故障'
        } else if (message.includes('timeout')) {
            message = '接口请求超时'
        } else if (message.includes('Request failed with status code')) {
            message = '接口' + message.substr(message.length - 3) + '异常'
        }
        ElMessage({
            message,
            type: 'error'
        })
        return Promise.reject(error)
    }
)

export default api
