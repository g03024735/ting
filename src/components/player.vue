<template>
  <div>
    <div class="placeholder" :style="{ height: show ? (simplify ? '1.5rem' : '5rem') : 0  }">
    </div>
    <div v-if="show" class="player" @touchstart.stop.prevent="empty" @touchmove.stop.prevent="empty" @touchend.stop.prevent="empty">
      <audio ref="audio" preload="auto" style="display:none;" :src="currentVoice.voice.fileKey"></audio>
      <div v-if="simplify" class="player-simplify" v-on:touchstart.stop.prevent="switchCtlShow" >
        <div class="progress">
          <div class="progress-fulfil" :style="{'flex-grow': currentTime}"></div>
          <div class="remnant" :style="{'flex-grow': duration - currentTime}"></div>
        </div>
        <div class="play-simple-wrap">
          <div class="voice-cover" :style="{ backgroundImage: 'url('+ currentVoice.course.cover +')' }">
          </div>
          <div class="voice-info">
            <span class="voice-info-name">第{{ currentVoice.voice.stage }}期:{{ currentVoice.voice.title }}</span>
            <span class="voice-info-author">{{ currentVoice.course.author }} || {{ log }}</span>
          </div>
          <div class="voice-control-group">
            <svg v-if="paused" class="icon play-btn" @touchstart.stop.prevent="play">
              <use xlink:href="#icon-playfill"></use>
            </svg>
            <svg v-if="playing" class="icon top-btn" @touchstart.stop.prevent="pause">
              <use xlink:href="#icon-stop"></use>
            </svg>
            <svg class="icon next-forward" @touchstart.stop.prevent="next">
              <use xlink:href="#icon-backwardfill"></use>
            </svg>
            <svg class="icon play-list-btn">
              <use xlink:href="#icon-list"></use>
            </svg>
          </div>
        </div>
      </div>
      <div v-else class="player-complete">
        <div class="voice-ctl" id="ctl">
          <div class="voice-info-panel">
            <div class="expansion-btn-group" v-on:touchstart.stop.prevent="switchCtlShow">
              <svg class="icon-expansion" aria-hidden="true">
                <use xlink:href="#icon-back_light"></use>
              </svg>
            </div>
            <div class="img-box" :style="{ backgroundImage: 'url('+ currentVoice.course.cover +')' }">
            </div>
            <div class="voice-title">
              第{{ currentVoice.voice.stage }}期 {{ currentVoice.voice.title }}
            </div>
          </div>
          <div class="progress-wrapper">
              <span class="ticker ticker-normal">{{ currentTime | HHMMSS }}</span>
              <div class="progress">
                  <div class="bar" id="ctl-bar" ref="barCtl" @touchstart.stop.prevent="_handleJumpPosition">
                      <div class="bar-cover-ui" :style="{'flex-grow': currentTime}"></div>
                      <div class="bar-no-ui" :style="{'flex-grow': duration - currentTime}">
                          <div ref="dragCtl" id="dragDot" class="progress-drag" @touchstart.stop.prevent="_handleDragStart" @touchmove.stop.prevent="_handleDragMove" @touchend.stop.prevent="_handleDragEnd"></div>
                      </div>
                  </div>
              </div>
              <span class="duration ticker-normal">{{ duration | HHMMSS }}</span>
          </div>
          <div class="ctl-btn-group">
            <svg class="icon download-attach-btn" @touchstart.stop.prevent="downloadAttach">
              <use xlink:href="#icon-calendar"></use>
            </svg>
            <svg class="icon back-forward" @touchstart.stop.prevent="prepose">
              <use xlink:href="#icon-backwardfill"></use>
            </svg>
            <svg v-if="paused" class="icon play-btn" @touchstart.stop.prevent="play">
              <use xlink:href="#icon-playfill"></use>
            </svg>
            <svg v-if="playing" class="icon top-btn" @touchstart.stop.prevent="pause">
              <use xlink:href="#icon-stop"></use>
            </svg>
            <svg class="icon next-forward" @touchstart.stop.prevent="next">
              <use xlink:href="#icon-backwardfill"></use>
            </svg>
            <svg class="icon play-list-btn">
              <use xlink:href="#icon-list"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name:'play',
  data: function() {
    return {
      isMuted: false,
      loaded: false,
      playing: true,
      paused: false,
      currentTime: 0,
      duration: 0,
      audio: undefined,
      barCtl: undefined,
      dragCtl: undefined,
      log: 'ss'
    }
  },
  computed: {
    playercent: {
      get() {
          return this.currentTime / this.duration
      },
      set(percent) {
        this.audio.currentTime = parseInt(this.audio.duration * percent)
      }
    },
    show() {
      return (this.playing || this.paused) && this.control
    },
    control() {
      return this.voiceList.length > 0
    },
    currentVoice() {
      for(let i =0, course; course = this.courses[i++];) {
        if(course._id == this.voiceList[0].course){
          return {
            voice: this.voiceList[0],
            course
          }
        }
      }
      return {
        voice: {},
        course: {}
      }
    },
    ...mapState('course', {
      courses: state => state.mineAll
    }),
    ...mapState({
      voiceList: state => state.player.voiceList,
      simplify: state => state.player.simplify
    }),
  },
  methods: {
    empty: () => {},
    console(flag) {
      console.log('flat', flag)
    },
    play() {
      if(this.playing)
        return
      this.paused = false
      this.audio.play()
      this.playing = true
    },
    pause() {
      if(this.paused)
        return
      this.playing = false
      this.audio.pause()
      this.paused = true
    },
    mute() {
    },
    downloadAttach() {
      window.open(this.currentVoice.voice.attachKey, 'download')
    },
    ...mapMutations({
      showCtl: types.PLAYER_SHOW,
      closeCtl: types.PLAYER_CLOSE,
      switchCtlShow: types.PLAYER_SIMPLIFY_CHANGE,
      prepose: types.PLAYER_VOICE_PRE, //上一首
      next: types.PLAYER_VOICE_NEXT //下一首
    }),
    _handleLoaded() {
      this.log = this.audio.duration + "--" + this.audio.currentTime
      this.audio.play()
      this.log += '--preload:' + this.audio.preload
      this.loaded = true
      this.duration = parseInt(this.audio.duration)
    },
    _handlePlayingUI() {
      this.currentTime = parseInt(this.audio.currentTime)
    },
    _handlePlayPause(e) {
      if(e.type === 'pause' && this.paused === false && this.playing === false){
        this.currentTime = 0
        this.duration = 0
      }
    },
    _handleDragStart(e) {
      this.barCtl = this.$refs.barCtl
      this.dragCtl = this.$refs.dragCtl
      this.start = true
      this.startx = e.targetTouches[0].clientX
      this.startplayercent = this.playercent
    },
    _handleDragMove(e) {
      if (!this.start)
          return
      let current = this.startplayercent + (e.targetTouches[0].clientX - this.startx) / this.barCtl.getBoundingClientRect().width
      if (isNaN(current))
        return
      if (current < 0)
          current = 0
      if (current > 1)
          current = 1
      this.playercent = current
    },
    _handleDragEnd() {
      this.start = false
      this.startx = null
    },
    _handleJumpPosition(e) {
      this.barCtl = this.$refs.barCtl
      this.dragCtl = this.$refs.dragCtl
      this.playercent = (e.targetTouches[0].clientX - this.barCtl.getBoundingClientRect().left) / this.barCtl.getBoundingClientRect().width
    },
    init() {
      this.audio.addEventListener('loadeddata', this._handleLoaded)
      this.audio.addEventListener('timeupdate', this._handlePlayingUI)
      this.audio.addEventListener('pause', this._handlePlayPause)
      this.audio.addEventListener('play', this._handlePlayPause)
    }
  },
  mounted: function () {
    this.audio = this.$refs.audio
    this.init()
  },
  beforeDestroy: function () {
    this.audio.removeEventListener('timeupdate', this._handlePlayingUI)
    this.audio.removeEventListener('loadeddata', this._handleLoaded)
    this.audio.removeEventListener('pause', this._handlePlayPause)
    this.audio.removeEventListener('play', this._handlePlayPause)
  },
  filters: {
    HHMMSS(value) {
      let hhmmss = new Date(value * 1000).toISOString().substr(11, 8)
      return (hhmmss.indexOf('00:') === 0) ? hhmmss.substr(3) : hhmmss
    }
  }
}
</script>

<style lang="scss">
  .placeholder {
    width: 100%;
  }
  .player {
    width: 100%;
    z-index: 9998;
    position: fixed;
    overflow: hidden;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #a2a2a2;
    .player-simplify {
      height: 1.5rem;
      display: flex;
      flex-direction: column;
      background-color: rgba(#f7f7f7, 0.9);
      .progress{
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        width: 100%;
        .progress-fulfil {
          height: 3px;
          box-sizing: border-box;
          background-color: #77c5fb;
        }
        .remnant {
          height: 3px;
          box-sizing: border-box;
          background-color: #eeeeee;
        }
      }
      .play-simple-wrap {
        width: 100%;
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        align-items: center;
        padding-left: .1rem;
        .voice-cover {
          flex-shrink: 0;
          height: 1.3rem;
          width: 1.3rem;
          box-sizing: border-box;
          box-shadow: 0 0 10px 0 rgba(50, 50, 50, .31);
          background: {
            repeat: no-repeat;
            position: center;
            size: cover;
          }
        }
        .voice-info{
          flex-grow: 1;
          height: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: .15rem;
          overflow: hidden;
          .voice-info-name {
            white-space: nowrap;
            font-size: .3rem;
            font-weight: 700;
          }
          .voice-info-author {
            font-size: .25rem;
          }
        }
        .voice-control-group {
          display: flex;
          align-items: center;
          height: 1rem;
          flex-shrink: 0;
          .icon {
            width: .9rem;
            height: .9rem;
            fill: #333;
            margin: 0 .1rem;
            transform: scale(.8);
          }
          .play-list-btn {
            transform: scale(.7);
          }
          .next-forward {
            transform: rotate(-180deg);
          }
        }
      }
    }
    .player-complete {
      background-color: #f7f7f7;
      box-sizing: border-box;
      .voice-ctl {
        display: flex;
        flex-direction: column;
        padding: .1rem .16rem;
        .voice-info-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .expansion-btn-group {
            height: .5rem;
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
            .icon-expansion {
              width: .6rem;
              height: .6rem;
              fill: #333;
              transform: rotate(-90deg);
            }
          }
          .img-box {
            width: 2rem;
            height: 2rem;
            margin-bottom: .2rem;
            box-shadow: 0 0 10px 0 rgba(50, 50, 50, .31);
            background: {
              repeat: no-repeat;
              position: center;
              size: cover;
            }
          }
          .voice-title {
            font-size: .3rem;
            text-align: center;
            white-space: nowrap;
            line-height: .5rem;
            margin-bottom: .3rem;
          }
        }
        .ctl-btn-group {
          display: flex;
          align-items: center;
          height: 1rem;
          justify-content: space-around;
          .icon {
            width: .9rem;
            height: .9rem;
            fill: #333;
          }
          .back-forward {

          }
          .play-btn {
            transform: scale(1.2);
          }
          .top-btn {
            transform: scale(1.3);
          }
          .next-forward {
            transform: rotate(180deg);
          }
          .download-attach-btn {
            transform: scale(.6);
          }
          .play-list-btn {
            transform: scale(.8);
          }
        }
        .progress-wrapper {
          display: flex;
          flex-flow: row;
          align-items: center;
          .ticker {
          }
          .duration {
            text-align: right;
          }
          .ticker-normal {
            font-size: .24rem;
            color: #7d7d7d;
            width: .8rem;
          }
          .progress {
            flex-grow: 1;
            padding: 0 .1rem;
            .bar {
              width: 100%;
              box-sizing: border-box;
              display: flex;
              flex-flow: row;
              align-items: center;
              height: .1rem;
              .bar-cover-ui {
                background-color: #3c3c3c;
                height: 2px;
                order: 1;
              }
              .bar-no-ui {
                background-color: rgb(148, 148, 148);
                height: 1px;
                order: 2;
                flex-grow: 0;
                position: relative;
                .progress-drag {
                  background-color: #333;
                  width: .16rem;
                  height: .16rem;
                  position: absolute;
                  left: 0px;
                  right: 0px;
                  margin-top: -.08rem;
                  margin-left: -.08rem;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
