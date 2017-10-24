import user from '../../api/user'
import * as types from '../mutation-types'

const state = {
  userId: '',
  jwt:'',
  isLogged: false,
  msg: ''
}

const getters = {
  isLogin: state => state.isLogged,
  errorMsg: state => state.msg
}

const actions = {
  login ({ commit, state }, { userId }) {
    commit(types.INIT_USERID, { userId })
    user.login(
      state.userId,
      res => commit(types.LOGIN, res.data),
      err => commit(types.LOGIN_FAILURE, err.response.data)
    )
  }
}

const mutations = {
  [types.LOGIN] (state, { jwt }) {
    state.jwt = jwt
    state.isLogged = true
  },
  [types.INIT_USERID] (state, { userId }) {
    state.userId = userId
  },
  [types.LOGIN_FAILURE] (state, {code, error}) {
    state.msg = error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
