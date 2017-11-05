import course from '../../api/course'
import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  hot:[], //热门
  all: [], //所有
  myPartial: [], //我的部分
  mine: [], //我的全部
  detail: {} //课程详情
}

const getters = {
}

const actions = {
  hot ({ commit, state }) {
    course.list(
      {
        'type': 'hot',
        'limit': '8{Number}',
        'select': '_id,author,cover,title,subtitle'
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
        'select': '_id,author,cover,initial,title,subtitle'
      },
      res => commit(types.COURSE_ALL, res.data),
      res => commit(types.COURSE_FAILURE)
    )
  },
  mine ({ commit, state }) {
    course.list(
      {
        'type': 'mine',
        'sort': 'initial{String}',
        'order': '1{Number}',
        'putIn': 'true{Boolean}',
        'select': '_id,author,cover,initial,title,subtitle'
      },
      res => commit(types.COURSE_MINE, res.data),
      res => commit(types.COURSE_FAILURE)
    )
  },
  myPartial ({ commit, state }) {
    course.list(
      {
        'type': 'myPartial'
      },
      res => commit(types.COURSE_MY_PARTIAL, res.data),
      res => commit(types.COURSE_FAILURE)
    )
  },
  detail ({ commit, state}, courseId) {
    if(state.detail[courseId])
      return
    course.detail(
      courseId,
      res => commit(types.COURSE_DETAIL, res.data),
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
  [types.COURSE_DETAIL] (state, course) {
    Vue.set(state.detail, course._id, course)
  },
  [types.COURSE_MINE] (state, list) {
    //我的全部课程
    state.mine = list
  },
  [types.COURSE_MY_PARTIAL] (state, list) {
    //我的部分课程
    state.myPartial = list
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
