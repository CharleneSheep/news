<template>
  <div>
    <div class="input">
      <input :type="type" :placeholder="placeholder" />
      <div class="tip">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    placeholder: String
  }
}
</script>

<style lang='less' scoped>
.input {
  height: 60px;
  padding: 0 20px;
  input {
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
  }
  .tip {
    font-size: 10px;
    height: 30px;
    line-height: 30px;
    display: none;
  }
}
</style>