<template>
  <div class="foot-container">
    <p>此系统仅供个人学习、研究之用，实践最新网站开发技术，禁止非法传播或用于商业用途，如果误入网站内，请自觉离开，所有内容均收集于互联网，如有侵权行为，通知后将立即删除。</p>
    <router-link to="/comment">
        <span>意见反馈</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data: function() {
    return {
    }
  }
}
</script>

<style lang="scss">
.foot-container {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  p {
    margin:{
      top: .4rem;
    }
    color: rgb(177, 177, 177);
    width: 70%;
    text-align: center;
    font-size: .2rem;
  }
  span {
    font-size: .25rem;
    vertical-align: middle;
    text-decoration: underline;
  }
}
</style>
