import api from '@/api'
//删除回答
export function deleteAnswer(data){
    return new Promise((resolve, reject) => {
        api.delete('forum/answer/',{
            data:data
        }).then(res => {
            console.log(res)
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//删除问题
export function deleteQuestion(question_id){
    return new Promise((resolve, reject) => {
        api.delete('forum/question/',{
            data:{
                question_id:question_id
            }
        }).then(res => {
            console.log(res)
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//禁言
export function forbidUser(data){
    return new Promise((resolve, reject) => {
        api.put('admin/forbid/',data).then(res => {
            console.log(res)
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
