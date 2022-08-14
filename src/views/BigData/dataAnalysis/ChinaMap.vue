<template>
    <div class="canvars" ref="myRef">222</div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import chinaJson from '@/util/china.json'
import {getJobArea} from '@/apiArray/ai'
echarts.registerMap('china', chinaJson)
const myRef = ref(null)
onMounted(() => {
    getJobArea().then(res=>{
        let data = []
        let ans =0
        res.forEach(res2=>{
            ans+=res2[1]
            data.push({
                name: res2[0],
                selected: false,
                value: res2[1]
            })
        })
        console.log(ans)
        renderChart(data) // 生命周期挂载函数渲染图表
    })

})
const renderChart = (data) => {
    const myChart = echarts.init(myRef.value)
    myChart.setOption({
        backgroundColor: '#142452',
        tooltip: {
            trigger: 'item',
        },
        // 游标
        visualMap: {
            // orient: 'horizontal', //横置
            type: 'continuous',
            itemWidth: 16,
            itemHeight: 120,
            text: ['高', '低'],
            showLabel: true,
            seriesIndex: [0],
            min: 0,
            max: 2000,
            calculable: true, //开启游标
            left: 50,
            bottom: 30,
            inRange: {
                color: ['#8ED861', '#85CE4E', '#EED000', '#EEAE00', '#209FA9', '#F5903D', '#EE8C00', '#EE3B3B'],
            },
            textStyle: {
                color: '#ffffff',
                fontSize: 12,
            },
        },

        legend: {
            orient: 'vertical',
            top: 'right',
            left: 'bottom',
            textStyle: {
                //图例文字的样式
                color: '#00FFFF',
                fontSize: 12,
            },
        },

        geo: {
            map: 'china',
            roam: false, //开关可移动可放大
        },

        series: [
            {
                name: '各省招聘数量对比',
                type: 'map',
                map: 'china',
                showLegendSymbol: false, //去掉指示点
                label: {
                    show: false, //是否显示各省名称
                    color: '#ff5500', //显示各省名称颜色
                },
                itemStyle: {
                    borderWidth: 1, //区域边框宽度
                    borderColor: '#00a6dc', //区域边框颜色
                    areaColor: '#224E7F', //区域颜色

                },
                emphasis: {
                    areaColor: '#f0690f', //区域颜色，鼠标悬停颜色
                    label: {
                        show: true, //鼠标悬浮时是否显示各省名称
                        color: '#fdf1f6', //鼠标悬浮时显示各省名称的颜色
                    },
                },
                data: data,
            },
        ],
    })
}
</script>

<style scoped>
.canvars{
    width: 400px;
    height: 400px;
}
</style>
