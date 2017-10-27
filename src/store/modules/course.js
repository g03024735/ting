import course from '../../api/course'
import * as types from '../mutation-types'


const state = {
  hot:[],
  all: [],
  mine: [],
  mineAll: [],
}

const getters = {
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
  },
  all ({ commit, state }) {
    course.list(
      {
        'type': 'all',
        'sort': 'initial{String}',
        'order': '1{Number}',
        'putIn': 'true{Boolean}',
        'select': '_id,author,cover,initial,name'
      },
      res => commit(types.COURSE_ALL, res.data),
      res => commit(types.COURSE_FAILURE)
    )
  },
  my ({ commit, state }) {
    course.list(
      {
        'type': 'mine',
        'sort': 'initial{String}',
        'order': '1{Number}',
        'putIn': 'true{Boolean}',
        'select': '_id,author,cover,initial,name'
      },
      res => commit(types.COURSE_MY, res.data),
      res => commit(types.COURSE_FAILURE)
    )
  },
  myAll ({ commit, state }) {
    course.list(
      {
        'type': 'mine',
        'sort': 'initial{String}',
        'order': '1{Number}',
        'putIn': 'true{Boolean}',
        'select': '_id,author,cover,initial,name'
      },
      res => commit(types.COURSE_MY_ALL, res.data),
      res => commit(types.COURSE_FAILURE)
    )
  }
}

const mutations = {
  [types.COURSE_HOT] (state, list) {
    state.hot = list
  },
  [types.COURSE_ALL] (state, list) {
    state.all = list
  },
  [types.COURSE_MY] (state, list) {
    state.mine = list
  },
  [types.COURSE_MY_ALL] (state, list) {
    state.mineAll = list
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
