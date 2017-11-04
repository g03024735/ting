import {formatDate} from './date'

export default function(Vue) {
  Vue.filter('HHMMSS', function(value) {
    if(!value)
      return '00:00'
    let hhmmss = new Date(value * 1000).toISOString().substr(11, 8)
    return (hhmmss.indexOf('00:') === 0) ? hhmmss.substr(3) : hhmmss
  })
  Vue.filter('formatDate', formatDate)
}
