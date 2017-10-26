<template>
  <div class="">
    {{ msg }} | {{ courseId }}
  </div>
</template>

<script>
export default {
  name: 'course',
  data: function () {
    return {
      msg: 'hahaha'
    }
  },
  props: ["courseId"]
}
</script>

<style scoped lang="scss">
</style>
