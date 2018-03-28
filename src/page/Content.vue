<template>
  <div class="main-content">
    <div class="content">
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
      <div class="inner-content">
        <div v-html="contentData.content"></div>
      </div>
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
      contentData: {},
      collect: false,
      accesstoken: ''
    }
  },
  created () {
    this.accesstoken = window.localStorage.getItem('accesstoken')
    this.getData(this.id)
  },
  computed: {
    collectText () {
      if (this.collect) {
        this.addCollect()
        return '取消收藏'
      } else {
        return '收藏'
      }
    }
  },
  watch: {
  },
  methods: {
    getData (val) {
      let self = this
      console.log(this.$route.path)
      api.App_get(this.url + val).then((res) => {
        console.log(res.data)
        self.contentData = res.data
        console.log(self.contentData)
      })
    },
    removeCollect () {},
    addCollect () {
      let self = this
      api.App_post(this.url + 'collect', {
        accesstoken: self.accesstoken,
        topic_id: self.id
      }).then((res) => {
        console.log(res)
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
    }
  }
</style>
