<template>
  <div class="">
    <v-cover v-if="loading"></v-cover>
    <template v-else>
      <div class="head">
        <div class="back" @click="back">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-back"></use>
          </svg>
        </div>
        <h1></h1>
      </div>
      <div class="content">
        <div class="title">
          <h1>{{ notice.title }}</h1>
        </div>
        <time>{{ notice.ctime | formatDate('yyyy-MM-dd hh:mm') }}</time>
        <div class="body">
          <p v-for="paragraph in paragraphs "> {{ paragraph }} </p>
        </div>
      </div>
    </template>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import cover from '@/components/cover'

export default {
  name: 'notice',
  data: function () {
    return {
      msg: 'sss',
    }
  },
  props: ["noticeId"],
  computed: {
    ...mapGetters({
      details: "notice/details"
    }),
    loading () {
      return !this.details.some(notice => {
        return notice._id === this.noticeId
      })
    },
    notice () {
      //bug 用Array.find方法 webpack打包的时候,UC QQ 等几个浏览器会报错,先用for循环来解决一下
      // return this.details.find( notice => notice._id === this.noticeId)
      for(let i = 0, notice; notice = this.details[i++];){
        if(notice._id === this.noticeId)
          return notice
      }
    },
    paragraphs () {
      return this.notice && this.notice.content.split("\r\n")
    }
  },
  methods: {
    ...mapActions({
      getDetail: "notice/detail"
    }),
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    if(this.details.some(notice => notice._id === this.noticeId))
      return
    this.getDetail(this.noticeId)
  },
  components: {
    'v-cover': cover
  }
}
</script>

<style scoped lang="scss">
.content {
  padding: .15rem;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    justify-content: center;
    h1 {
      font-size: .5rem;
      font-weight: bold;
      max-width: 90%;
      line-height: 110%;
      text-align: center;
    }
  }
  time {
    margin-top: .5rem;
    font-size: .3rem;
    text-align: center;
  }
  .body {
    padding: .5rem 0 2rem;
    p {
      font-size: .34rem;
      padding: .15rem;
      text-indent: .68rem;
      line-height: .43rem;
      white-space: pre-wrap;
    }
  }
}
</style>
