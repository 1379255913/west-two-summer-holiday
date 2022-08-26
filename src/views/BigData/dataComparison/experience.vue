<template>
    <div class="canvars" ref="myRef"></div>
</template>

<script setup>
import { ref,onMounted,watch } from "vue"
import * as echarts from "echarts";
const props = defineProps({
    data:{
        type:Array,//数组类型
        default: ()=>[]//如果没有传递msg参数,默认值是这个
    }
})
const myRef = ref(null)
let myChart;
const freshData = ()=>{
    let legendData = []
    let seriesData = []
    props.data.forEach(each=>{
        legendData.push(each.title)
        seriesData.push({
            label: {
                show: true,
                position: 'top'
            },
            name: each.title,
            type: 'bar',
            data: each.number
        })
    })
    return {
        title: {
            text: '经验要求'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legendData
        },
        grid: {
            left: '3%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            name: '经验',
            type: 'category',
            data: [
                "经验不限",
                "1年以下",
                "1-3年",
                "3-5年",
                "5-10年",
                "10年以上"
            ]
        },
        yAxis: {
            name: '岗位数',
            type: 'value'
        },
        series: seriesData
    }
}
onMounted(()=>{
    myChart = echarts.init(myRef.value)
    myChart.setOption(freshData())
})
watch(() => props.data, newValue => {
    myChart.setOption(freshData())
},{deep: true})
</script>

<style scoped>
.canvars{
    margin: 20px;
    width: 800px;
    height: 600px;
}
</style>
