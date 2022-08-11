/*
 * @Author: BlackJoken
 * @Date: 2022-04-07 13:33:41
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-07 16:02:25
 */
import axios from '@/http/axios'
import {
    API_ANSWERLIST,
    API_ANSWERDETAILS,
    API_PAPER,
  } from '@/http/api/answer'

  export const API_ANSWERLIST_GET = (params:Object) => {
    return axios({
      url: API_ANSWERLIST,
      method: 'get',
      params,
    })
  }
  export const API_ANSWERLIST_POST = (data:Object) => {
    return axios({
      url: API_ANSWERLIST,
      method: 'post',
      data,
    })
  }
  export const API_ANSWERDETAILS_GET = (params:Object) => {
    return axios({
      url: API_ANSWERDETAILS,
      method: 'get',
      params
    })
  }
  export const API_ANSWERDETAILS_POST = (data:Object) => {
    return axios({
      url: API_ANSWERDETAILS,
      method: 'post',
      data,
    })
  }
  export const API_ANSWERLIST_DELETE = (params:Object) => {
    return axios({
      url: API_ANSWERLIST,
      method: 'delete',
      params
    })
  }
  export const API_ANSWERDETAILS_DELETE = (params:Object) => {
    return axios({
      url: API_ANSWERDETAILS,
      method: 'delete',
      params
    })
  }
  export const API_PAPER_GET= (params:Object) => {
    return axios({
      url: API_PAPER,
      method: 'get',
      params
    })
  }
  export const API_PAPER_POST= (data:Object) => {
    return axios({
      url: API_PAPER,
      method: 'post',
      data
    })
  }
  export const API_PAPER_DEL= (params:Object) => {
    return axios({
      url: API_PAPER,
      method: 'delete',
      params
    })
  }

  