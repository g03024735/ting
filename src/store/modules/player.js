import * as types from '../mutation-types'

const state = {
  voiceList:[
    {
        "_id": "59e9cb7cfdb6fa3ef40a465e",
        "stage": 1,
        "title": "为什么电价夜间减半",
        "duration": 504,
        "fileKey": "http://192.168.0.103:8000/zkkxswk/1-0821.mp3?expire=1509518832582&timestamp=1509515232582&sign=19b5ef1d9d9805e92c5083014016e1ca8e28d72702cc28dc4df8246f31cc070a",
        "attachKey": "http://192.168.0.103:8000/download/zkkxswk/1-0821-attach.zip?expire=-1&sign=36f998c86be4d53f6d150e8a667753ef7ffb50de2f4610df1b30574c51ed8a18",
        "course": "59e9985ed1da961c2c0a6697",
        "publishTime": "2017-10-20T10:10:04.253Z"
    },
    {
        "_id": "59e9ff31fdb6fa3ef40a465f",
        "stage": 2,
        "title": "太空垃圾会不会越来越多？",
        "duration": 523,
        "fileKey": "http://192.168.0.103:8000/zkkxswk/1-0823.mp3?expire=1509518918179&timestamp=1509515318179&sign=96ac41ba9de056d3aab74a75905d005b9f657b1e19dc300f1a74dfdadf0d80e0",
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
