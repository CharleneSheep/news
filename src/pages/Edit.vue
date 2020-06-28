<template>
  <div>
    <news-header title="编辑资料"></news-header>
    <div class="user_head">
      <img :src="$axios.defaults.baseURL + user.head_img" alt />
      <!-- 修改头像 -->
      <van-uploader :after-read="afterRead" />
    </div>

    <news-list title="昵称" :content="user.nickname" @click="showNickname"></news-list>
    <!-- 昵称弹出框 -->
    <van-dialog @confirm="sureNickname" v-model="nickname_show" title="编辑昵称" show-cancel-button>
      <van-cell-group>
        <van-field v-model="nickname" label="昵称" placeholder="请输入用户名" />
      </van-cell-group>
    </van-dialog>
    <news-list title="密码" content="******"></news-list>
    <news-list title="性别" :content="user.gender===1?'男':'女'" @click="showGender"></news-list>
    <!-- 性别弹出框 -->
    <van-dialog @confirm="sureGender" v-model="gender_show" title="编辑性别" show-cancel-button>
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      nickname_show: false,
      gender_show: false,
      nickname: '',
      gender: ''
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    afterRead(file) {
      let id = localStorage.getItem('id')
      let token = localStorage.getItem('token')
      let formdate = new FormData()
      formdate.append('file', file.file)
      //上传图片
      this.$axios
        .post('/upload', formdate, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          let data = {
            head_img: res.data.data.url
          }
          this.editUser(data)
        })
      //上传用户信息
    },
    getUser() {
      //根据本地存储的id和token
      let id = localStorage.getItem('id')
      let token = localStorage.getItem('token')
      //发送axios请求获取完整的用户信息
      this.$axios
        .get(`/user/${id}`, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          this.user = res.data.data
        })
    },
    showNickname() {
      this.nickname_show = true
      this.nickname = this.user.nickname
    },
    showGender() {
      this.gender_show = true
      this.gender = this.user.gender
    },
    sureNickname() {
      let data = {
        nickname: this.nickname
      }
      this.editUser(data)
    },
    editUser(data) {
      //获取本地存储的id和token
      let id = localStorage.getItem('id')
      let token = localStorage.getItem('token')
      this.$axios
        .post(`/user_update/${id}`, data, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          this.$toast.success(res.data.message)
          this.getUser()
        })
    },
    sureGender() {
      let data = {
        gender: this.gender
      }
      //发送axios请求修改nickname
      this.editUser(data)
    }
  }
}
</script>

<style lang='less' scoped>
.user_head {
  position: relative;
  height: 70px;
  text-align: center;
  margin: 20px 0;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}
</style>