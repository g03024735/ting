import * as types from '../mutation-types'

const state = {
  voiceList:[
    {
        "_id": "59fb2ad71541c137912402aa",
        "title": "人类文明的10亿米台阶",
        "duration": 2004,
        "voice": "http://121.41.32.148:8000/zlblkj/renleiwenmingdeshiyimi.mp3?expire=1509702777553&timestamp=15096883775533807353481&sign=2b1970f47db8070476e36adc7af742ab6126a3dd5be74ad62f973eb9b61e289a",
        "manuscripts": "http://121.41.32.148:8000/download/renleiwenmingdeshiyimi.jpg?expire=0&timestamp=15096883775580542988323&sign=b7379a47a3758a4b4823e394f3d9a94ceead1b6e4b7503e0137bb73e0e8c8a22",
        "course": "59fad6e0ccf5820690937ee0",
        "publishTime": "2017-11-02T14:25:27.632Z"
    },
    {
        "_id": "59fb323eea948b3bf9a75491",
        "title": "第001讲丨战俘营里的经济组织",
        "duration": 829,
        "voice": "http://121.41.32.148:8000/xzfdbdjjxk/voices/01.mp3?expire=1509702835515&timestamp=15096884355152345932208&sign=e5faedb279ab3921526d642f9fcab9badeb7011aed8395db17bc45111587de7b",
        "manuscripts": "http://121.41.32.148:8000/download/xzfdbdjjxk/manuscripts/01.zip?expire=0&timestamp=15096884355155476743720&sign=6f95b73f1659806b1bbb5f330e5c787f7c5f217b8fa54f58322822b5f1fbe14c",
        "course": "59faefb650139c113d5df95f",
        "publishTime": "2017-11-02T14:57:02.284Z"
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
