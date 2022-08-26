<template>
    <div class="vote-title">{{ props.title }}</div>
    <el-button
        class="item-main"
        v-for="(item,index) in myValue"
        :key="index"
        round
        v-if="!myhasVoted"
        @click="voted(item.name)"
    >
        {{ item.name }}
    </el-button>
    <el-progress
        :text-inside="true"
        :stroke-width="32"
        :percentage="formatData(item.count)"
        v-for="(item,index) in myValue"
        :key="index"
        :status = "item.name===myhasVoted?'exception':''"
        class="item-main"
        v-if="myhasVoted"
    >
        <span class="item-name" :style="formatData(item.count)<=10?{color:'black'}:{}">{{ item.name+`(${formatData(item.count)}%)` }}</span>
    </el-progress>
</template>

<script setup>
import { ref,watch } from "vue"
const emits = defineEmits(['update:hasVoted','vote']);
const props = defineProps({
    title:{
        type:String,//类型字符串
        default:''//如果没有传递msg参数,默认值是这个
    },
    oid:{
        type:String,//类型字符串
        default:''//如果没有传递msg参数,默认值是这个
    },
    modelValue:{
        type:Array,//数组类型
        default: ()=>[]//如果没有传递msg参数,默认值是这个
    },
    hasVoted:{
        type:String,//类型字符串
        default: ''//如果没有投票传空，投票了传已经投票的名字
    }
})
const formatData = (data)=>{
    let total = 0
    myValue.value.forEach(res=>{
        total+=res.count
    })
    if (flag.value===true){
        return 0
    }
    return Math.round(data/total*100)
}
const formatType = (data)=>{

}
const myValue = ref(props.modelValue)
watch(() => props.modelValue, newValue => {
    myValue.value = newValue
})
const myhasVoted = ref(props.hasVoted)
const flag =ref(false)
watch(() => props.hasVoted, newValue => {
    myhasVoted.value = newValue
    flag.value =true
    setTimeout(()=>{
        flag.value =false
    },500)
})
const voted = (name) =>{
    let ans = 0
    myValue.value.forEach((res,index)=>{
        if (res.name===name){
            res.count+=1
            ans = index
        }
    })
    emits('update:hasVoted',name)
    emits('vote',ans,props.oid)
}
</script>

<style scoped>
.item-name{
    font-size: 15px;
}
.item-main{
    width: 100%;
    margin: 0 0 10px 0;
    font-size: 15px;
}
.vote-title{
    text-align: center;
    font-size: 20px;
    margin-bottom: 10px;
}
</style>
