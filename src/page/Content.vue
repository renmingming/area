<template>
  <div class="main-content">
    <div class="content" v-if="contentData">
      <div class="head">
        <div class="title">
          <span v-if="contentData.top" class="top tip">置顶</span>
          <span v-else-if="contentData.good" class="good tip">精华</span>
          {{contentData.title}}
        </div>
        <div class="info">
          <span>• 发布与{{contentData.create_at | time_ago}} </span>
          <span>• 作者{{contentData.author.loginname}} </span>
          <span>• {{contentData.visit_count}}次浏览 </span>
          <span>• 来自{{contentData.tab | tab}}</span>
        </div>
        <!-- 收藏功能 -->
        <mu-checkbox v-if="accesstoken" :label="collectText" class="demo-checkbox" v-model="collect" uncheckIcon="favorite_border" checkedIcon="favorite"/>
      </div>
      <!-- 帖子内容 -->
      <div class="inner-content">
        <div v-html="contentData.content"></div>
      </div>
      <!-- 评论区域 -->
      <ul class="comment" v-if="contentData.replies.length">
        <li class="comment-head">{{contentData.replies.length}}回复</li>
        <li class="list clearfix" v-for="(item, index) in contentData.replies" :key="item.id">
          <div class="author">
            <router-link :to="{name: 'people', params: {username: item.author.loginname}}">
              <img :src="item.author.avatar_url" alt="">
            </router-link>
          </div>
          <div class="right">
            <div class="head-info">
              <router-link class="name" :to="{name: 'people', params: {username: item.author.loginname}}">{{item.author.loginname}}</router-link>
              <span class="info">{{index}}楼</span>
            </div>
            <div class="comment-content" v-html="item.content"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/axios/index.js'
export default {
  name: 'Content',
  data () {
    return {
      id: this.$route.params.id, // id
      url: this.AppConfig.host + '/v1/topic/', // 请求连接
      contentData: null,
      collect: null,
      accesstoken: ''
    }
  },
  created () {
    this.accesstoken = window.localStorage.getItem('accesstoken')
    this.setCollect()
    this.getData(this.id)
  },
  computed: {
    collectText () {
      if (this.collect) {
        this.addCollect()
        return '取消收藏'
      } else {
        this.removeCollect()
        return '收藏'
      }
    }
  },
  watch: {
    '$route': 'setCollect'
  },
  methods: {
    getData (val) {
      let self = this
      // console.log(this.$route.path)
      api.App_get(this.url + val).then((res) => {
        // console.log(res.data)
        self.contentData = res.data
        console.log(self.contentData)
      })
    },
    // 根据获取的收藏id判断初始状态
    setCollect () {
      let collectIdArr = window.localStorage.getItem('collectIdArr')
      // console.log(collectIdArr)
      // console.log(collectIdArr.indexOf(this.id))
      if (collectIdArr.indexOf(this.id) >= 0) {
        this.collect = true
      } else {
        this.collect = false
      }
    },
    removeCollect () {
      api.App_post(this.url + 'de_collect', {
        accesstoken: this.accesstoken,
        topic_id: this.id
      }).then((res) => {
        // console.log(res)
      })
    },
    // 加入收藏
    addCollect () {
      let self = this
      api.App_post(this.url + 'collect', {
        accesstoken: self.accesstoken,
        topic_id: self.id
      }).then((res) => {
        // console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-content{
    .content{
      padding:30px 20px 15px;
      .head{
        padding-bottom:12px;
        border-bottom:1px solid #e5e5e5;
        .title{
          font-size:18px;
          font-weight:bold;
          margin-bottom:3px;
          color:#333;
        }
        .info{
          span{
            dipslay:inline-block;
            color:#666;
            padding-right:5px;
          }
        }
        .tip{
          display:inline-block;
          vertical-align:top;
          padding:1px 5px;
          border-radius:3px;
          color:#fff;
          font-size:12px;
          background:#369219;
        }
        .good{
          background:#7e57c2;
        }
      }
      .inner-content{
        padding: 12px 0;
        border-bottom:#e5e5e5;
      }
      .comment{
        margin-top:12px;
        li{
          padding: 0 15px;
        }
        .comment-head{
          background:#e5e5e5;
          line-height:30px;
        }
        .list{
          padding:15px;
          border-bottom:1px solid #e5e5e5;
          .author{
            float:left;
          }
          .right{
            padding-left:60px;
            .head-info{
              .name{
                font-weight:bold;
                color:#666;
              }
              .info{
                color:#08c;
              }
            }
          }
        }
      }
    }
  }
</style>
