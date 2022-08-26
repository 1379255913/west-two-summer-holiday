import api from "@/api";
import {defineStore} from "pinia";
import { postRoom,getRoomInfo,getRoomList } from '@/apiArray/chat'

const useChatStore = defineStore(
    // 唯一ID
    'chat',
    {
        state: () => ({
            ClickUser: {},
            UserState: false,
            MessageList: [],
            sid: '',
            OnlineUser: [],
            ClickRoomMessage: [],
        }),
        getters: {
            isClicked: state => {
                return JSON.stringify(state.ClickUser) !=='{}'
            },
            unread: state => {
                for (let i = 0; i < state.MessageList.length; i++) {
                    if (state.MessageList[i].to_read>0){
                        return true
                    }
                }
                return false
            }
        },
        actions: {
            flashRoom(){
                return new Promise((resolve, reject) => {
                    let data={}
                    return getRoomList().then(res=>{
                        data = res
                        // this.OnlineUser = data.online_users
                        this.sid = data.user_sid
                        this.MessageList =data.rooms
                        console.log(data)
                        return resolve()
                    })
                })
            },
            changeClick(room_id){
                this.MessageList.forEach(each=>{
                    if (each.room_id===room_id){
                        each.to_read = 0
                        this.ClickUser = each
                    }
                })
            },
            freshLastInfo(message,room_id){
                this.MessageList.forEach(each=>{
                    if (each.room_id===room_id){
                        each.last_msg = message
                        if (this.ClickUser.room_id!==room_id){
                            each.to_read+=1
                        }
                    }
                })
            },
            clearData(){
                this.ClickUser= {}
                this.UserState= '离线'
                this.MessageList= []
                this.sid=''
                this.OnlineUser=[]
                this.ClickRoomMessage=[]
            }
        }
    }
)

export default useChatStore
