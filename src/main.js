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
  List,
  Tab,
  Tabs,
  PullRefresh,
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
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
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
//axios请求拦截
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  //判断是否存在token
  if (token) {
    //给配置的请求头中的Authorization赋值token
    config.headers.Authorization = token
  }
  return config
})
//引入路由组件
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import User from './pages/User.vue'
import Edit from './pages/Edit.vue'
import Focus from './pages/Focus.vue'
import Comments from './pages/Comments.vue'
import Star from './pages/Star.vue'
import Index from './pages/Index.vue'
import Post from './pages/Post.vue'

import Header from './components/Header.vue'
import New from './components/New.vue'
import Input from './components/Input.vue'
import Button from './components/Button.vue'
import Info from './components/Info.vue'
import MyList from './components/List.vue'
import FocusUser from './components/FocusUser.vue'
import Content from './components/Content.vue'

//创建全局组件
Vue.component('news-login', Login)
Vue.component('news-register', Register)
Vue.component('news-user', User)
Vue.component('news-header', Header)
Vue.component('news-new', New)
Vue.component('news-input', Input)
Vue.component('news-button', Button)
Vue.component('news-info', Info)
Vue.component('news-list', MyList)
Vue.component('news-edit', Edit)
Vue.component('news-focus', Focus)
Vue.component('news-focusUser', FocusUser)
Vue.component('news-comments', Comments)
Vue.component('news-star', Star)
Vue.component('news-content', Content)
Vue.component('news-index', Index)
Vue.component('news-post', Post)
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
