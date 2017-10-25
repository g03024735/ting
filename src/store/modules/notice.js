import notice from '../../api/notice'
import * as types from '../mutation-types'


const state = {
  notices:[]
}

const getters = {
  count: state => state.notices.length,
}

const actions = {
  list ({ commit, state }) {
    notice.list(
      {},
      res => commit(types.NOTICE_LIST, res.data),
      err => commit(types.NOTICE_DEFAULT)
    )
  }
}

const mutations = {
  [types.NOTICE_LIST] (state, list) {
    state.notices = list
  },
  [types.NOTICE_DEFAULT] (state) {
    state.notices = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
