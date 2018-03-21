<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
@import 'http://fonts.useso.com/css?family=Roboto:300,400,500,700,400italic';
@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
body{
  overflow-y:auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-height:100%;
  color: #2c3e50;
}
</style>
