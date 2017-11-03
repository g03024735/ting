import * as types from '../mutation-types'
import voice from '../../api/voice'

const state = {
  voiceList:[],
  simplify: true, //精简模式显示
  control: false, //是否显示播放器
}

const getters = {
  control(state) {
    return state.control && state.voiceList.length > 0
  },
  playing(state) {
    return state.voiceList[0] && state.voiceList[0].playing
  },
  paused(state, getters) {
    return state.voiceList[0] && !state.voiceList[0].playing
  },
  voiceId() {
    return state.voiceList[0] ? state.voiceList[0]._id : ''
  }
}

const actions = {
  addPlay ({ commit }, voiceId) {
    voice.detail(
      voiceId,
      res => commit(types.ADD_PLAY, res.data),
      err => commit(types.ADD_PLAY_ERROR, err),
    )
  }
}

const mutations = {
  [types.ADD_PLAY] (state, voiceInfo) {
    voiceInfo.playing = true
    state.control = true
    if (state.voiceList.length > 0)
      state.voiceList[0].playing = false
    state.voiceList.unshift(voiceInfo)
  },
  [types.ADD_PLAY_ERROR] (err) {
    console.log('ADD_PLAY_ERROR', err)
  },
  [types.PLAYER_SHOW] (state) {
    state.control = true
  },
  [types.PLAYER_CLOSE] (state) {
    state.control = false
  },
  [types.PLAYER_SIMPLIFY_CHANGE] (state) {
    state.simplify = !state.simplify
  },
  [types.PLAYER_VOICE_NEXT] (state) {
    if(state.voiceList.length < 2)
      return
    state.voiceList[0].playing = false
    state.voiceList.push(state.voiceList.shift())
    state.voiceList[0].playing = true
  },
  [types.PLAYER_VOICE_PRE] (state) {
    if(state.voiceList.length < 2)
      return
    state.voiceList[0].playing = false
    state.voiceList.unshift(state.voiceList.pop())
    state.voiceList[0].playing = true
  },
  [types.PLAY] (state) {
    state.voiceList[0].playing = true
  },
  [types.PAUSE] (state) {
    state.voiceList[0].playing = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
