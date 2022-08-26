<template>
    <div class="canvars" ref="myRef"></div>
</template>

<script setup>
import {ref,onMounted, watch} from "vue"
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
            name: each.title,
            type: 'line',
            data: each.data,
        })
    })
    return {
        title: {
            text: '薪水分布'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legendData
        },
        grid: {
            left: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        dataZoom:[
            {
                type: 'inside',
                start: 0,
                end: 50
            },
            {
                start: 0,
                end: 10
            }
        ],
        xAxis: {
            name: '月薪',
            type: 'value'
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
