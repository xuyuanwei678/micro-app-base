/*
 * @Author: BlackJoken
 * @Date: 2022-01-11 10:02:32
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-03-17 09:31:47
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import test from '@/views/test.vue'

// import {routerFilter} from '@/common/utils/routerFilter'

/** 自动加载其他路由模块 */
const registerRoute = () => {
  const routerList = []
  const modules = import.meta.globEager('./*.ts')
  for (const val of Object.values(modules)) routerList.push(val.default)
  return routerList.flat()//用于将嵌套的数组拉平 [1, 2, [3, 4]].flat()// [1, 2, 3, 4] 
}
/** 自动加载其他路由模块end */

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...registerRoute(),
    {
      path: '/',
      redirect: '/test'
    },
    {
    path: '/test',
    name: 'test',
    component: test
  }
]
})
// routerFilter(Router)
export default Router
