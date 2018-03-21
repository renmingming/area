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
      <mu-refresh-control :refreshing="refreshing" :trigger="scroller" @refresh="refresh" />
      <mu-list>
        <mu-list-item v-for="item in tabData" :key="item.id">
          <mu-avatar slot="left" :src="item.author.avatar_url" :size="40"></mu-avatar>
          <div class="item-list-info">
            <div class="title">
              <div v-if="activeTab==='all' || activeTab==='good'" class="title-tip">
                <span v-if="item.top" class="top tip">置顶</span>
                <span v-else-if="item.good" class="good tip">精华</span>
                <span v-else class="category tip">{{item.tab | tab}}</span>
              </div>
              {{item.title}}
            </div>
            <div class="info">
              <span class="author-name">{{item.author.loginname}}</span>
              <span class="count reply">回复：{{item.reply_count}}</span>
              <span class="count visit">访问量：{{item.visit_count}}</span>
            </div>
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
      refreshing: false,
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
    // tab铁环
    handleTabChange (val) {
      this.activeTab = val
      this.getData(val)
    },
    // 获取数据
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
    // 上划加载
    loadMore () {
      this.loading = true
      let that = this
      this.page++
      axios.get(this.url, {
        params: {'tab': that.activeTab, 'page': that.page}
      }).then(function (response) {
        that.tabData = Object.assign(that.tabData, response.data.data)
        console.log(response.data.data)
        that.loading = false
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 下拉刷新
    refresh () {
      this.refreshing = true
      let that = this
      axios.get(this.url, {
        params: {'tab': that.activeTab, 'page': 1}
      }).then(function (response) {
        // that.tabData = that.tabData.concat(response.data.data) 后面得覆盖前面得
        that.tabData = Object.assign(that.tabData, response.data.data)
        console.log(response.data.data)
        that.refreshing = false
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
    .item-list-info{
      .title{
        .title-tip{
          display:inline-block;
        }
        .tip{
          display:inline-block;
          padding:1px 5px;
          border-radius:3px;
          color:#fff;
          font-size:12px;
        }
        .top{
          background:#369219;
        }
        .good{
          background:#7e57c2;
        }
        .category{
          color:#666;
          background:#e2e2e2;
        }
      }
      .info{
        padding-top:5px;
        .author-name{
          padding-right:20px;
        }
        .count{
          padding-right:10px;
          font-size:12px;
          color:#666;
        }
      }
    }
  }
}
</style>
