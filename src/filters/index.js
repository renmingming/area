import timeAgo from 'timeAgo.js'
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
  Vue.filter('time_ago', function (val) {
    let time = new Date(val)
    let thisTime = timeAgo()
    return thisTime.format(time, 'zh_CN')
  })
}
