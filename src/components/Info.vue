<template>
  <div class="info">
    <div class="left">
      <!-- <img :src="'http://localhost:3000' + user.head_img" alt /> -->
      <img :src="$axios.defaults.baseURL + user.head_img" alt />
    </div>
    <div class="center">
      <!-- 昵称 -->
      <div class="name">
        <i v-if="user.gender === 0" class="iconfont iconxingbienv"></i>
        <i v-else class="iconfont iconxingbienan"></i>
        <span>{{ user.nickname }}</span>
      </div>
      <!-- 日期 -->
      <div class="date">{{ user.create_date | dateFilter }}</div>
    </div>
    <div class="right">
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  //接收User页面传递过来的用户信息(对象)
  props: ['user']
}
</script>

<style lang="less" scoped>
.info {
  display: flex;
  height: 100px;
  border-bottom: 3px solid #ccc;
  .left {
    flex: 3;
    text-align: center;
    img {
      width: 80%;
      height: 80%;
      border-radius: 50%;
      margin-top: 10%;
    }
  }
  .center {
    flex: 6;
    margin-left: 20px;
    .name {
      margin-top: 30px;
      i {
        margin-right: 10px;
      }
    }
    .date {
      margin-top: 10px;
    }
  }
  .right {
    flex: 2;
    text-align: center;
    line-height: 100px;
  }
}
</style>
