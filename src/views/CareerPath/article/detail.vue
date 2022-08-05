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
                    <span style="display: flex;">
                        <like v-model:is-liked="like" @click="LikeOrFavorite('like')"></like>
                        <span>{{ likeNumber }}</span>
                    </span>
                    <span style="padding: 0 0 0 30px;display: flex;">
                        <favorite v-model:is-liked="favorite" @click="LikeOrFavorite('favorite')"></favorite>
                        <span>{{ favoriteNumber }}</span>
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
                <div class="comment-text">
                    <el-avatar :size="50" class="comment-image" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                    <textarea class="comment-textarea" placeholder="发表神妙评论" v-model="comments"></textarea>
                </div>
                <el-button class="comment-button" style="width: 60px" type="primary" plain @click="postComments('father')" :disabled="commentLoading||!comments">
                    <span v-show="!commentLoading">发布</span>
                    <span v-show="commentLoading">
                            <el-icon class="is-loading">
                                <svg-icon name="loading" />
                            </el-icon>
                        </span>
                </el-button>
                <div class="comment-title">
                    评论列表
                </div>
                <div class="comment-detail">
                    <div class="comment-detail-list" v-for="(item,index) in comment" :key="index">
                        <div class="list-left">
                            <el-avatar :size="40" class="comment-image" :src="item.avatar" />
                        </div>
                        <div class="list-right">
                            <div class="list-title">
                               {{ item.username }}
                            </div>
                            <div class="list-text">
                                {{ item.comment }}
                            </div>
                            <div class="interact-bar">
                                <div class="interact-time">
                                    {{ timeAgo(item.send_time) }}
                                </div>
                                <div class="reply" @click="subComments(item.comment_id)">
                                    <svg-icon style="width: 30px;height: 20px" name="reply" />
                                    <div>回复</div>
                                </div>
                            </div>
                            <div class="comment-detail-list" style="margin: 0" v-for="(subitem,subIndex) in item.subcomment" :key="subIndex">
                                <div class="list-left">
                                    <el-avatar :size="40" class="comment-image" :src="subitem.avatar" />
                                </div>
                                <div class="list-right" style="padding: 0 0 0 20px">
                                    <div class="list-title">
                                        {{ subitem.username }}
                                    </div>
                                    <div class="list-text">
                                        {{ subitem.subcomment }}
                                    </div>
                                    <div class="interact-bar">
                                        <div class="interact-time">
                                            {{ timeAgo(subitem.send_time) }}
                                        </div>
                                        <div class="reply" @click="subComments(item.comment_id)">
                                            <svg-icon style="width: 30px;height: 20px" name="reply" />
                                            <div>回复</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </page-main>

        <page-main style="width: 25%">
            <recommend></recommend>
        </page-main>
        <el-dialog v-model="dialogFormVisible" title="回复">
            <el-form :model="form">
                <el-form-item>
                    <div class="comment-text" style="width: 100%">
                        <el-avatar :size="50" class="comment-image" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                        <textarea class="comment-textarea" placeholder="发表神妙评论" v-model="form.comment"></textarea>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" style="width: 64px;" @click="commit" :disabled="commentLoading||!form.comment" >
                        <span v-show="!commentLoading">发布</span>
                        <span v-show="commentLoading">
                            <el-icon class="is-loading">
                                <svg-icon name="loading" />
                            </el-icon>
                        </span>
                    </el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>

</template>

<script setup>
import Like from '@/components/Like/index.vue'
import Favorite from '@/components/Favorite/index.vue'
import Recommend from './recommend.vue'
import { onMounted,reactive,toRefs,ref } from 'vue'
import {getArticleDetail,putLikeOrFavorite,getLikeOrFavorite,postComment} from "@/apiArray/article"
import {useRouter, useRoute} from 'vue-router'
import timeAgo from "@/util/timeAgo";
//获取文章信息
const state = reactive({
    title: '',
    content: '',
    like:false,
    favorite:false,
    comment:[],
    _oid: '',
    likeNumber:0,
    favoriteNumber: 0,
})
const oid = useRoute().params.id
onMounted(()=>{
    console.log(oid);
    let array = [];
    array.push(getArticleDetail(oid))
    array.push(getLikeOrFavorite(oid))
    Promise.all(array).then(resArray=>{
        if (resArray[0]){
            let res = resArray[0]
            state._oid = res._oid
            state.title = res.title
            state.content = res.content
            state.comment = res.comment
            state.likeNumber = res.like
            state.favoriteNumber = res.collect
            loading.value = false
        }
        if (resArray[1]){
            let res = resArray[1]
            state.like = res.user.like
            state.favorite = res.user.collect
            console.log(state.like,state.favorite);
        }
    })
})

let { title,content,like,favorite,comment,likeNumber,favoriteNumber } = toRefs(state)

//点赞和收藏
const LikeOrFavorite = (type) =>{
    let number = 1
    if ((type==='like'&&state.like===true)||(type==='favorite'&&state.favorite===true)){
        number = -1
    }
    if (type==='like'){
        state.like= !state.like
        state.likeNumber+=number
    } else if (type==='favorite'){
        state.favorite =!state.favorite
        state.favoriteNumber+=number
    }
    putLikeOrFavorite(oid,type,number).then(res=>{
        console.log(123)
    })
}

//骨架屏
const loading = ref(true)


//评论组件
const commentLoading = ref(false)
const dialogFormVisible = ref(false)
const comments = ref('')
const form = reactive({
    comment: '',
    commentId: '',
})
const subComments = (commentId)=>{
    dialogFormVisible.value = true
    form.commentId = commentId
}
const postComments = (type)=>{
    if (type==='father'){
        commentLoading.value = true
        postComment(oid,comments.value,'').then(res=>{
            commentLoading.value = false
            comments.value = ''
            state.comment.unshift(res)
        })
    } else if (type==='son'){
        postComment(oid,form.comment,form.commentId).then(res=>{
            dialogFormVisible.value = false
            commentLoading.value = false
            form.comment = ''
            state.comment.forEach(commentsArray=>{
                if (commentsArray.comment_id===res.comment_id){
                    commentsArray.subcomment.unshift(res)
                }
            })
        })
    }

}
const cancel= () =>{
    form.comment = ''
    dialogFormVisible.value = false
}
const commit = ()=>{
    commentLoading.value = true
    postComments('son')
}
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
    :deep(figure){
        margin: 0;
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
    display: flex;
    flex-direction: column;
    .comment-title{
        font-size: 20px;
        font-weight: 700;
        display: flex;
    }
    .comment-text{
        margin: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        .comment-image{

        }
        .comment-textarea{
            margin: 0 20px;
            padding: 16px 16px 23px;
            width: 90%;
            resize: none;
            background: #f5f5f6;
            border-radius: 12px;
            border: none;
            color: #1f1f1f;
            outline: none;
            height: 100px;
        }
    }
    .comment-button{
        display: flex;
        margin-left: auto;
        margin-right: 35px;
    }
    .comment-detail{
        padding: 15px 20px 0 20px;
    }
}
.comment-detail-list{
    margin: 20px 0;
    display: flex;
    .list-left{

    }
    .list-right{
        padding: 0 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        .list-title{
            font-size: 17px;
            font-weight: 700;
        }
        .list-text{
            font-size: 14px;
        }
        .interact-bar{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .interact-time{
                font-size: 11px;
                color: #666;
            }
            .reply{
                align-items: flex-start;
                display: flex;
                cursor: pointer;
            }
        }
    }
}
.comment-text{
    margin: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    .comment-image{

    }
    .comment-textarea{
        margin: 0 20px;
        padding: 16px 16px 23px;
        width: 90%;
        resize: none;
        background: #f5f5f6;
        border-radius: 12px;
        border: none;
        color: #1f1f1f;
        outline: none;
        height: 100px;
    }
}
</style>
