import {token} from './http_url'
import axios from 'axios'

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
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.jwt
      cb(res)
    })
    .catch(err => errCb(err))
  }
}
