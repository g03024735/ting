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
    .then(res => cb(res))
    .catch(err => errCb(err))
  }
}
