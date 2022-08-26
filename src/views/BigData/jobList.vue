<template>
    <ul class="job-list-box">
        <li v-for="(item,index) in props.data" :key="item.number" class="job-list-item">
            <el-card shadow="hover" :body-style="{ background:'#fbfbfb' }">
                <div class="card-main">
                    <div class="main-left">
                        <div class="job-name">
                            {{ item.job }}
                        </div>
                        <div class="job-education-experience">
                            <div class="job-education">
                                {{ item.education }}
                            </div>
                            <div class="job-experience">
                                {{ item.experience }}
                            </div>
                        </div>
                    </div>
                    <div class="main-right">
                        <div class="job-salary">
                            {{ item.salary }}
                        </div>
                        <div class="job-city">
                            {{ item.city }}
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div>
                        <span class="footer-title">公司福利</span>
                        <el-tag round size="small" v-for="j in item.goodList" class="footer-tags">{{ j }}</el-tag>
                    </div>
                    <div>
                        <span class="footer-title">技能要求</span>
                        <el-tag round size="small" v-for="j in item.needList" class="footer-tags">{{ j }}</el-tag>
                    </div>
                    <div class="job-info">
                        <span class="footer-title">具体要求</span>
                        <el-popover
                            placement="top-start"
                            title="具体要求"
                            :width="400"
                            trigger="click"
                            :content="item.jobInfo"
                        >
                            <template #reference>
                                <span>{{ " "+item.jobInfo }}</span>
                            </template>
                        </el-popover>
                    </div>
                    <div v-if="item.company">
                        <div class="company-box">
                            <span class="footer-title">公司名称</span>
                            <span>{{ " "+item.company }}</span>
                        </div>
                        <div v-if="item.companyPeople">
                            <span class="footer-title">公司规模</span>
                            <span>{{ " "+item.companyPeople }}</span>
                        </div>
                        <div v-if="item.companyPosition">
                            <span class="footer-title">公司地址</span>
                            <span>{{ " "+item.companyPosition }}</span>
                        </div>
                        <div v-if="item.companyType">
                            <span class="footer-title">公司类型</span>
                            <span>{{ " "+item.companyType }}</span>
                        </div>
                    </div>
                </div>
            </el-card>
        </li>
    </ul>
</template>

<script setup>
import { ref,onMounted,watch } from "vue";
const props = defineProps({
    data:{
        type:Array,//数组类型
        default: ()=>[]//如果没有传递msg参数,默认值是这个
    }
})
// watch(() => props.data, newValue => {
//
// },{deep: true})
onMounted(()=>{
    // for (let i = 0; i <10; i++) {
    //     ans.value.push(data)
    // }
})
</script>

<style lang="scss" scoped>
.card-main{
    display: flex;
    justify-content: space-between;
    .main-left{
        .job-name{
            font-size: 20px;
            font-weight: 600;
        }
        .job-education-experience{
            display: flex;
            .job-experience{
                padding: 0 0 0 10px;
            }
        }
    }
    .main-right{
        flex-shrink: 0;
        .job-salary{
            font-size: 16px;
            font-weight: 500;
            color: #fe574a;
            line-height: 22px;
        }
        .job-city{
            font-size: 14px;
            color: #666666;
        }
    }
}
.job-list-box{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 20px;
    .job-list-item{
        list-style: none;
        padding: 0 10px 10px 10px;
        width: 33%;
        align-items: stretch;
    }
}
.card-footer{
    margin: 10px 0 0 0;
    overflow: hidden;
}
.footer-title{
    color: #666666;
    font-size: 15px;
}
.footer-tags{
    margin: 0 0 0 5px;
}
.job-info{
    margin-top: 10px;
    overflow: hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical
}
.company-box{
    margin-top: 5px;
}
.title{
    font-size: 20px;
}
</style>
