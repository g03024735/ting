import voice from '../../api/voice'
import * as types from '../mutation-types'


const state = {
  daily: []
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
  downloadAttach({ state }, voiceId) {
    voice.detail(
      voiceId,
      res => {
        if(res.data.manuscripts)
          window.open(res.data.manuscripts, 'download')
      },
      err => {
      }
    )
  }
}

const mutations = {
  [types.VOICE_DAILY] (state, voices) {
    state.daily = voices
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
