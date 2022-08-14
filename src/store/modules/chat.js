import api from "@/api";
import {defineStore} from "pinia";

const useChatStore = defineStore(
    // 唯一ID
    'chat',
    {
        state: () => ({
            ClickUser: '',
            UserState: '离线',
            LastMessages: '',
            MissMessagesNumber: 0,
        }),
        actions: {
            changeClick(user){
                this.ClickUser = user
                this.MissMessagesNumber = 0
            },
            changeUserState(flag){
                if (flag === 'true') {this.UserState = '在线'}
                else {this.UserState = '离线'}
            },
            sendMessage(data) {
                return new Promise((resolve, reject) => {
                    // 通过 mock 进行登录
                    // api.post('login', data, {
                    // }).then(res => {
                    //     localStorage.setItem('account', res.data.account)
                    //     localStorage.setItem('token', res.data.token)
                    //     localStorage.setItem('failure_time', res.data.failure_time)
                    //     this.account = res.data.account
                    //     this.token = res.data.token
                    //     this.failure_time = res.data.failure_time
                    //     resolve()
                    // }).catch(error => {
                    //     reject(error)
                    // })
                })
            },
            socketIo(user){

            }
        }
    }
)

export default useChatStore
