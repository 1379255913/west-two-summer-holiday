<template>
    <div>
        <jobHeader></jobHeader>
    <page-main>
        <div class="recommend-title">
            请输入你的条件
        </div>
        <el-divider/>
        <jobForm></jobForm>
    </page-main>
    </div>
</template>

<script setup>
import jobForm from "./jobRecommendForm.vue";
import jobHeader from '../header.vue'
</script>

<style lang="scss" scoped>
.recommend-title{
    font-size: 20px;
}
</style>
