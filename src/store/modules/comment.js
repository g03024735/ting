import comment from '../../api/comment'
import * as types from '../mutation-types'


const state = {
  status: types.COMMENT_DEFAULT,
  err: ""
}

const getters = {
  status (state) {
    let _trans = {
      [types.COMMENT_DEFAULT]: '提交',
      [types.COMMENT_PUBLISH]: '正在提交',
      [types.COMMENT_PUBLISH_SUCCESS]: '提交成功',
      [types.COMMENT_PUBLISH_FAILURE]: '提交失败'
    }
    return _trans[state.status]
  }
}

const actions = {
  publish ({ commit, state }, _comment) {
    commit(types.COMMENT_PUBLISH)
    comment.publish(
      _comment,
      res => commit(types.COMMENT_PUBLISH_SUCCESS),
      err => commit(types.COMMENT_PUBLISH_FAILURE, err)
    )
  }
}

const mutations = {
  [types.COMMENT_PUBLISH] (state) {
    state.status = types.COMMENT_PUBLISH
  },
  [types.COMMENT_PUBLISH_SUCCESS] (state) {
    state.status = types.COMMENT_PUBLISH_SUCCESS
  },
  [types.COMMENT_PUBLISH_FAILURE] (state, err) {
    state.status = types.COMMENT_PUBLISH_FAILURE
    state.err = err
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
