<template>
    <div>
<!--        <page-header title="欢迎使用求职大数据">-->
<!--        </page-header>-->
        <page-main style="height: 100%">
            <ul>
                <li class="item-box" v-for="(item,index) in 7">
                    <div class="inside-box">
                        <div class="image" @click="pushRouter('1')">
                            <img src="https://img.bosszhipin.com/beijin/upload/admin/20220713/7a57a5a743894a0e55e3ee0e40b3a5c4c78475c35278a8d3a24837d9ceae65e3b6300d3c1a17cb94.png" style="width: 100%">
                        </div>
                        <div class="text">
                            <p class="title" @click="pushRouter('1')">【海归必读】远程面试如何准备？</p>
                            <p class="summary"> 受疫情影响，大多数企业都选择了远程面试，特别是针对部分回不了国的留学生，远程面试成为目前主流的面试形式之一。虽说对地点和时间的要求较为宽松，但另一方面，面对镜头，大多数人往往很难自如的表</p>
                        </div>
                    </div>
                </li>
            </ul>
        </page-main>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// 路由跳转
const router = useRouter()
const pushRouter = (id)=>{
    router.push({ name: 'job_hunting_skill_detail', params: { id: id }})
}

</script>

<style scoped lang="scss">
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
                height: 75px;
                line-height: 25px;
                color: #666;
                padding: 20px 0 0;
            }
        }
    }
}
</style>
