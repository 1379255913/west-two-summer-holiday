<template>
    <div class="box">
        <div class="headers">
            <V3Emoji :options-name="optionsName" @clickEmoji="test" class="emoji">
                <el-icon class="icons" :size="20">
                    <svg-icon name="emoji" />
                </el-icon>
            </V3Emoji>
            <el-icon class="icons" :size="20">
                <svg-icon name="ep:folder" />
            </el-icon>
            <el-icon class="icons" :size="20">
                <svg-icon name="ep:edit" />
            </el-icon>
        </div>
        <div class="inputs" @keydown.enter="sendMessage">
            <textarea v-model="textarea"></textarea>
        </div>
    </div>
</template>

<script setup>
import { reactive,toRefs,inject,ref } from 'vue'
import { ElMessage } from 'element-plus'
import useChatStore from "@/store/modules/chat";
import useUserStore from "@/store/modules/user";
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
const socket = inject("socket")
const chatStore = useChatStore()
const userStore = useUserStore()
const optionsName = {
    'Smileys & Emotion': '笑脸&表情',
    'Food & Drink': '食物&饮料',
    'Animals & Nature': '动物&自然',
    'Travel & Places': '旅行&地点',
    'People & Body': '人物&身体',
    Objects: '物品',
    Symbols: '符号',
    Flags: '旗帜',
    Activities: '活动'
}
const textarea = ref('')
const test = (emoji)=>{
    textarea.value+=emoji
}
const sendMessage = ()=>{
    if (textarea.value!==''){
        let data ={
            "room_id": chatStore.ClickUser.room_id,
            "sender_id": userStore.user_id,
            "reader_id": chatStore.ClickUser.friend.user_id,
            "message": textarea.value
        }
        socket.emit('send_room_msg',data)
        console.log(textarea.value)
        setTimeout(()=>{
            textarea.value = ''
        },50)
    } else {
        ElMessage.error('不能发送空白消息')
    }
}
</script>

<style lang="scss" scoped>
.box{
    height: 200px;
    border: 1px lightgrey;
    border-style: solid none none none;
}
.headers{
    padding : 10px 10px 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.inputs{
    padding: 10px;
}
.icons{
    margin-right: 8px;
}
.emoji{
    :deep(.pollup){
        right: unset !important;
    }
    width: unset;
}
textarea{
    resize:none;
    width: 100%;
    height: 150px;
    border:0;
    outline:none;
    font-size: 15px;
}
</style>
