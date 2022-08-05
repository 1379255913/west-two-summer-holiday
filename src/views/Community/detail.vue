<template>
    <div style="display: flex">
        <div>
            <page-main style="width: 1050px">
                <div class="question">
                    <div class="question-title">
                        {{ state.question_title }}
                    </div>
                    <div class="question-user">
                        <el-avatar :size="25" class="question-img" :src="state.avatar"></el-avatar>
                        <span style="padding: 0 0 0 10px">{{ state.username }}</span>
                        <span style="padding: 0 0 0 10px">
                            <el-tag v-for="item in state.tags" size="small" :effect="'plain'" style="margin: 0 5px 0 0">
                                {{ item }}
                            </el-tag>
                        </span>
                    </div>
                    <div class="question-content" v-html="state.question_content">
                    </div>

                    <el-divider/>
                    <div class="question-footer">
                        <el-button size="large" type="primary" @click="answerForm.isEdit=true">
                            <el-icon :size="18">
                                <svg-icon name="ep:edit-pen" />
                            </el-icon>
                            &nbsp;写回答
                        </el-button>
                        <el-button size="large">
                            <el-icon :size="18">
                                <svg-icon name="ep:plus" />
                            </el-icon>
                            &nbsp;关注问题
                        </el-button>
                    </div>
                </div>
            </page-main>
            <page-main style="width: 1050px" v-if="answerForm.isEdit">
                <Editor v-model="answerForm.text"></Editor>
                <div style="margin: 15px 0 0 0">
                    <el-button type="primary" @click="submitAnswer" :disabled="answerForm.loading||!answerForm.text">
                        <span v-show="!answerForm.loading">发布回答</span>
                        <span v-show="answerForm.loading">
                            <el-icon class="is-loading">
                                <svg-icon name="loading" />
                            </el-icon>
                        </span>
                    </el-button>
                    <el-button type="danger" @click="answerForm.isEdit=false">取消回答</el-button>
                </div>
            </page-main>
            <page-main style="width: 1050px">
                <div class="answer">
                    <div class="list-header">
                        <div class="header-left">
                            {{ state.answer_ids.length+pageList.my_answer + '个回答' }}
                        </div>
                        <div class="header-right">
                            <el-select v-model="sortWay" placeholder="Select" style="width: 120px">
                                <el-option label="默认排序" value="1" />
                                <el-option label="按时间排序" value="2" />
                            </el-select>
                        </div>
                    </div>
                    <div class="list-main">
                        <ul style="list-style: none;padding: 0 15px;" v-infinite-scroll="loadMoreAnswer" :infinite-scroll-disabled="disabled">
                            <li v-for="(item,index) in answerList" :key="item.answer_id" class="content-card-wrap">
                                <div class="content-card">
                                    <div class="card-header">
                                        <div class="avatar-user-info">
                                            <el-avatar :size="40" class="question-img" :src="item.user.avatar"></el-avatar>
                                            <div class="user-message">
                                                <div class="user-title">
                                                    {{ item.user.username }}
                                                </div>
                                                <div class="user-tags">
                                                    <el-tag v-for="tag in item.user.tags" size="small" :effect="'plain'" style="margin: 0 5px 0 0">
                                                        {{ tag }}
                                                    </el-tag>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-main" v-html="item.answer_content">
                                    </div>
                                    <div class="card-time">
                                        {{ timeAgo(item.send_time) }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </page-main>
        </div>

        <page-main style="width: 25%">
            <slider></slider>
        </page-main>

    </div>
</template>

<script setup>
import { ref,toRefs,reactive,onMounted,computed } from 'vue'
import Slider from './slider.vue'
import { getFirstQuestion,postAnswer,getAnswer } from "@/apiArray/community";
import {useRouter, useRoute} from 'vue-router'
import timeAgo from "@/util/timeAgo";
const sortWay = ref('1')
//获取数据
const oid = useRoute().params.id
const state = reactive({
    avatar: '',
    username: '',
    question_content: '',
    question_title: '',
    tags: [],
    answer_ids: [],
    page_number: 5
})
const pageList = reactive({
    current_page: 1,
    total_page: computed(()=>Math.ceil(state.answer_ids.length/state.page_number)),
    my_answer: 0,
})
const loadAnswer = ()=>{
    let data =[]
    console.log(pageList.current_page,pageList.total_page)
    if (pageList.current_page===pageList.total_page){
        data = state.answer_ids.slice((pageList.current_page-1)*state.page_number,state.answer_ids.length)
    }else {
        data = state.answer_ids.slice((pageList.current_page-1)*state.page_number,pageList.current_page*state.page_number)
    }
    getAnswer(data).then(res=>{
        answerList.value = [...answerList.value,...res]
        console.log(answerList.value)
        pageList.current_page+=1
        loading.value = false
    })
}
onMounted(()=>{
    getFirstQuestion(oid).then(res=>{
        state.avatar = res.avatar
        state.username = res.username
        state.question_content = res.question_content
        state.question_title = res.question_title
        state.tags = res.tags || []
        state.answer_ids = res.answer_ids || []
        loading.value = true
        loadAnswer()
    })
})
//加载更多回答
const answerList = ref([])
const loading = ref(false)
const noMore = computed(() => pageList.current_page > pageList.total_page)
const disabled = computed(() => loading.value || noMore.value)
const loadMoreAnswer = ()=>{
    loading.value = true
    loadAnswer()
}
//写回答
const answerForm = reactive({
    isEdit : false,
    text: '',
    loading: false
})
const submitAnswer = ()=>{
    let data = {
        question_id: oid,
        content: answerForm.text
    }
    answerForm.loading = true
    postAnswer(data).then(res=>{
        answerForm.loading = false
        answerList.value.unshift(res)
        pageList.my_answer+=1
        answerForm.isEdit =false
    })
}
</script>

<style lang="scss" scoped>
.question-title{
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
}
.question-content{
    margin: 8px 0 0 0;
    color: #666666;
}
.question-user{
    margin: 16px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.content-card-wrap{
    list-style: none;
    padding: 20px 0;
    border-bottom: 1px solid #e8eaeb;
}
.list-header{
    padding: 0 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #e8eaeb;
    .header-left{
        font-weight: 600;
    }
}
.avatar-user-info{
    display: flex;
    .user-message{
        padding: 0 0 0 8px;
        .user-title{
            font-size: 16px;
        }
        .user-tags{
            font-size: 13px;
            color: #666666;
        }
    }
}
.card-time{
    color: #666666;
    font-size: 14px;
}
</style>
