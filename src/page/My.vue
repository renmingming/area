<template>
  <div class="main-content">
    <mu-appbar>
      <mu-avatar slot="left" :src="userInfo.avatar_url" :size="60"></mu-avatar>
      <div class="userInfo">
        <div class="name list">{{userInfo.loginname}}</div>
        <div class="score list">积分：{{userInfo.score}}</div>
        <div class="createTime list">注册时间：{{userInfo.create_at | time_ago}}</div>
      </div>
    </mu-appbar>
    <mu-list-item title="最近话题" toggleNested :open="false">
      <mu-icon slot="left" value="drafts"/>
      <mu-list-item v-for="item in userInfo.recent_topics" :key="item.id" slot="nested" :title="item.title"></mu-list-item>
    </mu-list-item>
    <mu-list-item title="最近回复" toggleNested :open="false">
      <mu-icon slot="left" value="drafts"/>
      <mu-list-item v-for="item in userInfo.recent_replies" :key="item.id" slot="nested" :title="item.title"></mu-list-item>
    </mu-list-item>
  </div>
</template>

<script>
import api from '@/axios/index.js'
export default {
  name: 'my',
  data () {
    return {
      userInfo: null
    }
  },
  created () {
    this.getUserInfo()
  },
  watch: {
    '$route': 'getUserInfo'
  },
  methods: {
    getUserInfo () {
      let self = this
      let userName = this.$route.params.username
      if (userName) {
        userName = this.$route.params.username
      } else {
        userName = localStorage.getItem('loginname')
      }
      api.App_get(this.$store.state.apiUrl + '/user/' + userName)
        .then((res) => {
          console.log(res)
          self.userInfo = res.data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .mu-appbar{
    height:auto;
    padding:1rem 1rem;
    background:#fff;
    img{
      border-radius:0;
    }
  }
  .userInfo{
    padding-left:0.5rem;
    .list{
      line-height:1.2rem;
      font-size:0.8rem;
      color:#333;
    }
    .name{
      font-size:1.2rem;
      margin-bottom:0.2rem;
      font-weight:600;
    }
  }
</style>
