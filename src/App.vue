<template>
<div id="app">
  <transition name="fade" mode="out-in">
    <div>
      <router-view/>
      <v-player></v-player>
    </div>
  </transition>
</div>
</template>

<script>
import player from '@/components/player'

export default {
  name: 'app',
  data: function() {
    return {
    }
  },
  components: {
    'v-player': player
  }
}
</script>

<style lang="scss">
@import "./style/common.scss";
@import "./style/base.scss";

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

</style>
