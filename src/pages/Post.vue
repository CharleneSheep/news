<template>
  <div class="post">
    <div class="left">
      <i class="iconfont iconjiantou"></i>
    </div>
    <div class="center">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="right">
      <!-- red -->
      <div class="follow">已关注</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.post {
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #757575;
  .left {
    width: 40px;
    text-align: center;
  }
  .center {
    flex: 1;
    i {
      font-size: 60px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    .follow {
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      border-radius: 30px;
      border: 1px solid #ccc;
    }
    .red {
      background-color: red;
      border: none;
    }
  }
}
</style>