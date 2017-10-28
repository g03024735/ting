import {course, courses_detail} from './http_url'
import axios from 'axios'

export default {
  list(opts = {}, cb, errCb) {
    axios.get(course(), {
        params: Object.assign({},
          {
            'type': 'hot'
          },
          opts
        )
      })
      .then(res => cb(res))
      .catch(err => errCb(err))
  },
  detail(courseId, cb, errCb) {
    axios.get(courses_detail(courseId))
      .then(res => cb(res))
      .catch(err => errCb(err))
  }
}
