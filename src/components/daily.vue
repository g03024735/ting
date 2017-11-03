<template>
  <div class="daily-wrap">
    <div class="hd">
      <h2>{{ head }}</h2>
      <router-link class="more" to="/courses/all">{{ more }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'daily',
  data: function() {
    return {
      head: '今日更新',
      more: '更多'
    }
  }
}
</script>

<style lang="scss">
.daily-wrap {
  height: 4rem;
  margin-top: .1rem;
  background-color: white;
  padding: .2rem .17rem;
  .hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: .47rem;
      font-weight: 700;
    }
    .more {
      text-align: right;
      font-size: .25rem;
      font-weight: 700;
      color: #9a9a9a;
      margin-right: .1rem;
    }
  }
}
</style>
