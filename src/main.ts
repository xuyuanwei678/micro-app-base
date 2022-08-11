/*
 * @Author: BlackJoken
 * @Date: 2022-01-10 14:45:33
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-01-18 13:07:25
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'
import '@/common/rem.js'


import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import relativeTime from'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.extend(relativeTime)
dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言

import initStorePersistence from './store/relaunch'
import installMaxerStore, { Maxer } from './store/maxer.mixin'
// 声明全局组件 防止需要this调用时不能识别类型
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $m: Maxer;  // 声明全局方法
    }
}

//iconfont
import '@/assets/iconfont/iconfont.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import CKEditor from '@ckeditor/ckeditor5-vue'
import VueUeditorWrap from 'vue-ueditor-wrap' 

const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
// app.config.globalProperties.$Ics = Ics

app.use(ElementPlus, {
    locale: zhCn,
})

app.use(CKEditor)
app.use(VueUeditorWrap)
installMaxerStore(app) // 全局混入vuex
initStorePersistence(store) // 初始化持久化vuex
app.use(router).use(store).mount('#app')
