import axios from 'axios'
import {comment} from './http_url'

export default {
  publish(body, cb, errCb) {
    axios.post(comment(), body)
    .then(res=>cb(res))
    .catch(err => errCb(err))
  }
}
