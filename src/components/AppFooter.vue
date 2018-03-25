<template>
  <mu-paper>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="home" to="/" title="首页" icon="home"/>
      <mu-bottom-nav-item value="my" to="/my" title="我的" icon="person"/>
      <mu-bottom-nav-item value="mail" title="信息" icon="email"/>
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {
      bottomNav: 'home'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .mu-paper{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
  }
</style>
