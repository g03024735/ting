import {course, courses_detail} from './http_url'
import axios from 'axios'

export default {
  list(opts = {}, cb, errCb) {
    axios.get(course(), {
        params: Object.assign({}, {
            'type': 'hot',
            'limit': '8{Number}'
          },
          opts
        )
      })
      .then(res => cb(res))
      .catch(err => errCb(err))
  }
}
