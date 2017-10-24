import axios from 'axios'
import {comment} from './http_url'

export default {
  publish(body) {
    return axios.post(comment(), body)
  }
}
