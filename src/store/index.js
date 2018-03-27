import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const pathTitleArray = [['home', 'Mini Vue社区'], ['content', '阅读帖子'], ['publish', '发布帖子'], ['people', '用户信息'], ['login', '登陆'], ['my', '个人中心']]
const state = {
  apiUrl: 'https://www.vue-js.com/api/v1/',
  headerTitle: new Map(pathTitleArray)
}

export default new Vuex.Store({
  state
})
