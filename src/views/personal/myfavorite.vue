<template>
    <div>
        <page-main style="height: 100%">
            <ul>
                <el-skeleton style="width: 100%;" animated v-for="t in 5" :loading="loading">
                    <template #template>
                        <li class="item-box">
                            <div class="inside-box">
                                <el-skeleton-item variant="image" class="image" />
                                <div class="text">
                                    <el-skeleton-item variant="p" style="width: 500px" class="title"/>
                                    <div style="padding: 20px 0 0 0"></div>
                                    <el-skeleton-item variant="p" style="width: 800px;"/>
                                    <div style="padding: 20px 0 0 0"></div>
                                    <el-skeleton-item variant="p" style="width: 800px;"/>
                                </div>
                            </div>
                        </li>
                    </template>
                </el-skeleton>
                <el-empty v-show="articleArray.length===0&&loading===false" description="你还没有收藏哦" />
                <li class="item-box" v-for="(item,index) in articleArray" :key="item._id">
                    <div class="inside-box">
                        <div class="image" @click="pushRouter(item._id,item.type)">
                            <img :src="item.title_img||fakeImg()" alt="图片" style="width: 100%">
                        </div>
                        <div class="text">
                            <p class="title" @click="pushRouter(item._id,item.type)">{{ item.title }}</p>
                            <p class="summary">{{ item.content }}</p>
                        </div>
                    </div>
                </li>
                <li class="page" v-show="!loading">
                    <el-pagination background layout="prev, pager, next" :page-count="total_page" v-model:current-page="current_page"  :total="null" :hide-on-single-page="true"/>
                </li>
            </ul>

        </page-main>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted,reactive,toRefs,ref,watch } from 'vue'
import { getFavoriteArticle } from "@/apiArray/article";
import fakeImg from "@/util/fake.img";
import getRouter from '@/util/router'

//获取当前路由名称
// const RouterName = useRoute().meta.title
// const DetailName = useRoute().meta.detail

// 路由跳转
const router = useRouter()
const pushRouter = (id,type)=>{
    router.push({ name: getRouter(type), params: { id: id,type:type }})
}

//文章变量
const state = reactive({
    articleArray: [],
    current_page: 1,
    total_article: 0,
    total_page: 0
})

//获取文章列表
onMounted(()=>{
    getFavoriteArticle(1).then(res=>{
        state.articleArray = res.collect
        state.total_article = res.total_article
        state.total_page = res.total_page
        loading.value = false
    })
    watch(()=>state.current_page,(newValue,oldValue)=>{
        if (newValue!==oldValue){
            reloadArticle(newValue)
        }

    })
})

let { articleArray,current_page,total_article,total_page } = toRefs(state)

//骨架屏
const loading = ref(true)


//重新获取文章
const reloadArticle = (page)=>{
    backTop()
    loading.value=true
    getFavoriteArticle(page).then(res=>{
        state.articleArray = res.collect
        state.current_page = parseInt(res.current_page)
        state.total_article = res.total_article
        state.total_page = res.total_page
        loading.value = false

    })

}

//回到顶部
const backTop = () => {
    let top = document.documentElement.scrollTop//获取点击时页面的滚动条纵坐标位置
    const timeTop = setInterval(() => {
        document.documentElement.scrollTop = top -= 50//一次减50往上滑动
        if (top <= 0) {
            clearInterval(timeTop)
        }
    }, 5)//定时调用函数使其更顺滑
}
</script>

<style lang="scss" scoped>
li, ul{
    list-style: none;
    width: 100%;
}
p{
    display: flex;
    padding: 0;
    margin: 0;
}
.item-box{
    padding: 35px 50px;
    border-bottom: 1px #ededed solid;
    display: flex;
    div{
        display: flex;
    }
    .inside-box{
        flex-direction: row;
        .image{
            cursor:pointer;
            flex-shrink: 0;
            height: 156px;
            width: 284px;
        }
        .text{
            flex-direction: column;
            padding: 0 0 0 100px;
            .title{
                cursor:pointer;
                font-size: 20px;
                font-weight: 400;
            }
            .summary {
                line-height: 25px;
                color: #666;
                padding: 20px 0 0;
                overflow: hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-line-clamp:3;
                -webkit-box-orient:vertical
            }
        }
    }
}
.page{
    padding: 35px 50px;
}
</style>
