<script setup name="Editor">
import tinymce from 'tinymce/tinymce'
import TinymceEditor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import 'tinymce/models/dom'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/code'
import 'tinymce/plugins/searchreplace'
import { tinymceUpload } from "@/apiArray/community"

import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    setting: {
        type: Object,
        default: () => {}
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const defaultSetting = ref({
    language_url: 'tinymce/langs/zh-Hans.js',
    language: 'zh-Hans',
    skin_url: settingsStore.app.colorScheme === 'light' ? 'tinymce/skins/ui/oxide' : 'tinymce/skins/ui/oxide-dark',
    content_css: settingsStore.app.colorScheme === 'light' ? 'tinymce/skins/content/default/content.min.css' : 'tinymce/skins/content/dark/content.min.css',
    min_height: 500,
    selector: 'textarea',
    plugins: 'autolink autoresize fullscreen image insertdatetime link lists media preview table wordcount code searchreplace',
    toolbar: 'undo redo | blocks | bold italic underline strikethrough |  bullist numlist outdent indent removeformat | link image table insertdatetime searchreplace | preview code fullscreen',
    branding: false,
    menubar: false,
    toolbar_mode: 'sliding',
    elementpath: false,
    placeholder: '请输入更多描述',
    insertdatetime_formats: [
        '%Y年%m月%d日',
        '%H点%M分%S秒',
        '%Y-%m-%d',
        '%H:%M:%S'
    ],
    images_upload_handler: (blobInfo, progress) =>
        new Promise((resolve, reject) =>{
            console.log(blobInfo.blob())
            tinymceUpload(blobInfo.blob()).then(res=>{
                // 编辑器的上传图片内容被处理为<img src="success方法里面的参数" />
                resolve(res.url)
            }).catch((e)=> {
                reject(e)
            })
            // 调接口，上传图片
        })
})

const myValue = ref(props.modelValue)

const completeSetting = computed(() => {
    return Object.assign(defaultSetting.value, props.setting)
})

watch(() => myValue.value, newValue => {
    emit('update:modelValue', newValue)
})

watch(() => props.modelValue, newValue => {
    myValue.value = newValue
})

onMounted(() => {
    tinymce.init({})
})
</script>

<template>
    <div class="editor">
        <TinymceEditor v-model="myValue" :init="completeSetting" :disabled="disabled" />
    </div>
</template>

<style lang="scss" scoped>
:deep(.tox-tinymce) {
    border-radius: 4px;
}
</style>
