<template>
    <div class="container">
        <page-main style="width: 1050px">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
            >
                <el-menu-item class="menu-item" index="1">默 认</el-menu-item>
                <el-menu-item class="menu-item" index="2">最 新</el-menu-item>
                <el-menu-item class="menu-item" index="3">最 热</el-menu-item>
                <el-menu-item class="menu-item" index="4">精 华</el-menu-item>
                <el-input
                    v-model="searchInput"
                    class="input-with-select"
                    @keyup.enter="searchInform"
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
                <el-button style="height: 32px;margin-left: 20px;margin-right: 0;" type="primary" @click="sendQuestion">发帖</el-button>
            </el-menu>
            <ul class="main" v-infinite-scroll="loadMoreQuestion" :infinite-scroll-disabled="disabled">
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
                                <el-avatar :size="20" class="comment-image" :src="item.avatar" />
                                <span>{{ item.username }}</span>
                            </div>
                            <div class="item-header-right">
                                {{ timeAgo(item.send_time) }}
                            </div>
                        </div>
                        <div class="item-title" @click="getDetail(item.question_id)">
                            {{ item.question_title }}
                        </div>
                        <div class="item-content">
                            {{ item.question_content.replace(/<\/?.+?>/g,"").replace(/ /g,"") }}
                        </div>
                    </div>
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
import { getQuestionList } from '@/apiArray/community'
import timeAgo from "@/util/timeAgo";
//菜单
const activeIndex = ref('1')
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
</script>

<style lang="scss" scoped>
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
.input-with-select{
    width: 300px;
}
.el-menu-demo{
    align-items: center;
}
.input-with-select{
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
    cursor:pointer;
    font-size: 18px;
    font-weight: 600;
    margin: 10px 0 0 0;
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
