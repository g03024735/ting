import * as types from '../mutation-types'

const state = {
  voiceList:[
    {
        "_id": "59e9cb7cfdb6fa3ef40a465e",
        "stage": 1,
        "title": "为什么电价夜间减半",
        "duration": 504,
        "fileKey": "http://192.168.0.103:8000/zkkxswk/1-0821.mp3?expire=1509606836591&timestamp=1509520436591&sign=29806a377a6bae2a0a2156fe5e07ee71f01743cd193ff8779cecda9f09cedcf6",
        "attachKey": "http://192.168.0.103:8000/download/zkkxswk/1-0821-attach.zip?expire=-1&sign=36f998c86be4d53f6d150e8a667753ef7ffb50de2f4610df1b30574c51ed8a18",
        "course": "59e9985ed1da961c2c0a6697",
        "publishTime": "2017-10-20T10:10:04.253Z"
    },
    {
        "_id": "59e9ff31fdb6fa3ef40a465f",
        "stage": 2,
        "title": "太空垃圾会不会越来越多？",
        "duration": 523,
        "fileKey": "http://192.168.0.103:8000/zkkxswk/1-0823.mp3?expire=1509606805723&timestamp=1509520405723&sign=a2c5281801333a84da4badfc4d46139f50f1a6a355ff0926bd8d4e4201ecd94c",
        "attachKey": "http://192.168.0.103:8000/download/zkkxswk/1-0823-attach.zip?expire=-1&sign=077bf9e9ffb9b5f1c232af4b59611466427aa25e16ad3fcb59ed6232057ec30c",
        "course": "59e9985ed1da961c2c0a6697",
        "publishTime": "2017-10-20T13:50:41.815Z"
    }
  ],
  simplify: true
}

const getters = {
}

const actions = {
}

const mutations = {
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
    state.voiceList.push(state.voiceList.shift())
  },
  [types.PLAYER_VOICE_PRE] (state) {
    if(state.voiceList.length < 2)
      return
    state.voiceList.unshift(state.voiceList.pop())
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
