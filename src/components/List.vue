<template>
  <div class="list">
    <div class="left">{{title}}</div>
    <div class="center">{{content}}</div>
    <div class="right">
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
    }
  }
}
</script>

<style lang='less' scoped>
.list {
  display: flex;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  margin-left: 20px;
  font-size: 14px;
  .left {
    flex: 2;
    color: #404040;
  }
  .center {
    flex: 6;
    color: #999;
    text-align: right;
  }
  .right {
    flex: 2;
    text-align: center;
  }
}
</style>