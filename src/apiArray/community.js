import api from '@/api'
//获取问题列表
export function getQuestionList(page,isSearch,type,value){
    let data={
        page: page,
    }
    if (isSearch){
        if (type==='title'){
            data.title = value
        } else if (type==='username'){
            data.username = value
        }
    }
    return new Promise((resolve, reject) => {
        api.get('forum/question/', {
            params: data
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//提问
export function postQuestion(data){
    return new Promise((resolve, reject) => {
        api.post('forum/question/', data).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//获取单个提问
export function getFirstQuestion(id){
    return new Promise((resolve, reject) => {
        api.get('forum/question/',{
            params: {
                question_id: id
            }
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//获取回答
export function getAnswer(answer_id_array){
    return new Promise((resolve, reject) => {
        api.get('forum/answer/',{
            params: {
                answer_ids: JSON.stringify(answer_id_array)
            }
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//提交回答
export function postAnswer(data){
    return new Promise((resolve, reject) => {
        api.post('forum/answer/', data).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//图片上传
export function tinymceUpload(imgFile) {
    let formData = new FormData()
    formData.append('photo', imgFile)
    return new Promise((resolve, reject) => {
        api.post('forum/photo/',
            formData
            , {
                'Content-type': 'multipart/form-data'
            }).then(res => {
            console.log(res.data.data)
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//发起投票
export function postVote(data){
    return new Promise((resolve, reject) => {
        api.post('forum/vote/', data).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//获取投票列表
export function getVoteList(page){
    return new Promise((resolve, reject) => {
        api.get('forum/vote/',{
            params: {
                page: page
            }
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//获取投票
export function getVoteDetail(topic_id){
    return new Promise((resolve, reject) => {
        api.get('forum/vote/',{
            params: {
                topic_id: topic_id
            }
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//进行投票
export function putVote(data){
    return new Promise((resolve, reject) => {
        api.put('forum/vote/',data).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
