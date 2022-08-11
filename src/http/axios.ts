
import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import router from '@/router'
import { delCookie } from "@/common/utils/cookie";
import { ElMessage } from 'element-plus'
import store from '@/store';
/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
const getErrorCode2text = (response: AxiosResponse): string => {
  /** http status code */
  const code = response.status
  console.log('response.status', response.status)
  /** notice text */
  let message = 'Request Error'
  switch (code) {
    case 400:
      message = 'Request Error'
      break
    case 401:
      message = 'Unauthorized, please login'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '访问资源不存在'
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '位置错误'
      break
    case 501:
      message = '承载服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务暂不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = '暂不支持的 HTTP 版本'
      break
    default:
      message = '位置错误'
  }
  return message
}

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */




const service = Axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 60*1000,
  headers: {
    'User-Type': 'bus',
    'Content-Type': 'application/json',
  }
})

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // 如果是获取token接口：
  config.headers.token = sessionStorage.getItem('token')
  if (config.url === '/auth/oauth/token') {
    let userAccount = ''
    // 若存在username，则为登录情况，判断user-account
    if (config.params.username) {
      userAccount = config.params.username.includes('-')
        ? 'ACCOUNT_USER'
        : 'ADMIN_USER'
    } else {

    }
  } else {
    // 如果保存有token，则取，否则不添加Authorization
    if (localStorage.vuex && JSON.parse(localStorage.vuex).user?.token) {
    }
  }

  return config
})

/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
service.interceptors.response.use(

res => {
  
  if(res.data.code!='200'){
    
    if(res.data.code == '5001'){
      ElMessage({
        message: '登录过期',
        grouping: true,
        type: 'error',
      })
      delCookie('JSESSIONID')
      store.commit('changeLoginTag','过期了')
      localStorage.clear();
      router.push("/login");
      return Promise.resolve(res.data)
    }else{
      ElMessage.error(res.data.msg || '请求错误')
      return Promise.resolve(res.data)
    }
    
  }else{
    return Promise.resolve(res.data) 
  }
  
},
  error => {
    console.log('err', error.response)
    if(error.response){
      if (error.response.data) {
        let data = error.response.data
        console.log('data',data)
        ElMessage.error(data.msg||data.message)
        if (data.code == '5001') {
          console.log('cookie 过期')
        } else if(data.code == '40006'){
          console.log(data.code,'40000000000')
          return Promise.reject(error.response.data)
        }
      }else{
        getErrorCode2text(error.response)
      }
    }
    
    return 0;
  }
)

export default service
