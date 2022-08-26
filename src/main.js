import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import SocketIO from '@/util/socketio'
import pinia from './store'
app.use(pinia)

import router from './router'
app.use(router)

//链接socket io
app.use(SocketIO, {
    connection: 'http://81.70.180.118:5000/chat',
    options: {     //Optional options,
        autoConnect:false, //关闭自动连接，在用户登录后在连接。
    }
})
/* importElementPlusPlaceholder */

import globalProperties from '@/util/global.properties'
globalProperties(app)

// 自定义指令
import directive from '@/util/directive'
directive(app)

// 加载 svg 图标
import 'virtual:svg-icons-register'
// 加载 iconify 图标（element plus）
import { downloadAndInstall } from '@/iconify-ep'
import useSettingsStore from './store/modules/settings'
if (useSettingsStore().app.iconifyOfflineUse) {
    downloadAndInstall()
}

// 全局样式
import '@/assets/styles/globals.scss'

app.mount('#app')
