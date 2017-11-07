import user from '../../api/user'
import * as types from '../mutation-types'


const state = {
  userId: '',
  jwt:'',
  isLogged: false,
  msg: '',
  errorMsg: 'hahahah',
  showErrMsg: false
}

const getters = {
  userId: state => state.userId,
  isLogin: state => state.isLogged,
  loginMsg: state => state.msg,
  errorMsg: state => state.errorMsg,
  showErrMsg: state => state.showErrMsg
}

const actions = {
  login ({ commit, state, dispatch}, { userId }) {
    commit(types.INIT_USERID, { userId })
    user.login(
      state.userId,
      res => {
        Promise.all([
          dispatch('notice/list'), //获取 公告
          dispatch('course/hot'), //获取 热门课程
          dispatch('course/mine') //获取 我订购的全部课程
        ]).then(()=>{
          //获取 我订购部分课程的最近一条音频
          Promise.all([
            dispatch('voice/daily'),
            dispatch('course/myPartial')
          ]).then(()=>{
            commit(types.LOGIN, res.data)
          })
        })
      },
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
  },
  [types.ERROR_MSG] (state, errorMsg) {
    state.errorMsg = errorMsg
  },
  [types.ERROR_MSG_SHOW] (state, isOrNot) {
    state.showErrMsg = isOrNot
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
