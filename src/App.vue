<template>
<div id="app">
  <transition name="fade" mode="out-in">
    <div>
      <router-view/>
      <v-player></v-player>
      <v-modal v-if="isShowModal" :msg="'您未购买此课程!'" :head="'提示'"></v-modal>
    </div>
  </transition>
</div>
</template>

<script>
import player from '@/components/player'
import modal from '@/components/modal'
import * as types from './store/mutation-types'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'app',
  data: function() {
    return {
      isShowModal: false,
    }
  },
  components: {
    'v-player': player,
    'v-modal': modal,
  },
  computed: {
    ...mapGetters(["isLogin", "showErrMsg", "errorMsg"]),
  },
  watch: {
    showErrMsg(cur){
      //往urlpush 一个 #
      if(cur){
        window.location.hash = "modal"
        this.isShowModal = true
      }else {
        this.isShowModal = false
      }
    }
  },
  methods: {
    ...mapMutations({
      showModal: types.ERROR_MSG_SHOW
    }),
    _handleModalClose(){
      if(window.location.hash !== "#modal")
        this.showModal(false)
    }
  },
  mounted: function() {
    window.onhashchange = this._handleModalClose
  },
  beforeDestroy: function() {
    window.onhashchange = null
  }
}
</script>

<style lang="scss">
@import "./style/common.scss";
@import "./style/base.scss";

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

</style>
