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
            <router-link :to="{name: 'content', params: {id: item.id}}">
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
                <span class="time count">{{item.last_reply_at | time_ago}}</span>
              </div>
            </router-link>
          </div>
        </mu-list-item>
      </mu-list>
      <mu-infinite-scroll :scroller="scroller" :loadingText="loadingText" :loading="loading" @load="loadMore" />
    </div>
  </div>
</template>

<script>
import api from '@/axios/index.js'
export default {
  name: 'Home',
  data () {
    return {
      page: 1,
      activeTab: 'all',
      url: this.AppConfig.host + '/v1/topics',
      loading: false,
      refreshing: false,
      scroller: null,
      pageList: 26, // 一次获取的数据26，不满26时不进行请求
      pageGetState: true, // 是否请求
      tabData: [],
      loadingText: '正在加载...' // 加载时显示的文字
    }
  },
  created () {
    this.getData(this.activeTab)
  },
  mounted () {
    this.scroller = this.$el
  },
  computed: {
  },
  methods: {
    // tab铁环
    handleTabChange (val) {
      this.activeTab = val
      this.pageGetState = true
      this.loadingText = '正在加载...'
      this.page = 1
      this.tabData = []
      this.refresh()
    },
    // 获取数据
    getData (val) {
      let that = this
      api.App_get(this.url, {
        params: {'tab': val}
      }).then(function (response) {
        console.log(response)
        that.tabData = response.data
        // console.log(response.data.data.length)
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 上划加载
    loadMore () {
      let that = this
      this.page++
      console.log(this.page)
      if (this.pageGetState) {
        this.loading = true
        api.App_get(this.url, {
          params: {'tab': that.activeTab, 'page': that.page}
        }).then(function (response) {
          // 先合并加载前后的数据，在去重
          that.tabData = Object.assign([...that.tabData, ...response.data])
          console.log(that.tabData)
          that.loading = false
          if (response.data.length < that.pageList) {
            that.pageGetState = false
            that.loadingText = '没有啦,你还拉啥里'
            that.loading = false
            console.log(response.data.length)
            return false
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    // 下拉刷新
    refresh () {
      this.refreshing = true
      let that = this
      api.App_get(this.url, {
        params: {'tab': that.activeTab, 'page': 1}
      }).then(function (response) {
        // that.tabData = that.tabData.concat(response.data.data) 后面得覆盖前面得
        console.log(that.tabData)
        that.tabData = Object.assign(that.tabData, response.data)
        console.log(that.tabData)
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
  .mu-tabs{
    position:fixed;
    top:56px;
  }
  .tab-content{
    padding-top:48px;
    .item-list-info{
      .title{
        color:#333;
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
          color:#666;
        }
        .count{
          padding-right:10px;
          font-size:12px;
          color:#666;
        }
        .time{
          float:right;
        }
      }
    }
  }
}
</style>
