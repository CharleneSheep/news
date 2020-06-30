<template>
  <div>
    <div class="focusUser" v-for="item in list" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL + item.head_img" alt />
      </div>
      <div class="center">
        <div class="name">{{item.nickname}}</div>
        <div class="date">{{item.create_date | dateFilter}}</div>
      </div>
      <div class="right">
        <div class="removeUser" @click="removeUser(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getFocusUser()
  },
  data() {
    return {
      //存储用户列表
      list: []
    }
  },
  methods: {
    getFocusUser() {
      let id = localStorage.getItem('id')
      //发送axios请求获取关注用户列表
      this.$axios.get(`/user_follows`).then(res => {
        if (res.data.statusCode === 200) {
          this.list = res.data.data
        } else {
          this.$toast.fail('服务器异常')
        }
      })
    },
    removeUser(id) {
      //发送axios请求
      this.$axios.get(`/user_unfollow/${id}`).then(res => {
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message)
          //重新获取关注用户列表
          this.getFocusUser()
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.focusUser {
  display: flex;
  height: 70px;
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
  .left {
    width: 70px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    margin-top: 20px;
  }
  .right {
    width: 70px;
    line-height: 70px;
    text-align: center;
    margin-top: 20px;
    .removeUser {
      width: 60px;
      height: 30px;
      background-color: #e1e1e1;
      line-height: 30px;
      border-radius: 15px;
    }
  }
}
</style>