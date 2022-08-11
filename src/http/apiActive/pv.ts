/*
 * @Author: BlackJoken
 * @Date: 2022-04-12 15:17:00
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-12 15:18:11
 */
import axios from '@/http/axios'
import {
    API_PV
  } from '@/http/api/pv'
  export const API_PV_GET = () => {
    return axios({
      url: API_PV,
      method: 'get',
    })
  }
  export const API_PV_POST = () => {
    return axios({
      url: API_PV,
      method: 'post',
    })
  }