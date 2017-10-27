import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Notice from '@/page/notice'
import Courses from '@/page/courses'
import Course from '@/page/course'
import Comment from '@/page/comment'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/notice/:noticeId',
      name: 'notice',
      component: Notice,
      props: true
    },
    {
      path: '/courses/:category',
      name: 'courses',
      component: Courses,
      props: true
    },
    {
      path: '/course/:courseId',
      name: 'course',
      component: Course,
      props: true
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment
    },
    {
      path: '/:userId',
      name: 'home',
      component: Home,
      props: true
    }
  ]
})
