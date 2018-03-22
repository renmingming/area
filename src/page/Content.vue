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
          • 发布与{{contentData.create_at | time_ago}}
          • 作者{{contentData.author.loginname}}
          • {{contentData.visit_count}}次浏览
          • 来自{{contentData.tab | tab}}
        </div>
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
      contentData: {}
    }
  },
  created () {
    this.getData(this.id)
  },
  methods: {
    getData (val) {
      let self = this
      api.App_get(this.url + val).then((res) => {
        console.log(res.data)
        self.contentData = res.data
        console.log(self.contentData)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-content{
    .content{
      padding:15px 20px;
    }
  }
</style>
