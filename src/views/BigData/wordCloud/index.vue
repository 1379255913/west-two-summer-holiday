<template>
    <div>
        <jobHeader></jobHeader>
        <div style="padding: 10px 20px">
            <el-row>
                <el-col :span="12">
                    <el-card shadow="hover" style="margin: 10px 20px;">
                        <div class="main-box">
                            <div class="box-title">福利词云</div>
                            <el-image style="width: 80%" src="https://s1.328888.xyz/2022/08/06/ucaUJ.png" :preview-src-list="['https://s1.328888.xyz/2022/08/06/ucaUJ.png']"></el-image>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover" style="margin: 10px 20px;">
                        <div class="main-box">
                            <div class="box-title">需求词云</div>
                            <el-image style="width: 80%" src="https://s1.328888.xyz/2022/08/06/ucxqy.png" :preview-src-list="['https://s1.328888.xyz/2022/08/06/ucxqy.png']"></el-image>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { reactive,toRefs,onMounted } from "vue"
import { getWordCloudGoodThing } from '@/apiArray/ai'
import jobHeader from '../header.vue'
const state = reactive({
    wordCloudImg: ''
})
onMounted(()=>{
})
</script>

<style lang="scss" scoped>
.main-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    .box-title{
        font-size: 30px;
        font-weight: 700;
    }
}
</style>
