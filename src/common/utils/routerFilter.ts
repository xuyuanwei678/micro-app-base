/*
 * @Author: BlackJoken
 * @Date: 2022-04-06 11:24:33
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-15 11:28:07
 */
import {getCookie} from './cookie'
import {API_PV_POST} from '@/http/apiActive/pv'
const whiteList = ['/login', '/forget','/register','/index','/explain','/competition/team','/answer' ,'/answer/details','/competition/subject']
export const routerFilter = (router) => {
    console.log(router)
    
    
    router.beforeEach((to, from, next) =>{
        let cookie = getCookie('JSESSIONID')
        API_PV_POST().then()
        if (cookie) {
            if (to.path === '/login'){
                next({ path: '/index' })
            }else{
                next()
            }
        } else {
            if(whiteList.indexOf(to.path) !== -1){
                next()
            }else{
                router.push('/login')
            }
        }
    })
    // router.afterEach((to, from) => {
    //     const toDepth = to.path.split('/').length
    //     const fromDepth = from.path.split('/').length
    //     to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //   })
}