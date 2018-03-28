<template>
  <div class="main-content">
    <mu-tabs :value="activeTab" @change="tabChange">
      <mu-tab value="editTab" title="编辑" />
      <mu-tab value="markedTab" title="预览" />
    </mu-tabs>
    <!-- 编辑部分 -->
    <div class="editTabContent" v-if="activeTab === 'editTab'">
      <mu-text-field label="请输入标题"  :errorText="errorTxt" v-model="title" type="text" labelFloat/><br/>
      <mu-select-field v-model="checkboxName" :labelFocusClass="['label-foucs']" label="选择主题类别">
        <mu-menu-item v-for="(text,index) in list" :key="index" :value="text" :title="text | tab" />
      </mu-select-field><br/>
      <mu-text-field label="正文" v-model="editText" hintText="请输入内容" multiLine :rows="3" :rowsMax="6"/><br/>
      <div class="btn" >
        <mu-raised-button label="发布" @click="publishText"  class="demo-raised-button"/>
      </div>
    </div>

    <!--预览-->
    <mu-flexbox-item v-if="activeTab === 'markedTab'" v-html="markedText" ></mu-flexbox-item>

    <!-- 提示 -->
    <mu-dialog :open="dialog" title="温馨提示：">
      {{tipMsg}}
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
  </div>
</template>

<script>
import marked from 'marked'
import api from '@/axios/index.js'
export default {
  name: 'publish',
  data () {
    return {
      activeTab: 'editTab',
      title: '',
      checkboxName: '',
      editText: '',
      errorTxt: '',
      accessToken: '',
      tipMsg: '',
      dialog: false,
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
        self.tipMsg = '发布成功'
        self.dialog = true
        console.log(res)
      })
    },
    close () {
      this.dialog = false
    },
    tabChange (val) {
      this.activeTab = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-content{
    .editTabContent{
      padding-left:20px;
      padding-right:20px;
      .mu-text-field{
        width:100%;
      }
    }
  }
</style>
