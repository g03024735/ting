<template>
  <div class="daily-wrap">
    <div class="hd">
      <h2>{{ head }}</h2>
    </div>
    <div class="daily-voice-wrap">
      <div v-for="({voice, course}, index) in voices" class="voice-item">
        <div class="card" :style="{ backgroundImage: 'url('+ course.cover +')' }">
        </div>
        <div class="voice-title">
          <h2>
            <span v-if="!!voice.voice" >{{ voice.duration | HHMMSS }}</span>{{ voice.title }}
          </h2>
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
</template>

<script>
import { mapActions, mapGetters, mapMutations} from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'daily',
  data: function() {
    return {
      head: '今日更新'
    }
  },
  props: {
    voices: {
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
  .daily-voice-wrap {
    width: 100%;
    padding: .13rem;
    .voice-item {
      width: 100%;
      height: .9rem;
      display: flex;
      overflow: hidden;
      justify-content: space-between;
      align-items: center;
      margin: .1rem 0;
      padding: 0 .05rem;
      .card {
        width: .7rem;
        height: .7rem;
        flex-shrink: 0;
        background: {
          repeat: no-repeat;
          position: center;
          size: cover;
        }
      }
      .voice-title {
        flex-grow: 1;
        overflow: hidden;
        margin-left: .2rem;
        h2 {
          font-size: .31rem;
          white-space: nowrap;
          span {
            font-size: .28rem;
            background-color: rgba(126, 126, 126, 0.27);
            padding: 0.03rem;
            border-radius: .1rem;
            margin-right: .1rem;
          }
        }
      }
      .play-ctl-wrap {
        margin-right: .1rem;
        flex-shrink: 0;
        height: 100%;
        width: .8rem;
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
