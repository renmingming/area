import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/page/Home'
const Home = () => import('@/page/Home')
// import Content from '@/page/Content'
const Content = () => import('@/page/Content')
// import Login from '@/page/Login'
const Login = () => import('@/page/Login')
const My = () => import('@/page/My')
const Publish = () => import('@/page/Publish')

Vue.use(Router)

const route = new Router({
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
      component: My,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/people',
      name: 'people',
      component: My
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish,
      meta: {
        requiresAuth: true
      }
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

route.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // some检测数组中的元素是否满足指定条件
    let token = localStorage.getItem('accesstoken')
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default route
