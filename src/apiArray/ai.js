import api from '@/api'
import { ElMessage } from 'element-plus'

export function jobRecommend(data){
    return new Promise((resolve, reject) => {
        api.get('ai/jobsdata/jobrecommend', {
            params: data
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getWordCloudGoodThing(){
    return new Promise((resolve, reject) => {
        api.get('ai/jobsdata/goodthing/wordcloud',{
            responseType: 'blob'
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getJobArea(){
    return new Promise((resolve, reject) => {
        api.get('ai/jobsdata/place').then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getJobAnalysis(jobs){
    return new Promise((resolve, reject) => {
        api.get('ai/jobsdata/analysis',{
            params:{
                jobs: jobs
            }
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function uploadIDCard(Form){
    return new Promise((resolve, reject) => {
        api.post('ai/user/id_photo', Form,{
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function jobRecommend2(data){
    return new Promise((resolve, reject) => {
        api.get('ai/jobsdata/jobrecommend1', {
            params: data
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
