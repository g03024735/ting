import course from '../../api/course'
import * as types from '../mutation-types'


const state = {
  hot:[],
  all: [],
}

const getters = {
  hotCount: state => state.hot.length,
  hot: state => state.hot
}

const actions = {
  hot ({ commit, state }) {
    course.list(
      {
        'type': 'hot',
        'limit': '8{Number}',
        'select': '_id,author,cover,name'
      },
      res => commit(types.COURSE_HOT, res.data),
      err => commit(types.COURSE_FAILURE)
    )
  }
}

const mutations = {
  [types.COURSE_HOT] (state, list) {
    state.hot = list
  },
  [types.COURSE_FAILURE] (state) {
    //先不做操作
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
