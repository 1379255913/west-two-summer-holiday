<template>
    <div class="slider">
        <div class="hot-news">
            <span class="title-left"></span>
            <span class="slider-title">
                        热门新闻
                    </span>
            <ul style="padding: 0">
                <li class="slider-text" v-for="(item,index) in hotRecommend" :key="item._id">
                    <div class="route-push" @click="pushRouter(item._id)">{{ item.title.replace('\n','') }}</div>
                </li>
            </ul>
            <span class="title-left"></span>
            <span class="slider-title">
                        为你推荐
                    </span>
            <ul style="padding: 0">
                <li class="slider-text" v-for="(item,index) in aiRecommend" :key="item._id">
                    <div class="route-push" @click="pushRouter(item._id)">{{ item.title.replace('\n','') }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import {getRecommendArticle} from "@/apiArray/article"
import { useRoute,useRouter } from 'vue-router'
//获取文章推荐
const articleType = useRoute().params.type
const oid = useRoute().params.id
const hotRecommend = ref([])
const aiRecommend = ref([])
onMounted(()=>{
    getRecommendArticle('lc',articleType).then(res=>{
        hotRecommend.value = res
    })
    getRecommendArticle('ai',oid).then(res=>{
        aiRecommend.value = res
    })
})
//文章跳转
const router = useRouter()
const routerName = useRoute().name
const pushRouter = (id)=>{
    router.push({ name: routerName, params: { id: id, type: articleType }})
}
</script>

<style lang="scss" scoped>
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
.route-push{
    cursor: pointer;
}
.route-push:hover{
    color: #53cac3;
}
</style>
