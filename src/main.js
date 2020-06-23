//引入vue
import Vue from 'vue'
//引入根组件
import App from './App.vue'
//引入公共的less文件
import './style/base.less'
//引入lib-flexible 会自动给不同的屏幕设置html的fontsize
import 'lib-flexible'
//创建vue实例
new Vue({
  //渲染的模板(组件)
  render: h => h(App),
}).$mount('#app')
