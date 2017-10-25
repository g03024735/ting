import {notice} from './http_url'
import axios from 'axios'

export default {
  list(opts = {}, cb, errCb) {
    axios.get(notice(), {
        params: Object.assign({}, {
            'select': 'cover,title',
            'sort': 'ctime',
            'putIn': 'true{Boolean}',
            'order': '-1{Number}'
          },
          opts
        )
      })
      .then(res => cb(res))
      .catch(err => errCb(err))
  }
}
