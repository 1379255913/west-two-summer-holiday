<template>
    <div class="headlines">
        <img width="80" height="16" src="//static.nowcoder.com/images-nk/oss/discuss/post/hot/hot-post-rank-title.png">
    </div>
    <div class="slider">
        <div class="hot-news">
            <ul style="padding: 0">
                <li class="slider-text" v-for="(item,index) in 5">
                    <img width="16" height="16" :src="hotDiscussImg[index]">
                    【海归必读】远程面试如何准备？
                </li>
            </ul>
            <span class="title-left"></span>
            <span class="slider-title">
                        近期精华贴
                    </span>
            <ul style="padding: 0">

                <li class="slider-text" v-for="item in 3">
                    【海归必读】远程面试如何准备？
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
</script>

<style lang="scss" scoped>
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
    border-bottom: 1px #ededed solid;
    font-size: 16px;
    color: #666666;
}
}
}
</style>
