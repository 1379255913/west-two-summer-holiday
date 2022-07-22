import api from '@/api'
import { ElMessage } from 'element-plus'

export function getArticle(type,page){
    return new Promise((resolve, reject) => {
        api.get('article/', {
            params: {
                type: type,
                page: page
            }
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getArticleDetail(oid){
    return new Promise((resolve, reject) => {
        api.get('article/', {
            params: {
                article_id: oid
            }
        }).then(res => {
            console.log(res);
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function putLikeOrFavorite(oid,type,number){
    let like = 0
    let favorite = 0
    if (type==='like') {
        like+=number
    } else if(type==='favorite'){
        favorite+=number
    }
    console.log(oid,type,number)
    return new Promise((resolve, reject) => {
        api.put('article/lc/', {
            article_id: oid,
            like: like,
            collect: favorite
        }).then(res => {
            console.log(res);
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getLikeOrFavorite(oid){
    return new Promise((resolve, reject) => {
        api.get('article/lc/', {
            params: {
                article_id: oid,
            }
        }).then(res => {
            console.log(res);
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function postComment(article_id,comment,oid){
    let data = {}
    if (oid){
        data={
            article_id: article_id,
            subcomment: comment,
            comment_id: oid,
        }
    } else {
        data={
            article_id: article_id,
            comment: comment,
        }
    }
    console.log(data);
    return new Promise((resolve, reject) => {
        api.post('article/', data).then(res => {
            console.log(res);
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
