<template>
  <div>
    <template v-if="isLogin">
        <v-header :title="title" ></v-header>
    </template>
    <v-cover v-else :msg="errorMsg"></v-cover>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import header from '@/components/header'
import cover from '@/components/cover'

export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'ting',
    }
  },
  props:["userId"],
  components: {
    'v-header': header,
    'v-cover': cover
  },
  computed: {
    ...mapGetters(["isLogin", "errorMsg"])
  },
  methods: {
    ...mapActions(["login"])
  },
  created () {
    this.login({
      userId: this.userId
    })
  }
}
</script>

<style scoped lang="scss">
</style>
