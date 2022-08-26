<template>
    <el-form :model="formData" ref="vForm" :rules="rules" label-position="left" label-width="80px"
             size="default" @submit.prevent>
        <el-row>
            <el-col :span="6">
                <el-form-item label="学历" prop="education" class="required">
                    <el-select v-model="formData.education" class="full-width-input" clearable>
                        <el-option v-for="(item, index) in educationOptions" :key="index" :label="item.label"
                                   :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="工作经验" prop="experience" class="required">
                    <el-input v-model="formData.experience" type="text" placeholder="请输入已经工作的时间（年）" clearable style="width: 200px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="期望薪资" prop="money" class="required">
                    <el-input v-model="formData.money" type="text" placeholder="请输入期望月薪（千）" clearable style="width: 200px"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="期望职位" prop="jobTagsList" class="required">
                    <el-cascader v-model="selectTags1" :options="jobTagsList" :props="prop" :show-all-levels="false" filterable/>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="期望城市" prop="cityList" class="required">
                    <el-cascader v-model="selectTags2" :options="areaTags" :props="prop" :show-all-levels="false" filterable/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-button type="danger" @click="resetForm">复原</el-button>
    </el-form>
    <el-divider/>
    <job-list :data="jobLists"></job-list>
</template>

<script>
import {
    defineComponent,
    toRefs,
    reactive,
    getCurrentInstance
}
    from 'vue'
import jobTagsList from '@/util/jobTags'
import areaTags from '@/util/area2'
import jobList from '../jobList.vue'
import { jobRecommend2 } from '@/apiArray/ai'
export default defineComponent({
    components: {jobList},
    props: {},
    setup() {
        const state = reactive({
            formData: {
                education: "",
                experience: "",
                money: "",
            },
            rules: {
                education: [{
                    required: true,
                    message: '字段值不可为空',
                }],
                experience: [{
                    required: true,
                    message: '字段值不可为空',
                }, {
                    pattern: /^[+]{0,1}(\d+)$/,
                    trigger: ['blur', 'change'],
                    message: '请输入数字'
                }],
                money: [{
                    required: true,
                    message: '字段值不可为空',
                }, {
                    pattern: /^[+]{0,1}(\d+)$/,
                    trigger: ['blur', 'change'],
                    message: '请输入数字'
                }],
                // jobTagsList: [{
                //     required: true,
                //     message: '字段值不可为空',
                // }],
            },
            educationOptions: [{
                "label": "中专",
                "value": "中专"
            }, {
                "label": "大专",
                "value": "大专"
            }, {
                "label": "本科",
                "value": "本科"
            }, {
                "value": "硕士",
                "label": "硕士"
            }, {
                "value": "博士",
                "label": "博士"
            }],
            selectTags1 : [],
            selectTags2 : [],
            jobLists: []
        })
        const { proxy } = getCurrentInstance()
        const fixJobs = ()=>{
            let ans = []
            state.selectTags1.forEach(res=>{
                ans.push(res[2])
            })
            return ans[0]
        }
        const fixCity = ()=>{
            let ans =[]
            state.selectTags2.forEach(res=>{
                if (res[res.length-1]==='市辖区'){
                    ans.push(res[0])
                } else {
                    ans.push(res[res.length-1])
                }
            })
            return ans[0]
        }
        const submitForm = () => {
            console.log(state.selectTags1[0].join(''),state.selectTags2)
            proxy.$refs.vForm.validate(valid => {
                if (!valid) return
                let data = {
                    education: state.formData.education,
                    experience: state.formData.experience,
                    salary: state.formData.money,
                    jobs: fixJobs(),
                    city: fixCity()
                }
                console.log(data)
                jobRecommend2(data).then(res=>{
                    console.log(res)
                    res.forEach(each=>{
                        if (each.goodList){
                            each.goodList = eval(each.goodList)
                        }
                        if (each.needList){
                            each.needList = eval(each.needList)
                        }
                    })
                    state.jobLists = res
                })
            })
        }
        const resetForm = () => {
            proxy.$refs.vForm.resetFields()
        }
        const prop = { multiple: true }
        const formatDatas = (data) =>{
            if (!data) return []
            if (data.length>5){
                return data.slice(0,5)
            }
            return data
        }
        return {
            ...toRefs(state),
            submitForm,
            resetForm,
            formatDatas,
            jobTagsList,
            areaTags,
            prop
        }
    }
})

</script>

<style lang="scss">
.el-input-number.full-width-input,
.el-cascader.full-width-input {
    width: 100% !important;
}

.el-form-item--medium {
    .el-radio {
        line-height: 36px !important;
    }

    .el-rate {
        margin-top: 8px;
    }
}

.el-form-item--small {
    .el-radio {
        line-height: 32px !important;
    }

    .el-rate {
        margin-top: 6px;
    }
}

.el-form-item--mini {
    .el-radio {
        line-height: 28px !important;
    }

    .el-rate {
        margin-top: 4px;
    }
}

.clear-fix:before,
.clear-fix:after {
    display: table;
    content: "";
}

.clear-fix:after {
    clear: both;
}

.float-right {
    float: right;
}

</style>

<style lang="scss" scoped>
div.table-container {
    table.table-layout {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;

        td.table-cell {
            display: table-cell;
            height: 36px;
            border: 1px solid #e1e2e3;
        }
    }
}

div.tab-container {}

.label-left-align :deep(.el-form-item__label) {
    text-align: left;
}

.label-center-align :deep(.el-form-item__label) {
    text-align: center;
}

.label-right-align :deep(.el-form-item__label) {
    text-align: right;
}

.custom-label {}

.static-content-item {
    min-height: 20px;
    display: flex;
    align-items: center;

    :deep(.el-divider--horizontal) {
        margin: 0;
    }
}
.card-main{
    display: flex;
    justify-content: space-between;
    .main-left{
        .job-name{
            font-size: 20px;
            font-weight: 600;
        }
        .job-education-experience{
            display: flex;
            .job-experience{
                padding: 0 0 0 10px;
            }
        }
    }
    .main-right{
        flex-shrink: 0;
        .job-salary{
            font-size: 16px;
            font-weight: 500;
            color: #fe574a;
            line-height: 22px;
        }
        .job-city{
            font-size: 14px;
            color: #666666;
        }
    }
}
.job-list-box{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 20px;
    .job-list-item{
        list-style: none;
        padding: 0 10px 10px 10px;
        width: 33%;
        align-items: stretch;
    }
}
.card-footer{
    margin: 10px 0 0 0;
    overflow: hidden;
}
.footer-title{
    color: #666666;
    font-size: 15px;
}
.footer-tags{
    margin: 0 0 0 5px;
}
</style>
