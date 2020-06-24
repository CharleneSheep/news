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
//引入路由组件
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Header from './components/Header.vue'
import New from './components/New.vue'
import Input from './components/Input.vue'
import Button from './components/Button.vue'
//创建全局组件
Vue.component('news-login', Login)
Vue.component('news-register', Register)
Vue.component('news-header', Header)
Vue.component('news-new', New)
Vue.component('news-input', Input)
Vue.component('news-button', Button)
//创建vue实例
new Vue({
  //挂载路由
  router,
  //渲染的模板(组件)
  render: h => h(App),
}).$mount('#app')
