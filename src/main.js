//引入vue
import Vue from 'vue'
//引入根组件
import App from './App.vue'
//引入公共的less文件
import './style/base.less'
//引入字体图标
import './font/iconfont.css'
//引入lib-flexible 会自动给不同的屏幕设置html的fontsize
import 'lib-flexible'
//引入路由
import router from './router/router.js'
//引入axios
import axios from 'axios'
//引入moment
import moment from 'moment'
//引入vant的组件
import {
  Toast,
  Dialog,
  Field,
  Cell,
  CellGroup,
  Radio,
  RadioGroup,
  Uploader,
} from 'vant'
//vue全局安装toast
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Uploader)
//在vue的原型上面挂载axios方便整个项目的使用
Vue.prototype.$axios = axios
//设置基地址方便整个项目发送请求的时候不用写前面的那一串基地址
axios.defaults.baseURL = 'http://localhost:3000'
//axios响应拦截
axios.interceptors.response.use(res => {
  //状态码未401的时候提示token过期并移除localStorage的id和token
  let message = res.data.message
  let statusCode = res.data.statusCode
  if (message == '用户信息验证失败' && statusCode === 401) {
    Toast.fail('Token失效')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    //跳转到登录页面
    router.push('/login')
  }
  return res
})

//引入路由组件
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import User from './pages/User.vue'
import Edit from './pages/Edit.vue'

import Header from './components/Header.vue'
import New from './components/New.vue'
import Input from './components/Input.vue'
import Button from './components/Button.vue'
import Info from './components/Info.vue'
import List from './components/List.vue'
//创建全局组件
Vue.component('news-login', Login)
Vue.component('news-register', Register)
Vue.component('news-user', User)
Vue.component('news-header', Header)
Vue.component('news-new', New)
Vue.component('news-input', Input)
Vue.component('news-button', Button)
Vue.component('news-info', Info)
Vue.component('news-list', List)
Vue.component('news-edit', Edit)
//全局过滤器  格式化时间
Vue.filter('dateFilter', (res, type = 'YYYY-MM-DD') => {
  return moment(res).format(type)
})
//创建vue实例
new Vue({
  //挂载路由
  router,
  //渲染的模板(组件)
  render: h => h(App),
}).$mount('#app')
