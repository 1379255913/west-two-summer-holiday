<route>
{
    meta: {
        title: "个人设置",
        cache: "personal-edit.password"
    }
}
</route>

<script setup name="PersonalSetting">
import useUserStore from "@/store/modules/user";
import { nextTick,ref } from 'vue'
import {uploadAvatar, uploadInform} from "@/apiArray/user";
import { ElMessage } from 'element-plus'
const router = useRouter()
const userStore = useUserStore()
const form = ref({
    headimg: userStore.avatar || '',
    username: userStore.username || '',
    tags: userStore.tags || []
})
const OldForm = {
    headimg: userStore.avatar || '',
    username: userStore.username || '',
    tags: userStore.tags?JSON.parse(JSON.stringify(userStore.tags)):[]
}

function handleSuccess(res) {
    form.value.headimg = res.avatar
    userStore.avatar = res.avatar
    localStorage.setItem('avatar',res.avatar)
}
function editPassword() {
    router.push({
        name: 'personalEditPassword'
    })
}
//修改tags
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref('')
const handleClose = (tag) => {
    form.value.tags.splice(form.value.tags.indexOf(tag), 1)
}
const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value.focus()
    })
}
const handleInputConfirm = () => {
    if (inputValue.value) {
        form.value.tags.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}
const submitInform = ()=>{
    console.log(form.value.username,JSON.stringify(form.value.tags))
    let data = {}
    data.username = form.value.username
    data.tags = JSON.stringify(form.value.tags)
    uploadInform(data).then(res=>{
        ElMessage.success('修改成功')
        userStore.username = res.username
        localStorage.setItem('username',res.username)
        userStore.tags = res.tags
        localStorage.setItem('tags',JSON.stringify(res.tags))
    }).catch(error=>{

    })
}
const rollbackInform = ()=>{
    form.value.headimg= OldForm.headimg
    form.value.username= OldForm.username
    userStore.tags= OldForm.tags?JSON.parse(JSON.stringify(OldForm.tags)):[]
    form.value.tags = userStore.tags
}
//实名认证
const dialogFormVisible = ref(false)
const isAuth = ref(false)
const authLoading = ref(false)
import { uploadIDCard } from "@/apiArray/ai"
const uploadAction = (option) => {
    console.log(option)
    authLoading.value = true
    let param = new FormData();
    param.append('file', option.file,);
    uploadIDCard(param).then((res) => {
        ElMessage.success('实名认证成功！')
        authLoading.value = false
        isAuth.value = true
        dialogFormVisible.value = false
        console.log(res)
    }).catch(res=>{
        authLoading.value = false
    })
}
const beforeClose = (done)=>{
    console.log(authLoading.value)
    if (authLoading.value===true){
        return false
    } else {
        return done()
    }
}
</script>

<template>
    <div>
        <page-main>
            <el-tabs tab-position="left" style="height: 600px;">
                <el-tab-pane label="基本设置" class="basic">
                    <h2>基本设置</h2>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-form ref="formRef" :model="form" label-width="120px" label-suffix="：">
                                <el-form-item label="用户名">
                                    <el-input v-model="form.username" placeholder="请输入你的用户名" />
                                </el-form-item>
                                <el-form-item label="标 签">
                                    <el-tag
                                        v-for="tag in form.tags"
                                        :key="tag"
                                        class="mx-1"
                                        closable
                                        :disable-transitions="false"
                                        @close="handleClose(tag)"
                                    >
                                        {{ tag }}
                                    </el-tag>
                                    <el-input
                                        v-if="inputVisible"
                                        ref="InputRef"
                                        v-model="inputValue"
                                        class="ml-1 w-20"
                                        size="small"
                                        @keyup.enter="handleInputConfirm"
                                        @blur="handleInputConfirm"
                                    />
                                    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                                        新增
                                    </el-button>
                                </el-form-item>
<!--                                <el-form-item label="QQ 号">-->
<!--                                    <el-input v-model="form.qq" placeholder="请输入你的 QQ 号" />-->
<!--                                </el-form-item>-->
<!--                                <el-form-item label="微信号">-->
<!--                                    <el-input v-model="form.wechat" placeholder="请输入你的微信号" />-->
<!--                                </el-form-item>-->
                                <el-form-item>
                                    <el-button type="danger" @click="rollbackInform">复原</el-button>
                                    <el-button type="primary" @click="submitInform">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
<!--                            <el-upload class="avatar-uploader" v-model:url="form.headimg" :action="''">-->
<!--                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
<!--                                <el-icon v-else :size="80">-->
<!--                                    <svg-icon  name="plus" />-->
<!--                                </el-icon>-->
<!--                            </el-upload>-->
                            <image-upload v-model:url="form.headimg" action="http://81.70.180.118/api/v1/user/" name="image" :autoUpload="true" notip class="headimg-upload" @on-success="handleSuccess" />
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="实名认证" class="security">
                    <h2>实名认证</h2>
                    <div class="setting-list">
                        <div class="item">
                            <div class="authentication">
                                <img class="authentication-img" src="https://p3.itc.cn/images01/20220429/a53d6bd3d7a54cfda14f2d6853fc8fa6.png">
                                <el-button type="primary" @click="dialogFormVisible=true">上传身份证</el-button>
                                <el-button type="danger">重置</el-button>
                                <el-tag type="success" size="large" class="authentication-tag" v-if="isAuth">已完成实名认证</el-tag>
                                <el-tag type="info" size="large" class="authentication-tag" v-if="!isAuth">未完成实名认证</el-tag>
                            </div>
                            <div class="judge">
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="安全设置" class="security">
                    <h2>安全设置</h2>
                    <div class="setting-list">
                        <div class="item">
                            <div class="content">
                                <div class="title">账户密码</div>
                                <div class="desc">当前密码强度：强</div>
                            </div>
                            <div class="action">
                                <el-button text @click="editPassword">修改</el-button>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <div class="title">密保手机</div>
                                <div class="desc">已绑定手机：187****3441</div>
                            </div>
                            <div class="action">
                                <el-button text>修改</el-button>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <div class="title">备用邮箱</div>
                                <div class="desc">当前未绑定备用邮箱</div>
                            </div>
                            <div class="action">
                                <el-button text>绑定</el-button>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </page-main>
        <el-dialog v-model="dialogFormVisible" title="请传入清晰明亮的身份证照片" :before-close="beforeClose">
            <el-upload
                class="upload-demo"
                drag
                action="http://81.70.180.118/api/v1/ai/user/id_photo"
                :auto-upload = "true"
                :http-request = "uploadAction"
                multiple
                v-loading="authLoading"
            >
                <el-icon class="el-icon--upload">
                    <svg-icon name="ep:upload-filled" />
                </el-icon>
                <div class="el-upload__text">
                    拖动文件到此处 <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        请传入jpg/png格式文件,大小小于1MB
                    </div>
                </template>
            </el-upload>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.avatar-uploader{
    width: 178px;
    height: 178px;
    display: block;
}
.mx-1{
    margin: 0 20px 0 0;
}
.w-20{
    width: 100px;
}
:deep(.el-tabs) {
    .el-tabs__header .el-tabs__nav {
        .el-tabs__active-bar {
            z-index: 0;
            width: 100%;
            background-color: var(--el-color-primary-light-9);
            border-right: 2px solid var(--el-color-primary);
            transition: transform 0.3s, background-color 0.3s, var(--el-transition-border);
        }
        .el-tabs__item {
            text-align: left;
            padding-right: 100px;
        }
    }
    .el-tab-pane {
        padding: 0 20px 0 30px;
    }
}
h2 {
    margin: 0;
    margin-bottom: 30px;
    font-weight: normal;
}
.basic {
    :deep(.headimg-upload) {
        text-align: center;
        .el-upload-dragger {
            border-radius: 50%;
        }
    }
}
.security {
    .setting-list {
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid var(--el-border-color-lighter);
            transition: var(--el-transition-border);
            .content {
                .title {
                    margin-bottom: 5px;
                    color: var(--el-text-color-primary);
                    transition: var(--el-transition-color);
                }
                .desc {
                    font-size: 14px;
                    color: var(--el-text-color-secondary);
                    transition: var(--el-transition-color);
                }
            }
            &:last-child {
                border-bottom: 0;
            }
        }
    }
}
.authentication{
    display: flex;
    flex-direction: row;
    align-items: center;
    .authentication-img{
        width: 200px;
    }
    .authentication-tag{
        margin-left: 10px;
    }
}

</style>
