<template>
    <div>
        <page-main>
            <el-row>
                <el-col :span="6">
                    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
                        <template #header>
                            <div class="card-header">
                                <el-avatar style="float:left; " :size="40" :src="userStore.avatar" />
                                <div class="names">{{ userStore.username }}</div>
                            </div>
                        </template>
                        <el-scrollbar height="600px">
                            <div v-for="(item,index) in chatStore.MessageList" :key="item.room_id" class="users" :style="chatStore.isClicked&&item.room_id===chatStore.ClickUser.room_id?{backgroundColor: '#c5c4c4'}:{}"  @click="changeRoom(item.room_id)">
                                <div class="user-list">
                                    <div class="user-list-left">
                                        <el-avatar style="float:left; text-align: center;" :size="30" :src="item.friend.avatar" />
                                        <div class="names">{{ item.friend.username }}</div>
                                    </div>
                                    <div class="ans">
                                        <span class="last-message">
                                            {{ item.last_msg }}
                                        </span>
                                        <span class="number-top-circle" v-show="item.to_read>0">
                                            {{ item.to_read }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </el-card>
                </el-col>
                <el-col :span="18">
                    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
                        <div class="card-header2" v-if="chatStore.isClicked">
                            <div style="font-size: 24px;padding-right: 10px">{{ chatStore.isClicked?chatStore.ClickUser.friend.username:'' }}</div>
                            <el-tag v-if="!chatStore.UserState" type="info">离线</el-tag>
                            <el-tag v-else type="success">在线</el-tag>
                        </div>
                        <div style="display: flex;height: 631px;flex-direction: column; justify-content: space-between;" v-if="chatStore.isClicked">
                            <div>
                                <messages ref="messageRef"></messages>
                            </div>
                            <div>
                                <input-box></input-box>
                            </div>
                        </div>
                        <el-empty description="请选择一个开始对话" v-if="!chatStore.isClicked" style="height: 700px;"/>
                    </el-card>
                </el-col>
            </el-row>

        </page-main>
    </div>
</template>

<script setup>
import Messages from "@/views/Chat/messages.vue";
import InputBox from "@/views/Chat/inputbox.vue"
import {inject,onMounted,onUnmounted,ref} from "vue"
import { ElNotification } from 'element-plus'
import useUserStore from "@/store/modules/user";
import useChatStore from "@/store/modules/chat";
const socket = inject("socket")
const userStore = useUserStore()
const chatStore = useChatStore()
const messageRef = ref()
onMounted(()=>{
    socket.on('get_room_msg',res=>{
        console.log(res)
        chatStore.freshLastInfo(res.data.message,chatStore.ClickUser.room_id)
        chatStore.ClickRoomMessage.messages.push(res.data)
        messageRef.value.freshScrollbar()
    })
    socket.on('user_change',res=>{
        if (res.data.change==='join'&&res.data.user.user_id!==userStore.user_id){
            chatStore.UserState=true
        } else if (res.data.change==='leave'&&res.data.user.user_id!==userStore.user_id){
            chatStore.UserState=false
        }
        console.log(res,'user_change')
    })
    socket.on('room_info',res=>{
        chatStore.UserState=res.data.online_status
        console.log(res,'room_info')
    })
    chatStore.flashRoom()
})
onUnmounted(()=>{
    if(chatStore.isClicked) {
        socket.emit('leave_room',{'user_id':userStore.user_id,'room_id':chatStore.ClickUser.room_id})
    }
    socket.off('get_room_msg')
    socket.off('user_change')
})
const changeRoom=(room_id)=>{
    if(chatStore.isClicked) {
        socket.emit('leave_room',{'user_id':userStore.user_id,'room_id':chatStore.ClickUser.room_id})
    }
    chatStore.changeClick(room_id)
    socket.emit('join_room',{'user_id':userStore.user_id,'room_id':chatStore.ClickUser.room_id})
}
</script>

<style lang="scss" scoped>
.box-card{
    height: 700px;
}
.names{
    line-height:40px;     /*注意这行代码，惹是不写，得不到想要的结果哦*/
    vertical-align:middle;
    text-align:left;
    font-size: 20px;
}
.user-list{
    padding: 10px;
    align-items: center;
    justify-content: flex-start;
    display: flex;
    .user-list-left{
        width: 100%;
        display: flex;
        align-items: center;
    }
}
.names2{
    line-height:25px;     /*注意这行代码，惹是不写，得不到想要的结果哦*/
    vertical-align:middle;
    text-align:left;
    font-size: 16px;
}
.users{
    border: 1px lightgrey;
    border-style:  solid none solid none;
    transition: transform 0.3s, background-color 0.3s, var(--el-transition-border);
}
.users:hover{
    background-color: #eaeaea;
}
.ans{
    display: flex;
}
.card-header{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.card-header2{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid var(--el-card-border-color);
    box-sizing: border-box;
    padding: calc(var(--el-card-padding) - 2px) var(--el-card-padding);
}
.number-top-circle{
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    font-size: 12px;
    border-radius: 18px;
    background-color: #e71616;
    width: 20px;
    height: 20px;
    text-align: center;
    vertical-align: middle;
    color: #fff;
}
.last-message{
    max-width: 150px;
    white-space:nowrap;
    font-size: 18px;
    overflow:hidden;
    text-overflow:ellipsis;
}
</style>
