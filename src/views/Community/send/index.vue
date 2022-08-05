<template>
    <div class="container">
        <page-main style="width: 1050px;">
            <div class="submit-title">提问题</div>
            <el-divider />
            <el-form ref="ruleFormRef">
                <el-input v-model="editorState.title" placeholder="请输入问题" size="large" style="font-size: 20px"/>
                <Editor v-model="editorState.text" style="margin:20px 0 20px 0"></Editor>
                <div>
                    <el-button type="primary" @click="submitQuestion">发表</el-button>
                </div>
            </el-form>
        </page-main>
        <page-main style="width: 25%">
            <slider></slider>
        </page-main>
    </div>
</template>

<script setup>
import {reactive,toRefs,ref,watch} from 'vue'
import Slider from '../slider.vue'
import { postQuestion } from '@/apiArray/community'
import { ElMessage } from 'element-plus'
import { useRoute,useRouter } from "vue-router";
const ruleFormRef = ref(null)
const router = useRouter()
const DetailName = useRoute().meta.detail
const editorState = reactive({
    text:'',
    isEdit:false,
    title:''
})
watch(()=>editorState.text,(oldValue,newValue)=>{
    console.log(editorState.text)
})
//发布提问
const submitQuestion = () =>{
    if (editorState.title){
        let data = {
            title: editorState.title,
            content: editorState.text,
        }
        postQuestion(data).then(res=>{
            ElMessage.success('提问成功')
            router.push({ name: DetailName , params: { id: res.question_id }})
        })
    }
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
