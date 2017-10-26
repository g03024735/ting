<template>
  <div class="">
    <v-cover v-if="loading"></v-cover>
    {{ msg }} | {{ loading }} | {{ courseCount }}
    {{ sortedCourses() }}
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
  computed: {
    ...mapState('course', {
      courses: state => state.all
    }),
    courseCount() {
      return this.courses.length
    },
    loading () {
      return !this.courseCount
    }
  },
  methods: {
    ...mapActions({
      getAllCourse: "course/all"
    }),
    sortedCourses() {
      let courses = {}
      for(let i = 0, course; course = this.courses[i++];){
        if(!Array.isArray(courses[course.initial]))
          courses[course.initial] = []
        courses[course.initial].push(course)
      }
      return courses
    }
  },
  created () {
    if(this.courses.length > 0)
      return
    this.getAllCourse()
  },
  components: {
    'v-cover': cover
  }
}
</script>

<style scoped lang="scss">
</style>
