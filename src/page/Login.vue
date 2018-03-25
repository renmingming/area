<template>
  <div class="main-content">
    <div class="login">
      <mu-text-field label="请输入Access Token" hintText="Access Token" :errorText="errorTxt" v-model="token" type="text" labelFloat/>
      <br><br><br>
      <mu-raised-button label="登陆" class="demo-raised-button" @click="login" primary/>
    </div>
  </div>
</template>

<script>
import api from '@/axios/index.js'
export default {
  name: 'login',
  data () {
    return {
      token: '',
      errorTxt: ''
    }
  },
  methods: {
    login () {
      let self = this
      api.App_post(this.$store.state.apiUrl + 'accesstoken', {
        accesstoken: self.token
      }).then((res) => {
        console.log(res)
        localStorage.setItem('accesstoken', self.token)
        localStorage.setItem('loginname', res.loginname)
        localStorage.setItem('user_id', self.id)
        self.$router.push({
          'path': '/my'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    position:absolute;
    top:50%;
    left:0;
    width:100vw;
    transform:translateY(-50%);
    text-align:center;
  }
</style>
