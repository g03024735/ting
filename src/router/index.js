import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'

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
  ]
})
