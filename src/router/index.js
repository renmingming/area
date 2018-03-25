import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/page/Home'
const Home = () => import('@/page/Home')
// import Content from '@/page/Content'
const Content = () => import('@/page/Content')
// import Login from '@/page/Login'
const Login = () => import('@/page/Login')
const My = () => import('@/page/My')

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
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/people',
      name: 'people',
      component: My
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // console.log(to)
    // console.log(from)
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return {X: 0, y: 0}
    }
  }
})
