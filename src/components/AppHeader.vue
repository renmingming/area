<template>
  <mu-appbar title="vue社区-明明">
    <img src="../assets/logo.png" class="logo" slot="left">
    <mu-icon-menu icon="more_vert" slot="right">
      <mu-menu-item title="菜单 1"/>
      <mu-menu-item title="菜单 2"/>
    </mu-icon-menu>
  </mu-appbar>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="scss" scoped>
.mu-appbar{
  background: #1c6132;
}
.logo{
  height: 40px;
}
</style>
