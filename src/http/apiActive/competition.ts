/*
 * @Author: BlackJoken
 * @Date: 2022-04-08 10:18:45
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-11 15:57:06
 */
import axios from '@/http/axios'
import {
    API_TEAMLIST,
    API_ACTIVETIME,
    API_SAVECOMPETITIONFILES,
    API_SHAREFILES,
  } from '@/http/api/competition'
  export const API_TEAMLIST_GET = () => {
    return axios({
      url: API_TEAMLIST,
      method: 'get',
    })
  }
  export const API_ACTIVETIME_GET = () => {
    return axios({
      url: API_ACTIVETIME,
      method: 'get',
    })
  }
  export const API_SAVECOMPETITIONFILES_GET = () => {
    return axios({
      url: API_SAVECOMPETITIONFILES,
      method: 'get',
    })
  }
  export const API_SHAREFILES_GET = () => {
    return axios({
      url: API_SHAREFILES,
      method: 'get',
    })
  }