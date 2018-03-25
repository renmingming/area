<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <app-header></app-header>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
@import 'http://fonts.useso.com/css?family=Roboto:300,400,500,700,400italic';
@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
body{
  overflow-y:auto;
  font-size:16px;
}
.main-content{
  position:relative;
  padding-top:64px;
  padding-bottom:66px;
  height:100vh;
  overflow:auto;
  -webkit-overflow-scrolling: touch;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-height:100%;
  color: #2c3e50;
}
</style>
