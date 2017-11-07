<template lang="html">
  <div class="welcome-wrap">
    <img src="../assets/welcome.gif" alt="welcome">
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      msg: "Hello!"
    }
  }
}
</script>

<style lang="scss">
.welcome-wrap {
  display: flex;
  align-items: center;
  img {
    width: 100%;
  }
}
</style>
