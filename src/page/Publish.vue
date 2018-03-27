<template>
  <div class="main-content">
    <mu-text-field label="请输入标题"  :errorText="errorTxt" v-model="title" type="text" labelFloat/><br/>
    <mu-select-field v-model="checkboxName" :labelFocusClass="['label-foucs']" label="选择主题类别">
      <mu-menu-item v-for="(text,index) in list" :key="index" :value="text" :title="text | tab" />
    </mu-select-field><br/>
    <mu-text-field label="正文" v-model="editText" hintText="请输入内容" multiLine :rows="3" :rowsMax="6"/><br/>
    <!--预览-->
    <mu-flexbox-item v-html="markedText" ></mu-flexbox-item>
    <div class="btn" >
      <mu-raised-button label="发布" @click="publishText"  class="demo-raised-button"/>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import api from '@/axios/index.js'
export default {
  name: 'publish',
  data () {
    return {
      title: '',
      checkboxName: '',
      editText: '',
      errorTxt: '',
      accessToken: '',
      list: ['ask', 'share', 'job']
    }
  },
  computed: {
    markedText () {
      return marked(this.editText)
    }
  },
  created () {
    this.accessToken = localStorage.getItem('accesstoken')
  },
  methods: {
    publishText () {
      let self = this
      this.editText = marked(this.editText)
      api.App_post(this.$store.state.apiUrl + 'topics', {
        accesstoken: self.accessToken,
        title: self.title,
        tab: self.checkboxName,
        content: self.editText
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
