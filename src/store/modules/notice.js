import notice from '../../api/notice'
import * as types from '../mutation-types'


const state = {
  notices:[],
  details: []
}

const getters = {
  count: state => state.notices.length,
  details: state => state.details
}

const actions = {
  list ({ commit, state }) {
    notice.list(
      {},
      res => commit(types.NOTICE_LIST, res.data),
      err => commit(types.NOTICE_DEFAULT)
    )
  },
  detail ({commit, state}, noticeId) {
    notice.detail(
      noticeId,
      res => commit(types.NOTICE_DETAIL, res.data),
      err => commit(types.NOTICE_DETAIL_FAILURE)
    )
  }
}

const mutations = {
  [types.NOTICE_LIST] (state, list) {
    state.notices = list
  },
  [types.NOTICE_DEFAULT] (state) {
    state.notices = []
  },
  [types.NOTICE_DETAIL] (state, notice) {
    state.details.push(notice)
  },
  [types.NOTICE_DETAIL_FAILURE] (state) {
    //todo 暂时先不处理
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
