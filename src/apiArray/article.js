import api from '@/api'
import { ElMessage } from 'element-plus'
//获取文章列表
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
//获取文章详情
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
//点赞和收藏
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
//获取点赞和收藏数
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
//发送评论
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
        api.post('article/comment/', data).then(res => {
            console.log(res);
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//获取文章推荐
export function getRecommendArticle(recommend,type){
    let params ={}
    if (recommend==='lc'){
        params.lc = 'true'
        params.type = type
    }
    else if (recommend==='ai'){
        params.ai = 'true'
        params.article_id = type
    }
    console.log(params)
    return new Promise((resolve, reject) => {
        api.get('article/recommend/',{
            params:params
        }).then(res => {
            console.log(res);
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
