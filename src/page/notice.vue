<template>
  <div class="">
    <template v-if="loading">
      {{ msg }}
    </template>
    <v-cover v-else></v-cover>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import cover from '@/components/cover'

export default {
  name: 'notice',
  data: function () {
    return {
      msg: 'sss'
    }
  },
  props: ["noticeId"],
  computed: {
    ...mapGetters({
      details: "notice/details"
    }),
    loading () {
      return !!this.notice
    },
    notice () {
      return this.details.find(notice => notice._id === this.noticeId)
    }
  },
  methods: {
    detail (noticeId) {
      console.log(2)
      return !!this.details.find(notice => notice._id === noticeId)
    },
    ...mapActions({
      getDetail: "notice/detail"
    })
  },
  created () {
    if(this.detail(this.noticeId))
      return
    this.getDetail(this.noticeId)
  },
  components: {
    'v-cover': cover
  }
}
</script>

<style scoped lang="scss">
</style>
