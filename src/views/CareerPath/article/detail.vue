<template>
    <div class="container">
        <page-main style="width: 1050px">
            <el-skeleton style="width: 100%;" animated :loading="loading">
                <template #template>
                    <div class="title">
                        <div class="title-text">
                            <el-skeleton-item variant="h1" style="width: 600px;height: 40px"/>
                        </div>
                        <span style="display:flex;flex-shrink: 0;">
                            <el-skeleton-item variant="text" style="width: 130px; height: 30px"/>
                        </span>
                    </div>
                    <div class="main">
                        <el-skeleton-item variant="p" style="width: 100%;margin: 15px 0;height: 25px" v-for="(item,index) in 7" :key="index"/>
                    </div>
                </template>
            </el-skeleton>
            <div class="title" v-show="!loading">
                <div class="title-text">
                    {{ title }}
                </div>
                <span style="display:flex;flex-shrink: 0;">
                    <span>
                        <like :is-liked="like"></like>
                    </span>
                    <span style="padding: 0 0 0 30px">
                        <favorite :is-liked="favorite"></favorite>
                    </span>
                </span>
            </div>
            <div class="main" v-html="content">
            </div>
            <el-divider />
            <div class="comment">
                <div class="comment-title">
                    发表评论
                </div>
                <textarea class="comment-text" placeholder="发表神妙评论"></textarea>
            </div>
        </page-main>

        <page-main style="width: 25%">
            <div class="slider">
                <div class="hot-news">
                    <span class="title-left"></span>
                    <span class="slider-title">
                        热门新闻
                    </span>
                    <ul style="padding: 0">
                        <li class="slider-text" v-for="item in 3">【海归必读】远程面试如何准备？</li>
                    </ul>
                    <span class="title-left"></span>
                    <span class="slider-title">
                        为你推荐
                    </span>
                    <ul style="padding: 0">
                        <li class="slider-text" v-for="item in 3">【海归必读】远程面试如何准备？</li>
                    </ul>
                </div>
            </div>
        </page-main>
    </div>

</template>

<script setup>
import Like from '@/components/Like/index.vue'
import Favorite from '@/components/Favorite/index.vue'
import { onMounted,reactive,toRefs,ref } from 'vue'
import {getArticleDetail,putLikeOrFavorite,getLikeOrFavorite} from "@/apiArray/article";
import {useRouter, useRoute} from 'vue-router'
//获取文章信息
const state = reactive({
    title: '',
    content: '',
    like:false,
    favorite:true,
    comment:[],
    _oid: ''
})
const oid = useRoute().params.id
onMounted(()=>{
    console.log(oid);
    getArticleDetail(oid).then(res=>{
        state._oid = res._oid
        state.title = res.title
        state.content = res.content
        loading.value = false
    })
    // getLikeOrFavorite(oid).then(res=>{
    //     state.like = res.user.like
    //     state.favorite = res.user.collect
    // })
})

let { title,content,like,favorite,comment } = toRefs(state)

//点赞和收藏
const LikeOrFavorite = (type,number) =>{
    putLikeOrFavorite(state._oid,type,number).then(res=>{
        console.log(123)
    })
}

//骨架屏
const loading = ref(true)

</script>

<style scoped lang="scss">
ul, li, ol{
    list-style: none !important;
}
p{
    padding: 15px 0;
}

.container{
    display: flex;
    flex-direction: row;
    .title{
        padding: 35px 35px 0 35px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .title-text{
            flex-shrink: 1;
            font-size: 32px;
            line-height: 50px;
            font-weight: 700;
            display: flex;
        }
    }
}
.main{
    width: 1000px;
    padding: 35px 35px 35px;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: .5px;
    line-height: 30px;
    /*border-style: none solid none none;*/
    /*border-width: 10px;*/
    /*border-color: #f5f7f9;*/
    :deep(img){
    max-width: 600px !important;
    }
}
.slider{
    padding: 20px 12px 15px;
    .hot-news{

        .slider-title{
            font-size: 16px;
        }
        .title-left{
            width: 5px;
            height: 20px;
            background: #0bab73;
            display: inline-block;
            vertical-align: top;
            margin-right: 10px;
        }
        ul li {
            list-style: none;
        }
        .slider-text{
            padding: 15px 0 15px 0;
            border-bottom: 1px #ededed solid;
            font-size: 20px;
            font-weight: 400;
        }
    }
}
.comment{

    .comment-text{
        padding: 16px 16px 23px;
        width: 100%;
        resize: none;
        background: #f5f5f6;
        border-radius: 12px;
        border: none;
        color: #1f1f1f;
        outline: none;
    }
}
</style>
