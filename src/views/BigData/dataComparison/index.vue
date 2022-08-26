<template>
    <div>
        <page-main>
            <div class="title">
                请输入需要对比的职位
            </div>
            <div class="box">
                <el-divider/>
                <div>
                    <el-cascader v-model="selectJobs" :options="jobTagsList" :show-all-levels="false" filterable style="width: 600px;"/>
                    <el-button class="search" type="primary" @click="submitForm" :disabled="loading">查询</el-button>
                </div>
                <div v-show="salaryList.length>0">
                    <salary :data="salaryList"></salary>
                </div>
                <div v-show="expList.length>0">
                    <experience :data="expList"></experience>
                </div>
                <div v-show="eduList.length>0">
                    <education :data="eduList"></education>
                </div>
            </div>
        </page-main>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getJobAnalysis } from "@/apiArray/ai";
import jobTagsList from '@/util/jobTags'
import Salary from './salary.vue'
import Experience from './experience.vue'
import Education from './education.vue'
const selectJobs = ref([])
const loading = ref(false)
const submitForm = ()=>{
    loading.value=true
    if (selectJobs.value.length>0){
        let name = selectJobs.value[2]
        getJobAnalysis(selectJobs.value[2]).then(res=>{
            expList.value.push({
                "title": name,
                "name": res.exp.name,
                "number": res.exp.number
            })
            eduList.value.push({
                "title": name,
                "name": res.edu.name,
                "number": res.edu.number
            })
            salaryList.value.push({
                "title": name,
                "type": 'line',
                "data": res.salary.data
            })
            loading.value = false
        }).catch(res=>{
            loading.value = false
        })
    }
    console.log(selectJobs.value)
    // getJobAnalysis('Python').then(res=>{
    //     console.log(res)
    // })
}
const expList = ref([])
const eduList = ref([])
const salaryList = ref([])
</script>

<style scoped>
.title{
    font-size: 20px;
}
.search{
    margin-left: 20px;
}
.box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
