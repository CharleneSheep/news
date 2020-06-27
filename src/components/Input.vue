<template>
  <div>
    <div class="input">
      <input
        :class="{
          success: userResult === 'success',
          fail: userResult === 'fail',
        }"
        :type="type"
        :placeholder="placeholder"
        @input="fn"
        :value="value"
      />
      <div class="tip" v-show="userResult === 'fail'">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userResult: ''
    }
  },
  props: {
    type: String,
    placeholder: String,
    value: String,
    rule: RegExp
  },
  methods: {
    fn(e) {
      let value = e.target.value
      this.$emit('input', value)
      this.testUser(value)
    },
    testUser(value) {
      //先判断是否有rule正则表达式,因为并不是所有的都需要校验,判断一下考虑得比较全面
      if (this.rule) {
        if (this.rule.test(value)) {
          this.userResult = 'success'
          return true
        } else {
          this.userResult = 'fail'
          return false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  height: 60px;
  padding: 0 20px;
  input {
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    &.success {
      border-bottom: 1px solid green;
    }
    &.fail {
      border-bottom: 1px solid red;
    }
  }
  .tip {
    color: red;
    font-size: 10px;
    height: 30px;
    line-height: 30px;
  }
}
</style>
