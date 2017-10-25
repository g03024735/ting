import {notice, notice_detail} from './http_url'
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
  },
  detail(noticeId, cb, errCb) {
    axios.get(notice_detail(noticeId))
    .then(res => cb(res))
    .then(err => errCb(err))
  }
}
