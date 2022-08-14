<template>
    <div class="container">
        <page-main style="width: 1050px;">
            <div class="submit-title">发起投票</div>
            <el-divider />
            <el-form ref="ruleFormRef">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="voteState.title" placeholder="请输入标题"/>
                </el-form-item>
                <el-form-item v-for="(item,index) in voteState.opinion" :key="index" :label="`选项${index+1}`">
                    <el-input v-model="voteState.opinion[index]" placeholder="请输入选项">
                        <template #append>
                            <el-button @click="deleteOpinion(index)">
                                <el-icon>
                                    <svg-icon name="ep:close" />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button text type="primary" @click="addOpinion" v-show="voteState.opinion.length<4">点击添加更多选项</el-button>
            </el-form>
            <el-divider></el-divider>
            <el-button type="primary" @click="submitVote">发起投票</el-button>
        </page-main>
        <page-main style="width: 25%">
            <slider></slider>
        </page-main>
    </div>
</template>

<script setup>
import { ref,reactive } from "vue"
import { useRouter } from "vue-router";
import Slider from '../slider.vue'
import isRepeat from "@/util/isRepeat";
import { ElMessage } from 'element-plus'
import { postVote } from "@/apiArray/community";
const voteState = reactive({
    title: '',
    opinion: ['','']
})
const router = useRouter()
//添加选项
const addOpinion =()=>{
    if (voteState.opinion.length>=4){
        ElMessage.error('最多只能添加4个')
    } else {
        voteState.opinion.push('')
    }
}
//删除选项
const deleteOpinion = (index)=>{
    voteState.opinion.splice(index,1)
}
//提交投票
const submitVote = ()=>{
    if (voteState.title===''){
        ElMessage.error('标题为空')
    }
    if (voteState.opinion.length<2||voteState.opinion.length>4){
        ElMessage.error('选项个数不为2-4个')
    }
    for (let i = 0; i <voteState.opinion.length; i++) {
        if (voteState.opinion[i]===''){
            ElMessage.error('有选项为空')
            return
        }
    }
    if (isRepeat(voteState.opinion)){
        ElMessage.error('有选项重复')
        return
    }
    let data ={
        topic_content: voteState.title
    }
    voteState.opinion.forEach((res,index)=>{
        data[`op${index+1}`] = res
    })
    postVote(data).then(res=>{
        ElMessage.success('发起投票成功!')
        router.push({name: 'senior_experience_index'})
    })
}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: row;
}
.submit-title{
    font-size: 20px;
    font-weight: 700;
}
</style>
