/*
 * @Author: BlackJoken
 * @Date: 2022-04-02 16:50:16
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-08 15:57:42
 */

import axios from '@/http/axios'
import {
    API_INDEX,
    API_EXPLAIN,
    API_COMPETITION,
    API_SHARER,
    API_ANNOUNCEMENT,
    API_BASETEXT,
  } from '@/http/api/editor'
  export const API_INDEX_GET = () => {
    return axios({
      url: API_INDEX,
      method: 'get',
    })
  }
  export const API_EXPLAIN_GET = () => {
    return axios({
      url: API_EXPLAIN,
      method: 'get',
    })
  }
  export const API_COMPETITION_GET = () => {
    return axios({
      url: API_COMPETITION,
      method: 'get',
    })
  }
  export const API_SHARER_GET = () => {
    return axios({
      url: API_SHARER,
      method: 'get',
    })
  }
  export const API_ANNOUNCEMENT_GET = () => {
    return axios({
      url: API_ANNOUNCEMENT,
      method: 'get',
    })
  }
  export const API_BASETEXT_GET = (params: Object) => {
    return axios({
      url:   API_BASETEXT,
      method: 'GET',
      params
    })
  }