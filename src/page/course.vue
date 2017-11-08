<template>
  <div>
    <v-cover v-if="loading"></v-cover>
    <div v-else class="course">
      <div class="head">
        <div class="back" @click="back">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-back"></use>
          </svg>
        </div>
        <div class="head-content">
          <div class="head-content-icon" :style="{ backgroundImage: 'url('+ course.cover +')' }"></div>
          <div class="head-content-content">
            <router-link :to="'/course/'+ course._id +'/detail'">
              <h2>{{course.title}}</h2>
              <h3>{{course.author}}</h3>
            </router-link>
          </div>
        </div>
      </div>
      <div class="voices-list-wrap">
        <div v-for="(voice, index) in voices" class="voice-item-wrap">
          <div class="voice-info">
            <h2> {{ voice.title }}</h2>
            <h3 v-if="voice.voice">{{ voice.duration | HHMMSS }}</h3>
          </div>
          <div class="voice-ctl">
            <div v-if="!!voice.voice">
              <svg v-if="playing && voiceId == voice._id" class="icon" @click="pause(voice._id)">
                <use xlink:href="#icon-stop"></use>
              </svg>
              <svg v-else class="icon" @click="play(voice._id)">
                <use xlink:href="#icon-playfill"></use>
              </svg>
            </div>
            <div v-else>
              <svg v-if="!voice.voice" class="icon" @click="downloadAttach(voice._id)">
                <use xlink:href="#icon-calendar"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import * as types from '../store/mutation-types'
import cover from '@/components/cover'

export default {
  name: 'course',
  props: ["courseId"],
  data: function () {
    return {
    }
  },
  computed: {
    loading() {
      return !this.course
    },
    ...mapState('course', {
      details: state => state.detail
    }),
    ...mapGetters(["playing", "paused", "voiceId"]),
    ...mapState('voice', {
      voiceList: state => state.voices
    }),
    course() {
      return this.details[this.courseId]
    },
    voices() {
      for(let i = 0, course; course = this.voiceList[i++];) {
        if(course.course == this.courseId){
          return course.voices
        }
      }
      return []
    }
  },
  methods: {
    ...mapActions({
      getCourseInfo: "course/detail",
      getVoiceList: "voice/list"
    }),
    back () {
      this.$router.go(-1)
    },
    play(voiceId) {
      if(voiceId == this.voiceId){
        this.$store.commit(types.PLAY)
      }else {
        this.addPlay(voiceId)
      }
    },
    ...mapMutations({
      pause: types.PAUSE,
    }),
    ...mapActions('voice', ["addPlay", "downloadAttach"])
  },
  components: {
    'v-cover': cover
  },
  created () {
    this.getCourseInfo(this.courseId)
    this.getVoiceList(this.courseId)
  }
}
</script>

<style scoped lang="scss">
.course {
  .head-content {
    width: 100%;
    height: 1.1rem;
    font-size: .3rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    padding-left: .2rem;
    .head-content-icon {
      height: 1rem;
      width: 1rem;
      border-radius: 4px;
      border: 2px solid #ccc;
      background: {
        repeat: no-repeat;
        position: center;
        size: cover;
      }
    }
    .head-content-content {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      margin-left: .28rem;
      h2 {
        font-size: .38rem;
        line-height: 140%;
      }
      h3 {
        font-size: .26rem;
        color: #999;
      }
    }
  }
  .voices-list-wrap {
    width: 100%;
    padding-top: .1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .voice-item-wrap {
      width: 95%;
      border-bottom: 0.02rem solid #eee;
      display: flex;
      .voice-info {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        padding-left: .1rem;
        h2 {
          font-size: .34rem;
          white-space: nowrap;
          line-height: 140%;
        }
        h3 {
          font-size: .26rem;
          font-weight: 600;
          color: #999;
        }
      }
      .voice-ctl {
        flex-shrink: 0;
        width: 1rem;
        height: 100%;
        margin-right: .1rem;
        line-height: .8rem;
        display: flex;
        align-items: baseline;
        justify-content: center;
        .icon {
          width: .6rem;
          height: .6rem;
          fill: rgb(83, 83, 83);
          overflow: hidden;
        }
      }
    }
  }
}
</style>
