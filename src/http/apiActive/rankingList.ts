/*
 * @Author: BlackJoken
 * @Date: 2022-04-13 10:35:38
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-13 10:36:57
 */
import axios from '@/http/axios'
import {
    API_RANKLIST_JIA,
    API_RANKLIST_YI
  } from '@/http/api/rakningList'
  export const API_RANKLIST_JIA_GET = () => {
    return axios({
      url: API_RANKLIST_JIA,
      method: 'get',
    })
  }
  export const API_RANKLIST_YI_GET = () => {
    return axios({
      url: API_RANKLIST_YI,
      method: 'get',
    })
  }