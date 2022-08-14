<template>
    <page-main>
        <div style="width: 500px">
            <vote v-model="p.options" :title="'测试'" v-model:hasVoted="p.t" :oid="'2'" @vote="testlog"></vote>
        </div>
    </page-main>
</template>

<script setup>
import {reactive,ref} from "vue";
const p =ref({
    t:'',
    options:[
        {
            number:2,
            name:'测试1'
        },
        {
            number:3,
            name:'测试2'
        },
        {
            number:2,
            name:'测试3'
        },
        {
            number:2,
            name:'测试4'
        }
    ]
})
const testlog=(ans,oid)=>{
    console.log(ans,oid)
}
</script>

<style scoped>

</style>
