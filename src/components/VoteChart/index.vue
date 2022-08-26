<template>
    <div class="canvars" ref="myRef"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted,computed,watch } from 'vue'
const props = defineProps({
    title:{
        type:String,//类型字符串
        default:''//如果没有传递msg参数,默认值是这个
    },
    data:{
        type:Array,//数组类型
        default: ()=>[]//如果没有传递msg参数,默认值是这个
    },
    hasVoted:{
        type:String,//类型字符串
        default: ''//如果没有投票传空，投票了传已经投票的名字
    }
})
const myRef = ref(null)
let myChart;
const freshData = (name,count)=>{
    return  {
        xAxis: {
            type: 'category',
            data: name
        },
        yAxis: {
            type: 'value',
            minInterval:1
        },
        tooltip : {
            trigger: props.hasVoted?'axis':'none',
            axisPointer: {
                type: props.hasVoted?'cross':'none',//指示类型
                label: {
                    // 横纵坐标指示区块颜色
                    backgroundColor: '#6a7985'
                }
            }
        },
        series: [
            {
                label: {
                    show: !!props.hasVoted,
                    position: 'inside'
                },
                data: count,
                type: 'bar'
            }
        ]
    }

}
onMounted(()=>{
    myChart = echarts.init(myRef.value)
    myChart.setOption(freshData(myOptionName.value,myOptionCount.value))
})
const myValue = ref(props.data)
const myOptionName = computed(()=>{
    let ans =[]
    myValue.value.forEach(each=>{
        ans.push(each.name)
    })
    return ans
})
const myOptionCount = computed(()=>{
    let ans =[]
    if (props.hasVoted===''){
        for (let i = 0; i < myValue.value.length; i++) {
            ans.push(0)
        }
        return ans
    } else {
        myValue.value.forEach(each=>{
            let t = {}
            t.value = each.count
            if (props.hasVoted===each.name){
                t.itemStyle = {
                    color: '#a90000'
                }
            }
            ans.push(t)
        })
        return ans
    }
})
watch(() => props.hasVoted, newValue => {
    myChart.setOption(freshData(myOptionName.value,myOptionCount.value))
})
</script>

<style scoped>
.canvars{
    width: 300px;
    height: 250px;
}
</style>
