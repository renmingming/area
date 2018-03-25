<template>
  <mu-appbar :title="title">
    <img src="../assets/logo.png" class="logo" slot="left">
    <mu-icon-menu icon="more_vert" slot="right">
      <mu-menu-item to="/login" title="登陆"/>
      <mu-menu-item title="注册"/>
    </mu-icon-menu>
  </mu-appbar>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'AppHeader',
  computed: {
    ...mapState({
      title: function (state) {
        let pathName = this.$route.name
        console.log(pathName)
        return state.headerTitle.get(pathName)
      }
    })
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
