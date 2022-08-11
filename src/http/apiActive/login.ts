/*
 * @Author: BlackJoken
 * @Date: 2022-03-30 14:03:02
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-18 11:22:15
 */
import axios from '@/http/axios'
import qs from 'qs'
import {
  API_LOGIN,
  API_LOGOUT,
  API_CHANGEPASSWORD,
  API_REGISTER,
  API_SENDPASSWORD,
  API_USER,
} from '@/http/api/login'
export const API_LOGIN_POST = (data: Object) => {
    let dataForm = qs.stringify(data)
    return axios({
      url: API_LOGIN,
      method: 'post',
      data: dataForm,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      
    })
  }
  export const API_LOGOUT_POST = () => {
    return axios({
      url: API_LOGOUT,
      method: 'POST',
    })
  }
  export const API_SENDPASSWORD_POST = (data: Object) => {
    return axios({
      url: API_SENDPASSWORD,
      method: 'POST',
      params: data,
    })
  }
  
  export const API_CHANGEPASSWORD_PUT = (data: Object) => {
    return axios({
      url: API_CHANGEPASSWORD,
      method: 'put',
      data
    })
  }
  export const API_REGISTER_POST = (data: Object) => {
    return axios({
      url: API_REGISTER,
      method: 'POST',
      data
    })
  }
  export const   API_USER_POST = () => {
    return axios({
      url:   API_USER,
      method: 'get',
    })
  }