<template>
  <mu-appbar :title="title">
    <img src="../assets/logo.png" class="logo" slot="left">
    <mu-icon-menu icon="more_vert" slot="right">
      <mu-menu-item to="/login" v-if="!accesstoken" title="登陆"/>
      <mu-menu-item  v-if="!accesstoken" title="注册"/>
      <mu-menu-item to="/publish" title="发布"/>
      <mu-menu-item v-if="accesstoken" @click="cleanQuit" title="退出"/>
    </mu-icon-menu>
  </mu-appbar>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'AppHeader',
  data () {
    return {
      accesstoken: ''
    }
  },
  created () {
    this.getAccesstoken()
  },
  computed: {
    ...mapState({
      title: function (state) {
        let pathName = this.$route.name
        console.log(pathName)
        return state.headerTitle.get(pathName)
      }
    })
  },
  methods: {
    getAccesstoken () {
      this.accesstoken = localStorage.getItem('accesstoken')
    },
    cleanQuit () {
      localStorage.removeItem('loginname')
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('user_id')
      this.$router.push({
        'path': '/login'
      })
    }
  },
  watch: {
    '$route': 'getAccesstoken'
  }
}
</script>

<style lang="scss" scoped>
.mu-appbar{
  position:fixed;
  top:0;
  width:100%;
  left:0;
  background: #1c6132;
  .mu-appbar-title{
    text-align: center;
  }
}
.logo{
  height: 40px;
}
</style>
