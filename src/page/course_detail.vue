<template>
  <div class="">
    <div class="course-detail" :style="{ backgroundImage: 'url('+ course.cover +')'}">
      <svg class="icon" @click="back" aria-hidden="true">
        <use xlink:href="#icon-back"></use>
      </svg>
      <div class="course-name">
        {{ course.name }}
      </div>
      <div class="course-title">
        {{ course.author }}
      </div>
    </div>
    <div class="course-content">
      <div class="course-content-head">
        <h2>专栏简介</h2>
      </div>
      <div class="course-content-desc">
        <p v-for="paragraph in paragraphs "> {{ paragraph }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'coursedetail',
  props: ["courseId"],
  data: function () {
    return {
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState('course', {
      details: state => state.detail
    }),
    course() {
      return this.details[this.courseId]
    },
    paragraphs () {
      return this.course && this.course.description.split("\r\n")
    }
  }
}
</script>

<style scoped lang="scss">
.course-detail {
  position: relative;
  height: 4.8rem;
  display: flex;
  flex-flow: column;
  flex-direction: column-reverse;
  background: {
    repeat: no-repeat;
    position: center;
    size: cover;
  }
  .icon {
    position: absolute;
    top: .3rem;
    left: .1rem;
    height: .7rem;
    width: .7rem;
  }
  .course-title {
    color: #fff;
    font-size: .68rem;
    padding-left: .3rem;
  }
  .course-name {
    color: #fff;
    font-size: .37rem;
    padding-left: .3rem;
    margin-bottom: .2rem;
  }
}
.course-content {
  padding: .3rem;
  .course-content-head {
    h2 {
      font-size: .4rem;
    }
  }
  .course-content-desc {
    padding-top: .2rem;
    p {
      font-size: .3rem;
      padding-bottom: .1rem;
    }
  }
}
</style>
