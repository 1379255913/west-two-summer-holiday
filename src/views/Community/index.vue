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
                >
                    <template #prepend>
                        <el-button>
                            <template #icon>
                                <el-icon>
                                    <svg-icon name="search-com" />
                                </el-icon>
                            </template>
                        </el-button>
                    </template>
                    <template #append>
                        <el-select v-model="searchSelect" placeholder="Select" style="width: 80px">
                            <el-option label="文章" value="1" />
                            <el-option label="用户" value="2" />
                        </el-select>
                    </template>
                </el-input>
            </el-menu>
            <ul class="main">
                <li class="main-item" v-for="i in 7">
                    <div class="item-main">
                        <div class="item-header">
                            <div class="item-header-left">
                                <el-avatar :size="20" class="comment-image" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                                <span>123456</span>
                            </div>
                            <div class="item-header-right">
                                2022-07-26 9:22
                            </div>
                        </div>
                        <div class="item-title">
                            这是一个标题
                        </div>
                        <div class="item-content">
                            本人目前在做一款校园就业相关产品的运营。老板要求策划一次学生促活活动，但由于本人已脱离校园环境一整年，不太清楚现在的应届生在求职前或者求职中都关注什么、面对怎样的困境、需要怎样的帮助。希
                            本人目前在做一款校园就业相关产品的运营。老板要求策划一次学生促活活动，但由于本人已脱离校园环境一整年，不太清楚现在的应届生在求职前或者求职中都关注什么、面对怎样的困境、需要怎样的帮助。希
                            本人目前在做一款校园就业相关产品的运营。老板要求策划一次学生促活活动，但由于本人已脱离校园环境一整年，不太清楚现在的应届生在求职前或者求职中都关注什么、面对怎样的困境、需要怎样的帮助。希
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
import { ref,reactive,toRefs } from 'vue'
import Slider from './slider.vue'
//菜单
const activeIndex = ref('1')
//搜索
const searchSelect = ref('1')
const searchInput = ref('')

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
