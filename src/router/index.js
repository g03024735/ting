import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Notice from '@/page/notice'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:userId',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/notice/:noticeId',
      name: 'notice',
      component: Notice,
      props: true
    }
  ]
})
