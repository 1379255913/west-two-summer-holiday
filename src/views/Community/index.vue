<template>
    <div class="container">
        <page-main style="width: 1050px">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
            >
                <el-menu-item class="menu-item" index="question" @click="activeIndex='question'">问 答</el-menu-item>
                <el-menu-item class="menu-item" index="vote" @click="activeIndex='vote'">投 票</el-menu-item>
                <el-input
                    v-model="searchInput"
                    class="input-with-select"
                    @keyup.enter="searchInform"
                    v-show="activeIndex==='question'"
                >
                    <template #prepend>
                        <el-button @click="searchInform">
                            <template #icon>
                                <el-icon>
                                    <svg-icon name="search-com" />
                                </el-icon>
                            </template>
                        </el-button>
                    </template>
                    <template #append>
                        <el-select v-model="searchSelect" placeholder="Select" style="width: 80px">
                            <el-option label="文章" value="title" />
                            <el-option label="用户" value="username" />
                        </el-select>
                    </template>
                </el-input>
                <el-button style="height: 32px;margin-left: 20px;margin-right: 0;" type="primary" @click="sendQuestion" v-show="activeIndex==='question'">提问</el-button>
                <el-button style="height: 32px;margin-left: auto;margin-right: 0;" type="primary" @click="sendVote" v-show="activeIndex==='vote'">投票</el-button>
            </el-menu>
            <ul class="main" v-infinite-scroll="loadMoreQuestion" :infinite-scroll-disabled="disabled" v-if="activeIndex==='question'">
                <el-skeleton style="width: 100%;" animated v-for="t in 5" :loading="loading">
                    <template #template>
                        <li class="main-item">
                            <div class="item-header">
                                <div class="item-header-left">
                                    <el-skeleton-item variant="p" style="width: 100px;"/>
                                </div>
                                <div class="item-header-right">
                                    <el-skeleton-item variant="p" style="width: 100px;"/>
                                </div>
                            </div>
                            <div class="item-title">
                                <el-skeleton-item variant="p" style="width: 800px;"/>
                            </div>
                            <div class="item-content">
                                <el-skeleton-item variant="p" style="width: 800px;"/>
                                <div style="padding: 20px 0 0 0"></div>
                                <el-skeleton-item variant="p" style="width: 800px;"/>
                            </div>
                        </li>
                    </template>
                </el-skeleton>
                <li class="main-item" v-for="(item,index) in state.articleArray" :key="item.question_id">
                    <div class="item-main">
                        <div class="item-header">
                            <div class="item-header-left">
                                <router-link :to="{ name: 'personalInfo_index', params: { id: item.user_id }}" style="display: flex;align-items: center;">
                                <el-avatar :size="20" class="comment-image" :src="item.avatar" />
                                <span>{{ item.username }}</span>
                                </router-link>
                            </div>
                            <div class="item-header-right">
                                {{ timeAgo(item.send_time) }}
                            </div>
                        </div>
                        <div class="item-title">
                            <div class="item-title-detail" @click="getDetail(item.question_id)">{{ item.question_title }}</div>
                            <div v-auth="'permission.remove'">
                                <el-popconfirm title="你确定要删除吗?" @confirm="deleteQuestionAdmin(item.question_id)">
                                    <template #reference>
                                        <el-button type="danger" size="small">
                                            删除<el-icon class="el-icon--right"><svg-icon name="ep:delete"/></el-icon>
                                        </el-button>
                                    </template>
                                </el-popconfirm>
                            </div>
                        </div>
                        <div class="item-content">
                            {{ item.question_content.replace(/<\/?.+?>/g,"").replace(/ /g,"") }}
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="main" v-if="activeIndex==='vote'">
                <li class="main-item" v-for="(item,index) in 20">
                    <div>123</div>
                </li>
            </ul>
        </page-main>
        <page-main style="width: 25%">
            <slider></slider>
        </page-main>
    </div>
</template>

<script setup>
import { ref,reactive,toRefs,onMounted,computed } from 'vue'
import Slider from './slider.vue'
import { useRouter } from "vue-router";
import { getQuestionList,getVoteList,putVote } from '@/apiArray/community'
import timeAgo from "@/util/timeAgo";
import { deleteQuestion } from '@/apiArray/admin'
import {ElMessage} from "element-plus";
//菜单
const activeIndex = ref('question')
//搜索
const searchSelect = ref('title')
const searchInput = ref('')
const isSearch = ref(false)
const searchInform = ()=>{
    isSearch.value =true
    getQuestionList(1,isSearch.value,searchSelect.value,searchInput.value).then(res=>{
        console.log(res)
        state.current_page = parseInt(res.current_page)
        state.articleArray = res.questions
        state.total_article = res.total_article
        state.total_page = res.total_page
        loading.value = false
    })
}
//提问
const router = useRouter()
const sendQuestion = ()=>{
    router.push({ name: 'senior_experience_question'})
}
//获取数据
const state = reactive({
    articleArray: [],
    current_page: 1,
    total_article: 0,
    total_page: 0,
})
onMounted(()=>{
    getQuestionList(1,isSearch.value,searchSelect.value,searchInput.value).then(res=>{
        state.articleArray = res.questions
        state.total_article = res.total_article
        state.total_page = res.total_page
        loading.value = false
    })
})
//获取更多数据
const isLoadingData = ref(false)
const noMore = computed(() => state.current_page > state.total_page)
const disabled = computed(() => isLoadingData.value || noMore.value)
const loadMoreQuestion = ()=>{
    isLoadingData.value =true
    getQuestionList(state.current_page+1,isSearch.value,searchSelect.value,searchInput.value).then(res=>{
        state.articleArray = [...state.articleArray,...res.questions]
        state.current_page = state.current_page+=1
        isLoadingData.value =false
    })
}
//骨架屏
const loading = ref(true)
//跳转到详情
const getDetail = (question_id)=>{
    router.push({ name: 'senior_experience_detail', params: { id: question_id }})
}
//删除回答
const deleteQuestionAdmin = (question_id)=>{
    deleteQuestion(question_id).then(res=>{
        for (let i = 0; i <state.articleArray.length; i++) {
            console.log(state.articleArray[i].question_id)
            if (state.articleArray[i].question_id===question_id){
                state.articleArray.splice(i,1)
            }
        }
        ElMessage.success('删除成功')
    })
}
//发起投票
const sendVote = ()=>{
    router.push({ name: 'senior_experience_vote'})
}
//获取投票数据
const getVoteData = ()=>{

}
//进行投票
const submitVote = ()=>{
    putVote
}
</script>

<style lang="scss" scoped>
a{
    color: black;
    text-decoration: none;
}
li, ul{
    list-style: none;
    width: 100%;
}
.main{
    padding: 0;
    display: flex;
    flex-direction: column;
    .main-item{
        display: flex;
        flex-direction: column;
        border-bottom: 1px #ededed solid;
        padding: 10px 0;
        transition: transform 0.3s, background-color 0.3s, var(--el-transition-border);
    }
    .main-item:hover{
        background-color: #f7fbfd;

    }
}
.menu-item{
    width: 80px;
    font-size: 16px;
    font-weight: 700;
}
.el-menu-demo{
    align-items: center;
}
.input-with-select{
    width: 300px;
    height: 32px;
    margin-left: auto;
    margin-right: 0;
}
.container{
    display: flex;
    flex-direction: row;
}
.item-main{
    padding: 5px 10px;
}
.item-header{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    .item-header-left{
        display: flex;
    }
}
.item-title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .item-title-detail{
        cursor:pointer;
        font-size: 18px;
        font-weight: 600;
        margin: 10px 0 0 0;
    }
}
.item-content{
    line-height: 1.5;
    margin: 8px 0;
    color: #999;
    overflow: hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical
}
</style>
