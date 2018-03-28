<template>
  <div class="main-content">
  <!-- 个人信息 -->
    <mu-appbar>
      <mu-avatar slot="left" :src="userInfo.avatar_url" :size="60"></mu-avatar>
      <div class="userInfo">
        <div class="name list">
          {{userInfo.loginname}}&nbsp;&nbsp;&nbsp;&nbsp;
          <a class="github" :href="github">@{{userInfo.githubUsername}}</a>
        </div>
        <div class="score list">积分：{{userInfo.score}}</div>
        <div class="createTime list">注册时间：{{userInfo.create_at | time_ago}}</div>
      </div>
    </mu-appbar>
    <!-- 最近话题 -->
    <mu-list-item title="最近话题" toggleNested :open="false">
      <mu-icon slot="left" value="drafts"/>
      <mu-badge :content="userInfo.recent_topics.length" slot="after"/>
      <mu-list-item v-for="item in userInfo.recent_topics" :to="{name: 'content', params: {id: item.id}}" :key="item.id" slot="nested" :title="item.title">
        <mu-avatar slot="left" :src="item.author.avatar_url" :size="40"></mu-avatar>
        <span class="time">{{item.last_reply_at | time_ago}}</span>
      </mu-list-item>
    </mu-list-item>
    <!-- 最近回复 -->
    <mu-list-item title="最近回复" toggleNested :open="false">
      <mu-icon slot="left" value="drafts"/>
      <mu-badge :content="userInfo.recent_replies.length" slot="after"/>
      <mu-list-item v-for="item in userInfo.recent_replies" :to="{name: 'content', params: {id: item.id}}" :key="item.id" slot="nested" :title="item.title">
        <mu-avatar slot="left" :src="item.author.avatar_url" :size="40"></mu-avatar>
        <span class="time">{{item.last_reply_at | time_ago}}</span>
      </mu-list-item>
    </mu-list-item>
    <!-- 收藏列表 -->
    <mu-list-item title="收藏列表" toggleNested :open="false">
      <mu-icon slot="left" value="drafts"/>
      <mu-badge :content="userInfo.collect_topics.length" slot="after"/>
      <mu-list-item v-for="item in userInfo.collect_topics" :to="{name: 'content', params: {id: item.id}}" :key="item.id" slot="nested" :title="item.title">
        <mu-avatar slot="left" :src="item.author.avatar_url" :size="40"></mu-avatar>
        <span class="time">{{item.last_reply_at | time_ago}}</span>
      </mu-list-item>
    </mu-list-item>
    <!-- 退出按钮 -->
    <div class="btn" v-show="quitShowHide">
      <mu-raised-button label="退出" @click="cleanQuit" class="demo-raised-button"/>
    </div>
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
  computed: {
    github () {
      return 'https://github.com/' + this.userInfo.githubUsername
    },
    quitShowHide () {
      let name = localStorage.getItem('loginname')
      let paramsName = this.$route.params.username
      console.log(name)
      console.log(paramsName)
      if (name === paramsName || paramsName === '' || paramsName === null || paramsName === undefined) {
        return true
      } else {
        return false
      }
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
      if (userName === '' || userName === undefined || userName === null) {
        this.$router.push({
          'path': '/login'
        })
      }
      api.App_get(this.$store.state.apiUrl + '/user/' + userName)
        .then((res) => {
          self.userInfo = res.data
          // console.log(this.userInfo.collect_topics)
          // for (let item of this.userInfo.collect_topics)
        })
    },
    cleanQuit () {
      localStorage.removeItem('loginname')
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('user_id')
      this.$router.push({
        'path': '/login'
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
    .github{
      font-size:0.8rem;
      color:#dfdfdf;
    }
  }
  .mu-item-content{
    .time{
      position:absolute;
      right:16px;
      top:16px;
      font-size:12px;
      color:#666;
    }
  }
  .btn{
    margin:2rem 0;
    text-align:center;
  }
</style>
