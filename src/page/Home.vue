<template>
  <div class="main-content">
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="all" title="全部" />
      <mu-tab value="tab1" title="TAB One" />
      <mu-tab value="one" title="TAB One" />
    </mu-tabs>
    <div class="tab-content">
      <ul>
        <li v-for="item in tabData" :key="item.id">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      activeTab: 'all',
      url: 'https://www.vue-js.com/api/v1/topics?tab=all',
      tabData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
      this.url = 'https://www.vue-js.com/api/v1/topics'
      this.getData(val)
    },
    getData (val) {
      let that = this
      axios.get(this.url, {
        params: {'tab': val}
      }).then(function (response) {
        console.log(that)
        that.tabData = response.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-content{
    ul{
      li{
        padding:10px 0;
        border-top:1px solid #e5e5e5;
      }
    }
  }
</style>
