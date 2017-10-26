<template>
  <div class="">
    <v-cover v-if="loading"></v-cover>
    <template v-else>
      <div class="back" @click="back">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
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
      // console.log(this.details.find(notice => {
      //   console.log(notice._id, this.noticeId)
      //   return notice._id === this.noticeId
      // }))
      // [1,2,3,4].find( i => i==2 )
      console.log(typeof this.details,Array.isArray(this.details), this.details.length)
      return this.details[0]
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
.back {
  height: 1.1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.icon {
  margin-left: .1rem;
  width: .6rem;
  height: .6rem;
  fill: currentColor;
  vertical-align: center;
  overflow: hidden;
}
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
    padding-top: .5rem;
    p {
      font-size: .34rem;
      padding: .15rem;
      text-indent: .68rem;
      line-height: .43rem;
      white-space: pre-wrap;
      font-family: "Microsoft YaHei", "WenQuanYi Micro Hei", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", sans-serif;
    }
  }
}
</style>
