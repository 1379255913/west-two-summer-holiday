<!--<template>-->
<!--    <div class="outbox">-->
<!--        <el-scrollbar height="420px">-->
<!--        <div v-for="(item,index) in messages" :key="index" :class="item.user!==account?'outbox-left':'outbox-right'">-->
<!--        <div class="outbox-left" v-if="item.user!==account">-->
<!--            <div class="rol">-->
<!--            <div class="inform">-->
<!--                <el-avatar class="photo" :size="25" :src="item.photo" />-->
<!--                <span class="username">-->
<!--                {{item.user}}-->
<!--            </span>-->
<!--                <span class="time">-->
<!--                {{item.time}}-->
<!--            </span>-->

<!--            </div>-->
<!--            <div class="message-cow">-->
<!--            <span class="message-box">-->
<!--                <span class="messages">-->
<!--                    {{item.text}}-->
<!--                </span>-->
<!--            </span>-->

<!--            </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="outbox-right" v-else>-->
<!--            <div class="rol">-->
<!--            <div class="inform-right">-->
<!--                <el-avatar class="photo" :size="25" :src="item.photo" />-->
<!--                <span class="username">-->
<!--                {{item.user}}-->
<!--            </span>-->
<!--                <span class="time-right">-->
<!--                {{item.time}}-->
<!--            </span>-->

<!--            </div>-->
<!--            <div class="message-cow">-->
<!--            <span class="message-box">-->
<!--                <span class="messages">-->
<!--                    {{item.text}}-->
<!--                </span>-->
<!--            </span>-->

<!--            </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        </div>-->
<!--        </el-scrollbar>-->
<!--    </div>-->

<!--</template>-->

<!--<script>-->
<!--import { reactive,toRefs,inject,onMounted,onUnmounted } from 'vue'-->
<!--import useUserStore from "@/store/modules/user";-->
<!--import {storeToRefs} from "pinia";-->
<!--import moment from 'moment'-->
<!--import useChatStore from "@/store/modules/chat";-->
<!--import { ElNotification } from 'element-plus'-->
<!--export default {-->
<!--    name: "messages",-->
<!--    setup(){-->
<!--        const socket = inject("socket")-->
<!--        const useUser = useUserStore()-->
<!--        const userChat = useChatStore()-->
<!--        const { ClickUser,UserState } = storeToRefs(userChat);-->
<!--        const { account } = storeToRefs(useUser)-->
<!--        const state = reactive({-->
<!--            messages:[-->
<!--                {-->
<!--                    user:'admin',-->
<!--                    photo:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',-->
<!--                    time:'2022.06.27 14:53:00',-->
<!--                    text:'下午好！以下为2022年鲤城区暑期大学生“返家乡”社会实践暨“扬帆计划”活动实践单位汇总表，请本学院泉州籍的同学积极报名，并在6月28日午12点前将报名材料（报名表+学生个人简历一份）打包发送至邮箱3063137896@qq.com。感谢大家的配合！'-->
<!--                }-->
<!--            ]-->
<!--        })-->
<!--        onMounted(()=>{-->
<!--            socket.on('getmessage',(res)=>{-->
<!--                if (res.user===userChat.ClickUser||res.user===useUser.account){-->
<!--                    res.time = moment(res.time).format('YYYY-MM-DD HH:mm:ss')-->
<!--                    state.messages.push(res)-->
<!--                }else {-->
<!--                    ElNotification({-->
<!--                        title: res.user,-->
<!--                        message: res.text,-->
<!--                    })-->
<!--                }-->
<!--            })-->
<!--        })-->
<!--        onUnmounted(()=>{-->
<!--            socket.off('getmessage')-->
<!--        })-->
<!--        return{-->
<!--            ...toRefs(state),-->
<!--            account-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--div{-->
<!--    display: flex;-->
<!--}-->
<!--span{-->
<!--    display: flex;-->
<!--}-->
<!--.outbox-left{-->
<!--    flex-direction: row;-->
<!--    .message-box{-->
<!--        background-color: #e5e5e5;-->
<!--        margin: 0 0 0 23px;-->
<!--        border-radius: 5px;-->
<!--        max-width: 75%;-->
<!--    }-->
<!--    .messages{-->
<!--        /*border: 1px lightgrey;*/-->
<!--        /*border-style:  solid;*/-->
<!--        padding: 10px;-->
<!--    }-->
<!--    .time{-->
<!--        padding: 0 0 0 10px;-->
<!--    }-->
<!--}-->
<!--.outbox-right{-->
<!--    flex-direction: row-reverse;-->
<!--    .message-box{-->
<!--        flex-direction: row-reverse;-->
<!--        background-color: #e5e5e5;-->
<!--        margin: 0 23px 0 0;-->
<!--        border-radius: 5px;-->
<!--        max-width: 75%;-->
<!--    }-->
<!--    .messages{-->
<!--        /*border: 1px lightgrey;*/-->
<!--        /*border-style:  solid;*/-->
<!--        padding: 10px;-->
<!--    }-->
<!--    .time-right{-->
<!--        padding: 0 10px 0 0;-->
<!--    }-->
<!--    .inform-right{-->
<!--        flex-direction: row-reverse;-->
<!--    }-->
<!--    .message-cow{-->
<!--        flex-direction: row-reverse;-->
<!--    }-->
<!--}-->
<!--.outbox{-->
<!--    width: 100%;-->
<!--    flex-direction: column;-->
<!--}-->
<!--.rol{-->
<!--    width: 100%;-->
<!--    flex-direction: column;-->
<!--    padding: 10px;-->
<!--}-->
<!--.photo{-->

<!--}-->

<!--</style>-->
