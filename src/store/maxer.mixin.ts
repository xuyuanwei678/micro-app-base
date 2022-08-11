/*
 * @Author: BlackJoken
 * @Date: 2022-04-12 10:41:44
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-12 10:54:48
 */
import { App } from 'vue'
import { mapState } from "vuex";
import store from '@/store/index.ts'

// 将定义的state变量key全部加载到全局变量中
const $mStoreKey = store.state ? Object.keys(store.state) : [];
export class Maxer{
    vuex = (name: string, value: any): void=>{
        store.commit('$changeStore', {
            name, value
        })
    }
}

export default<T> (app: App<T>) => {
    // 进行全局混入
    // 将vuex方法挂载到$m中
    // 使用方法为: this.$m.vuex('user.name', 'x')
    app.config.globalProperties.$m = new Maxer();
    app.mixin({
        computed: {
            // 将vuex的state中的所有变量，解构到全局混入的mixin中
            ...mapState($mStoreKey)
        }
    })
}