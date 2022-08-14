<!--<template>-->
<!--    <div class="box">-->
<!--        <div class="headers">-->
<!--            <el-icon class="icons" :size="20">-->
<!--                <svg-icon name="ep:edit" />-->
<!--            </el-icon>-->
<!--            &nbsp;-->
<!--            <el-icon class="icons" :size="20">-->
<!--                <svg-icon name="ep:folder" />-->
<!--            </el-icon>-->
<!--            &nbsp;-->
<!--            <el-icon class="icons" :size="20">-->
<!--                <svg-icon name="ep:edit" />-->
<!--            </el-icon>-->
<!--        </div>-->
<!--        <div class="inputs" @keydown.enter="sendMessage">-->
<!--            <textarea style="resize:none;width: 100%;height: 150px; border:0;outline:none;" v-model="textarea"></textarea>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--import { reactive,toRefs,inject } from 'vue'-->
<!--import useChatStore from '@/store/modules/chat'-->
<!--import useUserStore from '@/store/modules/user'-->
<!--export default {-->
<!--    setup(){-->
<!--        const userChat = useChatStore()-->
<!--        const useUser = useUserStore()-->
<!--        const state = reactive({-->
<!--            textarea:''-->
<!--        })-->
<!--        const socket = inject("socket")-->
<!--        //发送文档-->
<!--        const sendMessage =()=>{-->
<!--            socket.emit('sendmessage',{-->
<!--                text: state.textarea,-->
<!--                from_user : useUser.account,-->
<!--                to_user : userChat.ClickUser,-->
<!--            })-->
<!--            setTimeout(()=>{-->
<!--                state.textarea=''-->
<!--            },20)-->
<!--        }-->

<!--        return{-->
<!--            ...toRefs(state),-->
<!--            sendMessage-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.box{-->
<!--    height: 200px;-->
<!--    border: 1px lightgrey;-->
<!--    border-style: solid none none none;-->
<!--}-->
<!--.headers{-->
<!--    padding : 10px 10px 0 10px;-->
<!--    display: flex;-->
<!--    flex-direction: row;-->
<!--    justify-content: flex-start;-->
<!--}-->
<!--.inputs{-->
<!--    padding: 10px;-->
<!--}-->
<!--.icons{-->
<!--}-->
<!--</style>-->
