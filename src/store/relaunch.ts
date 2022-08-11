/*
 * @Author: BlackJoken
 * @Date: 2022-04-12 10:41:34
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-12 10:54:34
 */
import {Store} from "vuex";
export default<T> (store: Store<T>): void=>{
    // 不需要持久化的数据存入sessionStorage
    if (sessionStorage.getItem('store')){
        store.replaceState(
            Object.assign(
                {},
                store.state,
                JSON.parse(sessionStorage.getItem('store') as string)
            )
        );
        // 移除sessionStorage中的数据
        sessionStorage.removeItem("store");
    }
    // 页面刷新的时候进行持久化
    window.addEventListener('beforeunload',()=>{
        //刷新时需要重新设置role角色以及获取路由权限
        store.commit('SET_ROLE', '')
        sessionStorage.setItem("store", JSON.stringify(store.state));
    })
}