<template>
  <div>
    <v-cover v-if="loading"></v-cover>
    <div v-else>
      <div class="head">
        <div class="back" @click="back">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-back"></use>
          </svg>
        </div>
        <h1> {{ title }}</h1>
      </div>
      <div class="category-container" v-for="(courseSet, initial) in sortedCourses()">
        <div class="category-head">
          <h2>{{ initial }}</h2>
        </div>
        <div class="courses">
          <div class="course" v-for="course in courseSet">
            <router-link :to="'/course/' + course._id">
              <div class="card" :style="{ backgroundImage: 'url('+ course.cover +')'}">
                <div class="card-info">
                  <h2 class="card-title">{{ course.author }}</h2>
                  <p class="card-desc">{{ course.title }}</p>
                </div>
              </div>
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
  name: 'courses',
  data: function () {
    return {
    }
  },
  props: ["category"],
  computed: {
    courses() {
      if(this.category === 'all')
        return this.all
      else if(this.category === 'mine')
        return this.mine
    },
    ...mapState('course', {
      all: state => state.all,
      mine: state => state.mine
    }),
    allcourseCount() {
      return this.all.length
    },
    myCourseCount() {
      return this.mine.length
    },
    title () {
      let _category = {
        'all': '全部课程',
        'mine': '我的课程'
      }
      return _category[this.category]
    },
    loading () {
      return (this.category === 'all' && this.allcourseCount === 0) || (this.category === 'mine' && this.myCourseCount === 0)
    }
  },
  methods: {
    ...mapActions({
      getAllCourse: "course/all",
      getMyCourse: "course/mine",
    }),
    sortedCourses() {
      let courses = {}
      for(let i = 0, course; course = this.courses[i++];){
        if(!Array.isArray(courses[course.initial]))
          courses[course.initial] = []
        courses[course.initial].push(course)
      }
      return courses
    },
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    if((this.category === 'all' && this.allcourseCount > 0) || (this.category === 'mine' && this.myCourseCount > 0))
      return
    if(this.category === 'all')
      this.getAllCourse()
    else if(this.category === 'mine')
      this.getMyCourse()
  },
  components: {
    'v-cover': cover
  }
}
</script>

<style scoped lang="scss">
.category-container {
  padding: .3rem .15rem 0;
  .category-head {
    h2 {
      margin-left: .1rem;
      font-size: .5rem;
      font-weight: 500;
    }
  }
  .courses {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .course {
      width: 33.3%;
      overflow: hidden;
      height: 3rem;
      padding: .1rem;
      .card {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        border: 1px solid #dcdcdc;
        border-left: 2px solid #dcdcdc;
        background: {
          repeat: no-repeat;
          position: center;
          size: cover;
        }
        .card-info {
          height: 30%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          background-color: rgba(212, 212, 212, 0.68);
          margin-bottom: .3rem;
          .card-title {
            font-size: .3rem;
            padding-left: .08rem;
          }
          .card-desc {
            font-size: .24rem;
            white-space: nowrap;
            padding-left: .08rem;
          }
        }
      }
    }
  }
}
</style>
