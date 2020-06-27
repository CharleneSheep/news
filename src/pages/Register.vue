<template>
  <div>
    <!-- 头部组件 -->
    <news-header title="注册"></news-header>
    <!-- new字体图标 -->
    <news-new></news-new>
    <!-- 输入框 -->
    <news-input
      type="text"
      ref="username"
      placeholder="用户名 / 手机号码"
      :user="username"
      @input="saveName"
      :rule="/^1\d{3,10}$/"
      >用户名错误</news-input
    >
    <news-input
      type="text"
      ref="nickname"
      placeholder="昵称"
      @input="savaNick"
      :user="nickname"
      :rule="/^[\u4e00-\u9fa5]{2,8}$/"
      >用户名错误</news-input
    >
    <news-input
      type="password"
      ref="password"
      @input="savePassword"
      placeholder="密码"
      :user="password"
      :rule="/^\d{3,6}$/"
      >密码错误</news-input
    >
    <!-- 提交按钮 -->
    <news-button @click="subUser">注册</news-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      nickname: '',
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
    savaNick(nickname) {
      this.nickname = nickname
    },
    subUser() {
      /* 对用户名和密码进行正则校验 */
      //ref加在组件上获得的是组件实例可以使用组件上的所有方法。
      //再校验一次用户名和密码再发送axios请求
      if (
        //只要用户名和密码有一者格式有误就不发送请求
        !this.$refs.username.testUser(this.username) ||
        !this.$refs.nickname.testUser(this.nickname) ||
        !this.$refs.password.testUser(this.password)
      )
        return
      //发送ajax请求!!挂载在原型上面的要用this.获取!!!
      this.$axios
        .post('/register', {
          username: this.username,
          nickname: this.nickname,
          password: this.password,
        })
        .then(res => {
          //查看返回结果的状态码给出对应sucess和fail样式的提示
          if (res.data.statusCode === 200) {
            this.$toast.success(res.data.message)
            //跳转到个人中心页面并传递当前的用户id和token
            this.$router.push({
              name: 'login',
              params: {
                username: this.username,
                password: this.password,
              },
            })
          } else {
            this.$toast.fail(res.data.message)
          }
        })
    },
  },
}
</script>

<style></style>
