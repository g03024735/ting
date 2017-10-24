<template>
  <div class="header">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
    }
  },
  props:[ "title", ]
}
</script>

<style scoped lang="scss">
.header {
  background-color: #1da0ef;
  height: .85rem;
  display: flex;
  flex: {
    flow: row nowrap;
  }
  justify-content: center;
  align-items: center;
  span {
    font-size: .45rem;
    font-weight: 500;
    color: white;
  }
}
</style>
