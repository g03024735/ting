import {token} from './http_url'
import axios from 'axios'

axios.interceptors.request.use(function (config) {
  if(!config.headers.Authorization){
    config.headers.Authorization = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

axios.interceptors.response.use(function (response) {
  return response;
}, function (err) {
  return Promise.reject(err)
})

export default {
  login(userId, cb, errCb) {
    axios({
      method: 'post',
      url: token(),
      data: {
        userId
      }
    })
    .then(res => {
      localStorage.setItem('token', 'Bearer ' + res.data.jwt)
      cb(res)
    })
    .catch(err => errCb(err))
  }
}
