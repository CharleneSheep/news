<template>
  <div class="head">
    <div class="left" @click="back">
      <i class="iconfont iconjiantou2"></i>
    </div>
    <div class="center">{{ title }}</div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: ''
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #757575;
  text-align: center;

  .left {
    width: 40px;
  }
  .center {
    flex: 1;
    font-size: 12px;
  }
  .right {
    width: 40px;
  }
}
</style>
