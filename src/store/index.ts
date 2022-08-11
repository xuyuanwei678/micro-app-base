/*
 * @Author: BlackJoken
 * @Date: 2022-03-28 17:14:03
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-12 13:43:43
 */
import { createStore } from 'vuex'
import {reactive} from 'vue'
const store = createStore({
  //定义const { proxy } = getCurrentInstance();
  //取：proxy.vuex_admin_orgId
  //存：proxy.$m.vuex('vuex_admin_orgId',id);
  state: reactive({
    vuex_nav: "",
    vuex_topicContent: '',
    vuex_loginTag: '我是测试2222',
    vuex_loginTagTest: '55555'
  }),
  getters: {

  },
  mutations: {
    $changeStore(state: any, payload: any){
      // 判断是否为多层级调用
      const nameArr = payload.name.split('.');
      const len = nameArr.length;
      if ( len >= 2){

        let obj = state[nameArr[0]];
        for (let i = 1 ; i < len - 1 ; i++){
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len-1]] = payload.value;
      }else {
        state[payload.name] = payload.value;
      }
    },
    changeTag(state: any){
      console.log('commit被执行了')
      state.vuex_loginTag = '你好我的朋友'
    },
    changeLoginTag(state: any,value: any){
      console.log('558588',value)
      state.vuex_loginTagTest = value
    }
  },
  actions: {
    
  },
  modules: {

  }
})

export default store