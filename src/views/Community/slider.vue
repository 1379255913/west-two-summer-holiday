<template>
    <div class="headlines">
        <img width="80" height="16" src="//static.nowcoder.com/images-nk/oss/discuss/post/hot/hot-post-rank-title.png">
    </div>
    <div class="slider">
        <div class="hot-news">
            <ul style="padding: 0">
                <li class="slider-text" v-for="(item,index) in hotDiscussUrl">
                    <img width="16" height="16" :src="hotDiscussImg[index]">
                    <router-link :to="{ name: 'senior_experience_detail', params: { id: item.oid }}" style="color: #666666">
                            {{ item.text }}
                    </router-link>
                </li>
            </ul>
            <span class="title-left"></span>
            <span class="slider-title">
                        近期精华贴
                    </span>
            <ul style="padding: 0">
                <li class="slider-text" v-for="item in newDiscuss">
                    <router-link :to="{ name: 'senior_experience_detail', params: { id: item.oid }}">
                        {{ item.text }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

import { ref,reactive,toRefs } from 'vue'
//热议
const hotDiscussImg = ref([
    'https://static.nowcoder.com/images-nk/oss/discuss/post/hot/hot-first.png',
    'https://static.nowcoder.com/images-nk/oss/discuss/post/hot/hot-two.png',
    'https://static.nowcoder.com/images-nk/oss/discuss/post/hot/hot-three.png',
    'https://static.nowcoder.com/images-nk/oss/discuss/post/hot/hot-four.png',
    'https://static.nowcoder.com/images-nk/oss/discuss/post/hot/hot-five.png'
])
const hotDiscussUrl = ref([
    {
        oid: 'question-cb70c3c8-1307-11ed-82f0-c56c2bc91b77',
        text: '项目中深拷贝、和浅拷贝体现在哪？'
    },
    {
        oid: 'question-0660b0c8-1308-11ed-9cdc-c56c2bc91b77',
        text: '大厂工资高还是小厂工资高？'
    },
    {
        oid: 'question-5deeb988-1343-11ed-b7ce-c56c2bc91b77',
        text: '面试过不了，一般是什么原因？'
    },
    {
        oid: 'question-26475578-1344-11ed-bb15-c56c2bc91b77',
        text: '兄弟们 像这种招打字客服的公司靠不靠谱'
    },
    {
        oid: 'question-3d5efb54-1344-11ed-b52c-c56c2bc91b77',
        text: '准时下班、无欲无求的人，真是难管理吗？'
    },
])
const newDiscuss = ref([
    {
        oid: 'question-a78d4236-2512-11ed-b7c0-eb9e628bf34d',
        text: '为什么每次面试喜欢的公司，谈得也挺好，最后却都没通知?'
    },
    {
        oid: 'question-e33b6e71-2513-11ed-a052-eb9e628bf34d',
        text: '我上份工作离职后有半年没工作，面试的时候应该如实说吗？'
    },
    {
        oid: 'question-a78d4236-2512-11ed-b7c0-eb9e628bf34d',
        text: '为什么每次面试喜欢的公司，谈得也挺好，最后却都没通知?'
    },
])
</script>

<style lang="scss" scoped>
a{
    border-bottom: 1px #ededed solid;
    font-size: 16px;
    text-decoration: none;
    color: black;
}
.headlines{
    display: flex;
    align-items: center;
    padding: 0 0 0 20px;
    background-image: url(//static.nowcoder.com/images-nk/oss/discuss/post/hot/hot-post-rabk-bg.png);
    background-size: 100% 100%;
    height: 60px;
}
.slider{
    padding: 0 12px 15px;
.hot-news{

.slider-title{
    font-size: 16px;
}
.title-left{
    width: 5px;
    height: 20px;
    background: #e71616;
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
}
ul li {
    list-style: none;
}
.slider-text{
    padding: 15px 0 15px 0;
}
}
}
</style>
