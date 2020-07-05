//引入vue
import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router'
//引入路由组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import Focus from '../pages/Focus.vue'
import Comments from '../pages/Comments.vue'
import Star from '../pages/Star.vue'
import Index from '../pages/Index.vue'
import Post from '../pages/Post.vue'
//引入vant的组件
import { Toast } from 'vant'

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
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/focus',
      name: 'focus',
      component: Focus,
    },
    {
      path: '/comments',
      name: 'comments',
      component: Comments,
    },
    {
      path: '/star',
      name: 'star',
      component: Star,
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post,
    },
  ],
})
/* 导航守卫--->路由  除了登录和注册页面的跳转其它都需要守卫
  to去哪个路由组件 
  from从哪个路由组件来
  next('/路径')相当于重定向 跳转到
*/
router.beforeEach((to, from, next) => {
  let arr = ['login', 'register', 'index', 'post']
  //获取本地存储token 判断用户是否登录
  let token = localStorage.getItem('token')
  //判断是否去除了login和register页面...的其它页面
  if (arr.includes(to.name)) {
    next()
  } else {
    //判断是否登录
    if (token) {
      next()
    } else {
      Toast.fail('你还未登录哦')
      next('/login')
    }
  }
})
//导出路由
export default router
