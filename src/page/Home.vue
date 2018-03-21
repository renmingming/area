<template>
  <div class="main-content">
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="all" title="全部" />
      <mu-tab value="good" title="精华" />
      <mu-tab value="weex" title="wexx" />
      <mu-tab value="share" title="分享" />
      <mu-tab value="ask" title="问答" />
      <mu-tab value="job" title="招聘" />
    </mu-tabs>
    <div class="tab-content">
      <mu-list>
        <mu-list-item v-for="item in tabData" :key="item.id">
          <mu-avatar slot="left" :src="item.author.avatar_url" :size="40"></mu-avatar>
          <div class="item-list-info">
            <div class="title">
              <span v-if="item.top" class="top">置顶</span>
              <span v-else-if="item.good" class="good">精华</span>
              <span class="category">{{item.tab | tab}}</span>
              {{item.title}}
            </div>
            <div class="info"></div>
          </div>
        </mu-list-item>
      </mu-list>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      page: 1,
      activeTab: 'all',
      url: 'https://www.vue-js.com/api/v1/topics',
      loading: false,
      scroller: null,
      tabData: []
    }
  },
  created () {
    this.getData(this.activeTab)
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
      this.getData(val)
    },
    getData (val) {
      let that = this
      axios.get(this.url, {
        params: {'tab': val}
      }).then(function (response) {
        console.log(response.data.data)
        that.tabData = response.data.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadMore () {
      this.loading = true
      let that = this
      this.page++
      axios.get(this.url, {
        params: {'tab': that.activeTab, 'page': that.page}
      }).then(function (response) {
        that.tabData = that.tabData.concat(response.data.data)
        console.log(response.data.data)
        that.loading = false
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content{
  padding-top:64px;
  height:100vh;
  overflow:auto;
  -webkit-overflow-scrolling: touch;
  .mu-tabs{
    position:fixed;
  }
  .tab-content{
    padding-top:48px;
  }
}
</style>
