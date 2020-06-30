<template>
  <div>
    <news-header title="个人中心"></news-header>
    <news-info :user="user"></news-info>
    <news-list title="我的关注" content="关注的用户" @click="$router.push('/focus')"></news-list>
    <news-list title="我的跟帖" content="跟帖/回复" @click="$router.push('/comments')"></news-list>
    <news-list title="我的收藏" content="文章/视频"></news-list>
    <news-list title="设置" @click="$router.push('/edit')"></news-list>
    <news-list title="退出" @click="logout"></news-list>
  </div>
</template>

<script>
export default {
  created() {
    //获取登录成功后存储在本地的token和id
    let id = localStorage.getItem('id')
    let token = localStorage.getItem('token')
    //发送ajax请求获取用户完整的信息
    this.$axios.get(`/user/${id}`).then(res => {
      if (res.data.statusCode === 200) {
        this.user = res.data.data
        //提示获取信息成功
        this.$toast.success('个人信息获取成功')
      }
    })
  },
  //定义一个对象用来存储获取到的用户信息
  data() {
    return {
      user: {}
    }
  },
  methods: {
    logout() {
      //先询问是否真的要退出(使用Dialog)
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '您真的要退出账号吗?'
        })
        .then(() => {
          // on confirm
          //清除本地的token和id
          localStorage.removeItem('token')
          localStorage.removeItem('id')
          //跳转到登陆页面
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style></style>
