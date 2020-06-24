//引入vue
import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router'
//引入路由组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
//使用路由
Vue.use(VueRouter)
//创建路由
const router = new VueRouter({
  //规则
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
  ],
})
//导出路由
export default router
