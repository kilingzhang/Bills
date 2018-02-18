// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 设置cookie
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
// 获取cookie、
function getCookie (name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg))
    return (arr[2])
  else
    return null
}
Vue.prototype.getCookie = getCookie
// 删除cookie
Vue.prototype.delCookie = (name) => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null)
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}

Vue.prototype.toDate = (date) => {
  // 获取当前月份
  var nowMonth = date.getMonth() + 1

  // 获取当前是几号
  var strDate = date.getDate()

  // 添加分隔符“-”
  var seperator = '-'

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = '0' + nowMonth
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }

  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  return date.getFullYear() + seperator + nowMonth + seperator + strDate
}

axios.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    // Do something with response error
    if (error.response.status === 401) {
      console.log('unauthorized, logging out ...')
      return Promise.reject(error)
    }
    return Promise.reject(error.response)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
  App},
  template: '<App/>'
})
