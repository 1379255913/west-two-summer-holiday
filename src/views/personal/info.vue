<template>
    <div>
        <page-main style="height: 100%;">
            <div class="info-avatar">
                <el-avatar :size="200" :src="info.avatar"></el-avatar>
            </div>
            <div class="personal-info">
                <div class="info-button">
                    <el-button>私聊</el-button>
                    <el-button type="danger" v-auth="'permission.remove'" style="margin-right: 10px" @click="forbidForm.dialogFormVisible=true">禁言</el-button>
                </div>
                <div class="personal-title">
                    个人信息
                </div>
                <div class="personal-detail">
                    <el-row>
                        <el-col :span="8" >
                            用户名
                        </el-col>
                        <el-col :span="16" >
                            {{ info.username }}
                        </el-col>
                    </el-row>
                </div>
                <div class="personal-detail">
                    <el-row>
                        <el-col :span="8" >
                            标签
                        </el-col>
                        <el-col :span="16" >
                            <el-tag v-for="(item,index) in info.tags" :key="index" style="margin-right: 8px">{{ item }}</el-tag>
                        </el-col>
                    </el-row>
                </div>
                <div class="personal-detail">
                    <el-row>
                        <el-col :span="8" >
                            电子邮件
                        </el-col>
                        <el-col :span="16" >
                            {{ info.email }}
                        </el-col>
                    </el-row>
                </div>
                <div class="personal-detail">
                    <el-row>
                        <el-col :span="8" >
                            用户类型
                        </el-col>
                        <el-col :span="16" >
                            {{ info.role }}
                        </el-col>
                    </el-row>
                </div>
                <div class="personal-detail">
                    <el-row>
                        <el-col :span="8" >
                            用户状态
                        </el-col>
                        <el-col :span="16" >
                            {{ info.state }}
                        </el-col>
                    </el-row>
                </div>
            </div>
        </page-main>
        <el-dialog v-model="forbidForm.dialogFormVisible" title="禁言">
            <el-form :model="forbidForm">
                <el-form-item label="用户">
                    <el-input v-model="forbidForm.username" disabled />
                </el-form-item>
                <el-form-item label="禁言时间">
                    <el-date-picker
                        v-model="forbidForm.forbidTime"
                        type="datetime"
                        placeholder="请选择禁言时间"
                        :shortcuts="list"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="forbidForm.dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" style="width: 64px;" @click="putForbid" :disabled="!forbidForm.forbidTime||forbidForm.loading">
                        <span v-show="!forbidForm.loading">禁言</span>
                        <span v-show="forbidForm.loading">
                            <el-icon class="is-loading">
                                <svg-icon name="loading" />
                            </el-icon>
                        </span>
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive,onMounted } from 'vue'
import { getUserInfo } from "@/apiArray/user";
import { useRoute } from 'vue-router'
import { roleJudge,forbidJudge } from "@/util/role";
import { forbidUser } from "@/apiArray/admin";
import list from "@/util/shortcuts";
import { ElMessage } from 'element-plus'
const oid = useRoute().params.id
const info = reactive({
    avatar: '',
    username : '',
    tags: [],
    email: '',
    role: '',
    state: '',
    user_id: '',
})
const freshInfo = ()=>{
    getUserInfo(oid).then(res=>{
        info.username = res.username
        info.tags = res.tags || []
        info.email = res.email
        info.avatar = res.avatar
        info.role = roleJudge(res.role)
        info.state = forbidJudge(res.forbid)
        info.user_id = res.user_id
        forbidForm.username = res.username
    })
}
onMounted(()=>{
    freshInfo()
})
//禁言
const forbidForm = reactive({
    dialogFormVisible: false,
    username: '',
    forbidTime: '',
    loading: false
})
const putForbid = () =>{
    forbidForm.loading =true
    let data = {
        user_id: info.user_id,
        forbid: forbidForm.forbidTime.getTime()/1000
    }
    forbidUser(data).then(res=>{
        forbidForm.loading = false
        ElMessage.success('禁言成功')
        forbidForm.dialogFormVisible = false
        freshInfo()
    })
}
</script>

<style lang="scss" scoped>
.info-avatar{
    display: flex;
    justify-content: center;
    align-items: center;
}
.info-button{
    display: flex;
    flex-direction: row-reverse;
}
.personal-info{
    padding: 20px 200px;
    .personal-title{
        font-size: 24px;
        font-weight: 600;
        border-bottom: #666666 1px solid;
        padding-bottom: 5px;
        margin-bottom: 10px;
    }
    .personal-detail{
        font-size: 20px;
        border-bottom: #a2a2a2 1px solid;
        padding: 10px 0;
    }
}
</style>
