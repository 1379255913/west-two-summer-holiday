import api from '@/api'
import { ElMessage } from 'element-plus'
export function register(data){
    return new Promise((resolve, reject) => {
        api.post('user', data).then(res => {
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
        api.get('user/captcha', {
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
        api.post('user/captcha', data).then(res => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

export function refresh(data){
    return new Promise((resolve, reject) => {
        api.post('user/refresh', data).then(res => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}
