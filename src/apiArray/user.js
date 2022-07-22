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
export function refresh(refreshToken){
    return new Promise((resolve, reject) => {
        api.post('user/refresh/', {
            refresh_token: refreshToken
        }).then(res => {
            console.log(res.headers.authorization)
            resolve(res.headers.authorization)
        }).catch(error => {
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
