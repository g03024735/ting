import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'
import notice from './modules/notice'
import course from './modules/course'
import comment from './modules/comment'
import player from './modules/player'
import voice from './modules/voice'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  actions,
  modules: {
    user,
    notice,
    course,
    comment,
    voice,
    player
  },
  strict: debug
})
