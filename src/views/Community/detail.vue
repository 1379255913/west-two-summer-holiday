<template>
    <div style="display: flex">
        <div>
            <page-main style="width: 1050px">
                <div class="question">
                    <div class="question-title">
                        {{ state.question_title }}
                    </div>
                    <div class="question-user">
                        <router-link :to="{ name: 'personalInfo_index', params: { id: state.user_id }}" style="display: flex;align-items: center;">
                        <el-avatar :size="25" class="question-img" :src="state.avatar"></el-avatar>
                        <span style="padding: 0 0 0 10px">{{ state.username }}</span>
                        </router-link>
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
                            {{ state.answer_ids.length+pageList.my_answer-deleteNumber + '个回答' }}
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
                                            <router-link :to="{ name: 'personalInfo_index', params: { id: item.user.user_id }}">
                                            <el-avatar :size="40" class="question-img" :src="item.user.avatar"></el-avatar>
                                            </router-link>
                                            <div class="user-message">
                                                <div class="user-title">
                                                    <router-link :to="{ name: 'personalInfo_index', params: { id: item.user.user_id }}">
                                                    {{ item.user.username }}
                                                    </router-link>
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
                                        <span>{{ timeAgo(item.send_time) }}</span>
                                        <div v-auth="'permission.remove'">
                                            <el-popconfirm title="你确定要删除吗?" @confirm="deleteAnswerAdmin(item.answer_id)">
                                                <template #reference>
                                                    <el-button type="danger" size="small">
                                                        删除<el-icon class="el-icon--right"><svg-icon name="ep:delete" /></el-icon>
                                                    </el-button>
                                                </template>
                                            </el-popconfirm>
                                        </div>
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
import { deleteAnswer } from '@/apiArray/admin'
import {useRouter, useRoute} from 'vue-router'
import timeAgo from "@/util/timeAgo";
import { ElMessage } from 'element-plus'
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
    page_number: 5,
    user_id: '1'
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
        state.user_id = res.user_id
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
//删除回答
const deleteNumber = ref(0)
const deleteAnswerAdmin = (ans)=>{
    let data = {
        question_id: oid,
        answer_id: ans,
    }
    deleteAnswer(data).then(res=>{
        for (let i = 0; i <answerList.value.length; i++) {
            if (answerList.value[i].answer_id===ans){
                answerList.value.splice(i,1)
            }
        }
        deleteNumber.value+=1
        ElMessage.success('删除成功')
    })

}
//获取投票

</script>

<style lang="scss" scoped>
a{
    color: black;
    text-decoration: none;
}
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
    display: flex;
    color: #666666;
    font-size: 14px;
    flex-direction: row;
    justify-content: space-between;
}
</style>
