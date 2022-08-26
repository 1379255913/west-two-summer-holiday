import api from '@/api'
//新建房间
export function postRoom(user_id){
    return new Promise((resolve, reject) => {
        api.post('message/room/', {
            user_id:user_id
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
//获取房间信息
export function getRoomInfo(room_id){
    return new Promise((resolve, reject) => {
        api.get('message/', {
            params:{
                room_id:room_id
            }
        }).then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
export function getRoomList(){
    return new Promise((resolve, reject) => {
        api.get('message/room/').then(res => {
            resolve(res.data.data)
        }).catch(error => {
            reject(error)
        })
    })
}
