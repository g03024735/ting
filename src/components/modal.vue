<template>
  <div class="modal-wrap">
    <div class="modal-content" @touchmove.stop.prevent="empty">
      <h1>{{ head }}</h1>
      <p>{{ msg }}</p>
      <span @click.stop="close">关闭</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'modal',
  data: function() {
    return {
    }
  },
  props: ["head", "msg"],
  methods: {
    empty() {},
    ...mapMutations({
      showModal: types.ERROR_MSG_SHOW
    }),
    close() {
      this.showModal(false)
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.modal-wrap {
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index:10;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-content {
    width: 70%;
    display: flex;
    flex-direction: column;
    border: 5px solid #999;
    background-color: white;
    overflow: hidden;
    border-radius: .2rem;
    h1 {
      width: 100%;
      font-size: .4rem;
      text-align: center;
    }
    p {
      width: 100%;
      font-size: .3rem;
      padding: 0.3rem;
    }
    span {
      font-size: .38rem;
      width: 100%;
      text-align: center;
      color: white;
      background-color: #0fa7f3;
    }
  }
}
</style>
