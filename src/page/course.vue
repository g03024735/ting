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
              <h2>{{course.name}}</h2>
              <h3>{{course.author}}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
    course() {
      return this.details[this.courseId]
    }
  },
  methods: {
    ...mapActions({
      getCourseInfo: "course/detail",
    }),
    back () {
      this.$router.go(-1)
    }
  },
  components: {
    'v-cover': cover
  },
  created () {
    this.getCourseInfo(this.courseId)
  }
}
</script>

<style scoped lang="scss">
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
    }
    h3 {
      font-size: .28rem;
    }
  }
}
</style>
