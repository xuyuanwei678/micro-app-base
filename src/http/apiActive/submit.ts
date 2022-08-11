/*
 * @Author: BlackJoken
 * @Date: 2022-04-13 13:30:00
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-14 11:38:05
 */
import axios from '@/http/axios'
import {
    API_SUBMITLIST,
    API_ISFILES,
    API_VERIFYFILE,
    API_SUBMITFILE,
    API_COUNTS,
    API_SUBMITRESULT,
  } from '@/http/api/submit'
  export const API_SUBMITLIST_GET = () => {
    return axios({
      url: API_SUBMITLIST,
      method: 'get',
    })
  }
  export const API_SUBMITLIST_POST = (params:Object) => {
    return axios({
      url: API_SUBMITLIST,
      method: 'post',
      params
    })
  }
  export const API_SUBMITLIST_DELETE = (params:Object) => {
    return axios({
      url: API_SUBMITLIST,
      method: 'delete',
      params
    })
  }
  export const API_ISFILES_GET = (params: Object) => {
    return axios({
      url: API_ISFILES,
      method: 'get',
      params
    })
  }
  
  export const API_VERIFYFILE_POST = (params: Object) => {
    return axios({
      url: API_VERIFYFILE,
      method: 'post',
      params
    })
  }
  
  export const API_SUBMITFILE_POST = (params: Object) => {
    return axios({
      url: API_SUBMITFILE,
      method: 'post',
      params
    })
  }
  export const API_COUNTS_GET = (params: Object) => {
    return axios({
      url: API_COUNTS,
      method: 'get',
      params
    })
  }
  
  export const API_SUBMITRESULT_GET = (params: Object) => {
    return axios({
      url: API_SUBMITRESULT,
      method: 'get',
      params
    })
  }