<template>
  <div class="overlayer">
    <div class="loading" v-if="loading">
      <div><span></span></div>
      <div><span></span></div>
      <div><span></span></div>
    </div>
    <div v-else class="note">
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'cover',
  data: function() {
    return {
    }
  },
  props: ["msg"],
  computed: {
    loading() {
      return !this.msg
    }
  }
}
</script>

<style scoped lang="scss">
.overlayer{
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index:10;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  .note {
    font-size: .4rem;
  }
}
.loading{
  width: .8rem;
  height: .8rem;
  margin: 0 auto;
  position: relative;
  -webkit-animation: load 3s linear infinite;
  div {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  span {
    display: inline-block;
    width: .25rem;
    height: .25rem;
    border-radius: 50%;
    background: #99CC66;
    position: absolute;
    left: 50%;
    margin-top: -0.1rem;
    margin-left: -0.1rem;
    -webkit-animation: changeBgColor 3s ease infinite;
  }
  div {
    &:nth-child(2) {
      -webkit-transform: rotate(120deg);
    }
    &:nth-child(3) {
      -webkit-transform: rotate(240deg);
    }
    &:nth-child(2) span {
      -webkit-animation-delay: 1s;
    }
    &:nth-child(3) span {
      -webkit-animation-delay: 2s;
    }
  }
}
@-webkit-keyframes load{
  0%{
    -webkit-transform: rotate(0deg);
  }
  33.3%{
    -webkit-transform: rotate(120deg);
  }
  66.6%{
    -webkit-transform: rotate(240deg);
  }
  100%{
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes changeBgColor{
  0%,100%{
    background: #99CC66;
  }
  33.3%{
    background: #FFFF66;
  }
  66.6%{
    background: #FF6666;
  }
}
</style>
