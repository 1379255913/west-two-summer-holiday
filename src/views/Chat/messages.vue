<template>
    <div class="outbox" v-loading="loading">
        <el-scrollbar height="420px" style="width: 100%" :view-style="{ width: '100%' }" :wrap-style="{ width:'100%' }" ref="scrollbarRef" >
            <div style="display:block;" ref="innerRef">
                <div v-for="(item,index) in chatUser.ClickRoomMessage.messages" :key="index" :class="item.sender_id!==useUser.user_id?'outbox-left':'outbox-right'">
                    <div class="outbox-left" v-if="item.sender_id!==useUser.user_id">
                        <div class="rol">
                            <div class="inform">
                                <el-avatar class="photo" :size="25" :src="item.sender.avatar" />
                                <span class="username">{{item.sender.username}}</span>
                                <span class="time">{{ dayjs(parseInt(item.send_time)*1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
                            </div>
                            <div class="message-cow">
                                <span class="message-box">
                                    <span class="messages">
                                        {{ item.message }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="outbox-right" v-else>
                        <div class="rol">
                            <div class="inform-right">
                                <el-avatar class="photo" :size="25" :src="item.sender.avatar" />
                                <span class="username">{{item.sender.username}}</span>
                                <span class="time-right">{{ dayjs(parseInt(item.send_time)*1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
                            </div>
                            <div class="message-cow">
                                <span class="message-box">
                                    <span class="messages">
                                        {{ item.message }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { ref,inject,onMounted,watch } from 'vue'
import dayjs from "dayjs";
import useUserStore from "@/store/modules/user"
import useChatStore from "@/store/modules/chat";
import {getRoomInfo} from "@/apiArray/chat";
const max = ref(0)
const innerRef = ref()
const scrollbarRef = ref()
const loading = ref(false)
const useUser = useUserStore()
const chatUser = useChatStore()
watch(()=>chatUser.ClickUser,(value, oldValue)=>{
    loading.value=true
    getRoomInfo(value.room_id).then(res=>{
        chatUser.ClickRoomMessage = res
        setTimeout(()=>{
            max.value = innerRef.value.clientHeight - 380
            scrollbarRef.value.setScrollTop(max.value)
            loading.value=false
        },100)
    })
},{
    immediate: true
})
const freshScrollbar = () => {
    setTimeout(()=>{
        max.value = innerRef.value.clientHeight - 380
        scrollbarRef.value.setScrollTop(max.value)
    },100)
}
defineExpose({
    freshScrollbar
})
</script>

<style lang="scss" scoped>
div{
    display: flex;
}
span{
    display: flex;
}
.outbox-left{
    width: 100%;
    flex-direction: row;
    .message-box{
        background-color: #e5e5e5;
        margin: 0 0 0 23px;
        border-radius: 5px;
        max-width: 75%;
    }
    .messages{
        /*border: 1px lightgrey;*/
        /*border-style:  solid;*/
        padding: 10px;
    }
    .time{
        font-size: 14px;
        padding: 0 0 0 10px;
    }
}
.outbox-right{
    width: 100%;
    flex-direction: row-reverse;
    .message-box{
        flex-direction: row-reverse;
        background-color: #e5e5e5;
        margin: 0 23px 0 0;
        border-radius: 5px;
        max-width: 75%;
    }
    .messages{
        /*border: 1px lightgrey;*/
        /*border-style:  solid;*/
        padding: 10px;
    }
    .time-right{
        font-size: 14px;
        padding: 0 10px 0 0;
    }
    .inform-right{
        flex-direction: row-reverse;
    }
    .message-cow{
        flex-direction: row-reverse;
    }
}
.outbox{
    width: 100%;
    flex-direction: column;
}
.rol{
    width: 100%;
    flex-direction: column;
    padding: 10px;
}
.photo{

}
.username{
    font-size: 16px;
}
</style>
