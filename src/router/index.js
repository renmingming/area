import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Content from '@/page/Content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/content/:id',
      name: 'content',
      component: Content
    }
  ]
})
