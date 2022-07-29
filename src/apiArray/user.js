import api from '@/api'
import { ElMessage } from 'element-plus'
export function register(data){
    return new Promise((resolve, reject) => {
        api.post('user/', data).then(res => {
            ElMessage.success('注册成功')
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

export function getCaptcha(data){
    console.log(data);
    return new Promise((resolve, reject) => {
        api.get('user/captcha/', {
            params: data
        }).then(res => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

export function checkCaptcha(data){
    return new Promise((resolve, reject) => {
        api.post('user/captcha/', data).then(res => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}
//重新生成token
import useUserStore from "@/store/modules/user";
import router from "@/router";
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
export function refresh(refreshToken){
    return new Promise((resolve, reject) => {
        api.post('user/refresh/', {
            refresh_token: refreshToken
        }).then(res => {
            console.log(res.data.code)
            if (res.data.code===200){
                resolve(res.headers.authorization)
            } else {
                toLogin()
            }
        }).catch(error => {
            if (error.data.code===403){
                toLogin()
            }
            reject(error)
        })
    })
}

export function changePassword(data){
    console.log(data)
    return new Promise((resolve, reject) => {
        api.put('user/', data).then(res => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}
//头像上传
export function uploadAvatar(Form){
    return new Promise((resolve, reject) => {
        api.put('user/', Form,{
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//信息修改
export function uploadInform(data){
    console.log(data)
    return new Promise((resolve, reject) => {
        api.put('user/', data).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
