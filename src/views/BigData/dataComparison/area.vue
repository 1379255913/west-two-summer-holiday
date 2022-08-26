<template>
    <div class="canvars" ref="myRef"></div>
</template>

<script>
import {ref,onMounted} from "vue"
import * as echarts from "echarts";
const myRef = ref(null)
let myChart;
const option = {
    title: {
        text: '薪水分布'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Email',
            type: 'line',
            data: [
                [1,50],
                [2,60],
                [3,70],
                [4,80],
                [5,90],
                [6,100],
                [7,120]
            ],
        },
        {
            name: 'Union Ads',
            type: 'line',
            data: [
                [1,120],
                [2,200],
                [3,150],
                [4,80],
                [5,70],
                [6,110],
                [7,130]
            ],
        },
        {
            name: 'Video Ads',
            type: 'line',
            data: [
                [1,52],
                [2,20],
                [3,75],
                [4,90],
                [5,72],
                [6,15],
                [7,67]
            ],
        },
    ]
}
onMounted(()=>{
    myChart = echarts.init(myRef.value)
    myChart.setOption(option)
})
</script>

<style scoped>
.canvars{
    margin: 20px;
    width: 800px;
    height: 600px;
}
</style>
