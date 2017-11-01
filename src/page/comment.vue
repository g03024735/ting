<template>
  <div>
    <div class="head">
      <div class="back" @click="back">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-back"></use>
        </svg>
      </div>
      <h1></h1>
    </div>
    <div class="explanation">
      <p>所有的音视频文字资料均收集于互联网,其中不乏有侵权行为,如果侵犯了作者的版权,请下方留言,将立即删除.</p>
      <p>本系统的为我业余开发,实践最新的软件开发技术,能够与各位朋友一起探讨切磋软件技术.</p>
    </div>
    <div class="comment">
      <textarea rows="8" placeholder="您的意见" v-model="comment">
      </textarea>
      <div class="comment-btn-commit" @click="commit(userId, comment)">
        {{ btnText }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'comment',
  data: function () {
    return {
      comment:''
    }
  },
  computed: {
    ...mapGetters(["userId"]),
    ...mapGetters({
      status: 'comment/status'
    }),
    btnText () {
      return this.comment.length > 0 ? '提交' : this.status
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    commit (userId, content) {
      this.comment = ''
      this.publish({
        userId,
        content
      })
    },
    ...mapActions('comment', [
      'publish'
    ])
  }
}
</script>

<style scoped lang="scss">
.comment {
  padding: .15rem .3rem;
  textarea {
    height: 3rem;
    font-size: .35rem;
    padding: .2rem;
    background-color: white;
    border: .03rem solid #999;
    border-radius: .1rem;
    width: 100%;
    resize: none;
  }
  .comment-btn-commit {
    cursor: pointer;
    margin-top: .4rem;
    background-color: #1da0ef;
    height: .8rem;
    border-radius: .13rem;
    font-size: .4rem;
    color: white;
    line-height: .8rem;
    text-align: center;
    letter-spacing: .4rem;
  }
}
.explanation {
  padding: 1rem .5rem;
  p {
    text-indent: .6rem;
    font-size: .3rem;
    margin-bottom: .2rem;
  }
}
</style>
