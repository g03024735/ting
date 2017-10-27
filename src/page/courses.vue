<template>
  <div>
    <v-cover v-if="loading"></v-cover>
    <div v-else>
      <div class="head">
        <div class="back" @click="back">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhui"></use>
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
                  <p class="card-desc">{{ course.name }}</p>
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
      msg: 'sss',
    }
  },
  props: ["category"],
  computed: {
    ...mapState('course', {
      courses: state => state.all,
      myCourses: state => state.my
    }),
    courseCount() {
      return this.courses.length
    },
    myCourseCount() {
      return this.myCourses.length
    },
    title () {
      let _category = {
        'all': '全部课程',
        'mine': '我的课程'
      }
      return _category[this.category]
    },
    loading () {
      return (this.category === 'all' && this.courseCount === 0) || (this.category === 'mine' && this.myCourseCount === 0)
    }
  },
  methods: {
    ...mapActions({
      getAllCourse: "course/all",
      getMyAllCourse: "course/myAll",
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
    if((this.category === 'all' && this.courses.length > 0) || (this.category === 'mine' && this.myCourses.length > 0))
      return
    if(this.category === 'all')
      this.getAllCourse()
    else if(this.category === 'mine')
      this.getMyAllCourse()
  },
  components: {
    'v-cover': cover
  }
}
</script>

<style scoped lang="scss">
.head {
  display: flex;
  border-bottom: 2px solid #dcdcdc;
  background-color: #ececec;
  .back {
    height: 1.1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .icon {
    margin-left: .1rem;
    width: .6rem;
    height: .6rem;
    fill: currentColor;
    vertical-align: center;
    overflow: hidden;
  }
  h1 {
    display: flex;
    align-items: center;
    font-size: .4rem;
    vertical-align: middle;
    margin-left: .3rem;
  }
}
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
