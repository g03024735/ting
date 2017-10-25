<template>
  <div>
    <template v-if="isLogin">
        <v-header :title="title" ></v-header>
        <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
          <swiper-slide v-for="(item, index) in notices" :key="item._id" class="swiper-box">
            <router-link :to="'/voice/' + item._id">
              <img :src="item.cover" :alt="item.title">
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
    </template>
    <v-cover v-else :msg="errorMsg"></v-cover>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import header from '@/components/header'
import cover from '@/components/cover'

require('swiper/dist/css/swiper.css')

export default {
  name: 'home',
  data () {
    return {
      title: 'ting',
      notNextTick: true,
      swiperOption: {
        autoplay: 2000,
        direction: 'horizontal',
        speed: 500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        observeParents: true,
        scrollbarHide: true,
        scrollbar:'.swiper-scrollbar'
      }
    }
  },
  props:["userId"],
  components: {
    'v-header': header,
    'v-cover': cover,
    swiper,
    swiperSlide
  },
  computed: {
    ...mapState('notice', {
      notices: state => state.notices
    }),
    ...mapGetters(["isLogin", "errorMsg"]),
    ...mapGetters({
      noticeCount: 'notice/count'
    })
  },
  methods: {
    ...mapActions(["login"])
  },
  created () {
    this.login({
      userId: this.userId
    })
  }
}
</script>

<style scoped lang="scss">
.swiper-box {
  margin-top: 1px;
  height: 3.5rem;
  img {
    width: 100%;
  }
}
</style>
