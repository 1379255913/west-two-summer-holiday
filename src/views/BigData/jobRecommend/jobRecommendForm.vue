<template>
    <el-form :model="formData" ref="vForm" :rules="rules" label-position="left" label-width="80px"
             size="default" @submit.prevent>
        <el-form-item label="学历" prop="education" class="required">
            <el-select v-model="formData.education" class="full-width-input" clearable>
                <el-option v-for="(item, index) in educationOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="工作经验" prop="experience" class="required">
            <el-input v-model="formData.experience" type="text" placeholder="请输入已经工作的时间（年）" clearable style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="期望薪资" prop="money" class="required">
            <el-input v-model="formData.money" type="text" placeholder="请输入期望月薪（千）" clearable style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="期望职位" prop="jobTagsList" class="required">
            <el-cascader v-model="selectTags1" :options="jobTagsList" :props="prop" :show-all-levels="false" filterable/>
        </el-form-item>
        <el-form-item label="期望城市" prop="cityList" class="required">
            <el-cascader v-model="selectTags2" :options="areaTags" :props="prop" :show-all-levels="false" filterable/>
        </el-form-item>
    </el-form>
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
export default defineComponent({
    components: {},
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
                "label": "中专以上",
                "value": 1
            }, {
                "label": "大专以上",
                "value": 2
            }, {
                "label": "本科以上",
                "value": 3
            }, {
                "value": 4,
                "label": "硕士以上"
            }, {
                "value": 5,
                "label": "博士以上"
            }],
            selectTags1 : [],
            selectTags2 : [],
        })
        const instance = getCurrentInstance()
        const submitForm = () => {
            instance.ctx.$refs['vForm'].validate(valid => {
                if (!valid) return
                //TODO: 提交表单
            })
        }
        const resetForm = () => {
            instance.ctx.$refs['vForm'].resetFields()
        }
        const prop = { multiple: true }
        return {
            ...toRefs(state),
            submitForm,
            resetForm,
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

</style>
