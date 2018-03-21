
export default function (Vue, options) {
  Vue.filter('tab', function (val) {
    switch (val) {
      case 'share':
        return '分享'
      case 'ask':
        return '问答'
      case 'job':
        return '招聘'
      default:
        return ''
    }
  })
}
