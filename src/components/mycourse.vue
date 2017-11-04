<template>
  <div class="daily-wrap">
    <div class="hd">
      <h2>{{ head }}</h2>
      <router-link class="more" to="/courses/mine">{{ more }}</router-link>
    </div>
    <div class="mycourses-wrap">
      <div v-for="({voice, course}, index) in courses" class="course-item-wrap">
        <div class="card" :style="{ backgroundImage: 'url('+ course.cover +')' }"></div>
        <div class="course-info">
          <h2>{{ course.title }}</h2>
          <h3>{{ voice.title }}</h3>
        </div>
        <div class="play-ctl-wrap">
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
import { mapActions, mapGetters, mapMutations} from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'myCourse',
  data: function() {
    return {
      head: '我的课程',
      more: '更多'
    }
  },
  props: {
    courses: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(["playing", "paused", "voiceId"]),
  },
  methods: {
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
  }
}
</script>

<style scoped lang="scss">
.daily-wrap {
  height: 100%;
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
  .mycourses-wrap {
    width: 100%;
    padding: .13rem;
    .course-item-wrap {
      width: 100%;
      height: 1.3rem;
      display: flex;
      align-items: center;
      overflow: hidden;
      margin: .1rem 0;
      .card {
        width: 1.2rem;
        height: 1.2rem;
        margin: 0 .1rem;
        background: {
          repeat: no-repeat;
          position: center;
          size: cover;
        }
      }
      .course-info {
        flex-grow: 1;
        height: 100%;
        display: flex;
        padding-left: .1rem;
        flex-direction: column;
        justify-content: center;
        h2 {
          font-size: .35rem;
          line-height: 1.7;
        }
        h3 {
          font-size: .27rem;
          line-height: 1.7;
          color: rgb(149, 149, 149)
        }
      }
      .play-ctl-wrap {
        margin-right: .2rem;
        .icon {
          width: .7rem; height: .7rem;
          vertical-align: baseline;
          fill: rgb(83, 83, 83);
          overflow: hidden;
        }
      }
    }
  }
}
</style>
