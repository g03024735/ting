<template>
  <div>
    <template v-if="isLogin">
        <v-header :title="title"></v-header>
        <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
          <swiper-slide v-for="(item, index) in notices" :key="item._id" class="swiper-box">
            <router-link :to="'/notice/' + item._id">
              <img :src="item.cover" :alt="item.title">
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
        <v-hot :courses="hots"></v-hot>
        <v-daily :voices="dailyVoices"></v-daily>
        <v-mine :courses="myParticalCourse"></v-mine>
        <v-footer></v-footer>
    </template>
    <v-cover v-else :msg="loginMsg"></v-cover>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import * as types from '../store/mutation-types'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import header from '@/components/header'
import cover from '@/components/cover'
import hot from '@/components/hot'
import daily from '@/components/daily'
import mine from '@/components/mycourse'
import footer from '@/components/footer'

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
    'v-hot': hot,
    'v-daily': daily,
    'v-mine': mine,
    'v-footer': footer,
    swiper,
    swiperSlide
  },
  computed: {
    ...mapState('notice', {
      notices: state => state.notices
    }),
    ...mapState('course', {
      hots: state => state.hot,
      mine: state => state.mine,
      myPartial: state => state.myPartial
    }),
    ...mapState('voice', {
      daily: state => state.daily
    }),
    ...mapGetters(["isLogin", "loginMsg"]),
    ...mapGetters({
      noticeCount: 'notice/count',
    }),
    myParticalCourse() {
      let _list = []
      for (let i = 0, course; course = this.mine[i++];) {
        for (let j = 0, voice; voice = this.myPartial[j++];) {
          if(course._id == voice.course) {
            _list.push({
              voice,
              course
            })
          }
        }
      }
      return _list
    },
    dailyVoices() {
      let _list = []
      for (let i = 0, course; course = this.mine[i++];) {
        for (let j = 0, voice; voice = this.daily[j++];) {
          if(course._id == voice.course) {
            _list.push({
              voice,
              course
            })
          }
        }
      }
      return _list
    }
  },
  methods: {
    ...mapActions(["login"])
  },
  created () {
    if(this.isLogin)
      return
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
