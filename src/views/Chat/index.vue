<!--<template>-->
<!--    <div>-->
<!--        <page-main>-->
<!--            <el-row>-->
<!--                <el-col :span="6">-->
<!--                    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">-->
<!--                        <template #header>-->
<!--                            <div class="card-header">-->
<!--                                <el-avatar style="float:left; " :size="40" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />-->
<!--                                <div class="names">admin</div>-->
<!--                            </div>-->
<!--                        </template>-->
<!--                        <el-scrollbar height="600px">-->
<!--                            <div v-for="o in 20" :key="o" class="users">-->
<!--                                <div class="user-list" @click="changeClick('admin'+o)" :style="getCurrent(o)">-->
<!--                                    <div class="user-list-left">-->
<!--                                        <el-avatar style="float:left; text-align: center;" :size="25" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />-->
<!--                                        <div class="names">{{ 'admin'+o }}</div>-->
<!--                                    </div>-->
<!--                                    <div class="ans">12</div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </el-scrollbar>-->
<!--                    </el-card>-->
<!--                </el-col>-->
<!--                <el-col :span="18">-->
<!--                    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">-->
<!--                        <template #header  v-if="ClickUser">-->
<!--                            <div class="card-header">-->
<!--                                <div style="font-size: 24px">{{ ClickUser }}</div>-->
<!--                                <el-tag v-if="UserState==='离线'" class="ml-2" type="info">离线</el-tag>-->
<!--                                <el-tag v-else-if="UserState==='在线'" class="ml-2" type="success">在线</el-tag>-->
<!--                            </div>-->
<!--                        </template>-->
<!--                        <div style="display: flex;height: 631px;flex-direction: column; justify-content: space-between;" v-if="ClickUser">-->
<!--                            <div>-->
<!--                                <messages></messages>-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                <inputbox></inputbox>-->
<!--                            </div>-->

<!--                        </div>-->
<!--                    </el-card>-->
<!--                </el-col>-->
<!--            </el-row>-->

<!--        </page-main>-->
<!--    </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import Messages from "@/views/Chat/messages";-->
<!--import Inputbox from "@/views/Chat/inputbox";-->
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
