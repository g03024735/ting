import {voice, voice_detail} from './http_url'
import axios from 'axios'

export default {
  list(opts = {}, cb, errCb) {
    axios.get(voice(), {
        params: Object.assign({}, opts)
      })
      .then(res => cb(res))
      .catch(err => errCb(err))
  },
  detail(voiceId, cb, errCb) {
    axios.get(voice_detail(voiceId))
    .then(res => cb(res))
    .catch(err => errCb(err))
  }
}
