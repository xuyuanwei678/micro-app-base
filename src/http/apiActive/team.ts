import axios from '@/http/axios'
import {
    API_TEAM,
    API_USER,
    API_SAVE,
    API_DELETE,
  } from '@/http/api/team'
export const API_TEAM_GET = () => {
    return axios({
      url: API_TEAM,
      method: 'get',
    })
  }
  export const API_USER_GET = () => {
    return axios({
      url: API_USER,
      method: 'get',
    })
  }
  export const API_USER_PUT = (data:Object) => {
    return axios({
      url: API_USER,
      method: 'PUT',
      data
    })
  }
  export const API_SAVE_POST = (data:Object) => {
    return axios({
      url: API_SAVE,
      method: 'POST',
      data
    })
  }
  export const API_TEAM_DELETE = (id:String) => {
    let url = API_DELETE + id
    return axios({
      url,
      method: 'DELETE',
    })
  }