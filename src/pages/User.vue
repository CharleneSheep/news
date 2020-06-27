<template>
  <div>
    <news-header title="个人中心"></news-header>
    <news-info :user="user"></news-info>
    <news-list title="我的关注" content="关注的用户"></news-list>
    <news-list title="我的跟帖" content="跟帖/回复"></news-list>
    <news-list title="我的收藏" content="文章/视频"></news-list>
    <news-list title="设置"></news-list>
    <news-list title="退出"></news-list>
  </div>
</template>

<script>
export default {
  created() {
    //接收传递过来的id和token
    let id = this.$route.params.id
    let token = this.$route.params.token
    //发送ajax请求获取用户完整的信息
    this.$axios
      .get(`/user/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        if (res.data.statusCode === 200) {
          this.user = res.data.data
        }
      })
  },
  //定义一个对象用来存储获取到的用户信息
  data() {
    return {
      user: {},
    }
  },
}
</script>

<style></style>
