import voice from '../../api/voice'
import * as types from '../mutation-types'

const state = {
  daily: [],
  voices: []
}

const getters = {
}

const actions = {
  addPlay ({ commit }, voiceId) {
    voice.detail(
      voiceId,
      res => commit(types.ADD_PLAY, res.data, {root: true}),
      err => commit(types.ADD_PLAY_ERROR, err, {root: true}),
    )
  },
  daily({ commit }) {
    voice.list(
      {
        type: "daily",
        sort: "publishTime",
        order: "-1{Number}"
      },
      res => commit(types.VOICE_DAILY, res.data),
      err => commit(types.VOICE_ERROR, err)
    )
  },
  list({ commit, state }, courseId) {
    if(state.voices.some(course => course.course == courseId))
      return
    voice.list({
        course: courseId,
        sort: "publishTime",
        order: "-1{Number}",
      },
      res => commit(types.VOICE_LIST, { course: courseId, voices : res.data }),
      err => commit(types.VOICE_ERROR, err)
    )
  },
  addlist({ commit }, course, skip, limit) {
    voice.list(
      {
        course,
        sort: "publishTime",
        order: "-1{Number}",
        limit: `${limint}{Number}`,
        skip: `${skip}{Number}`
      },
      res => commit(types.VOICE_LIST, { course, voices : res.data }),
      err => commit(types.VOICE_ERROR, err)
    )
  },
  downloadAttach({ state }, voiceId, router) {
    voice.detail(
      voiceId,
      res => {
        if(res.data.manuscripts)
          window.location = res.data.manuscripts
      },
      err => {
      }
    )
  }
}

const mutations = {
  [types.VOICE_DAILY] (state, voices) {
    state.daily = voices
  },
  [types.VOICE_LIST] (state, { course, voices }) {
    state.voices.map(course => {
      if(course.course == course){
        course.voices.push(...voices)
        return
      }
    })
    state.voices.push({
      course,
      voices
    })
  },
  [types.VOICE_ERROR] (state) {
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
