<template>
  <div>
    <!-- 头部组件 -->
    <news-header>登录</news-header>
    <!-- new字体图标 -->
    <news-new></news-new>
    <!-- 输入框 -->
    <news-input
      ref="username"
      type="text"
      placeholder="用户名 / 手机号码"
      :user="username"
      @input="saveName"
      :rule="/^1\d{3,10}$/"
      >用户名格式错误</news-input
    >
    <news-input
      ref="password"
      type="password"
      placeholder="密码"
      :user="password"
      @input="savePassword"
      :rule="/^\d{3,6}$/"
      >密码格式错误</news-input
    >
    <!-- 提交按钮 -->
    <news-button @click="subUser">登录</news-button>
  </div>
</template>

<script>
/* 需求： 将用户名和密码的数据动态绑定在data里面以便后面的登录和注册发送数据
  v-model绑定在input组件里是不行的,因为登录和注册都是用它的数据,绑定之后登录注册都是同一个数据,修改的也是同一个数据
*/
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    saveName(name) {
      this.username = name
    },
    savePassword(password) {
      this.password = password
    },
    subUser() {
      //ref加在组件上获得的是组件实例可以使用组件上的所有方法。
      //再校验一次用户名和密码再发送axios请求
      if (
        //只要用户名和密码有一者格式有误就不发送请求
        !this.$refs.username.testUser(this.username) ||
        !this.$refs.password.testUser(this.password)
      )
        return
      //发送ajax请求！！挂载在原型上面的要用this.获取!!!
      this.$axios
        .post('/login', {
          username: this.username,
          password: this.password,
        })
        .then(res => {
          //查看返回结果的状态码给出对应sucess和fail样式的提示
          if (res.data.status === 200) {
            this.$toast.success(res.data.message)
            //跳转到个人中心页面并传递当前的用户id和token
            // this.$router.push('/user')
          } else {
            this.$toast.fail(res.data.message)
          }
        })
    },
  },
  /* 对用户名和密码进行正则校验 */
}
</script>

<style></style>
