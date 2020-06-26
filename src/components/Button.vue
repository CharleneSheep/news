<template>
  <div>
    <div class="btn" @click="subUser">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    subUser() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="less">
.btn {
  height: 40px;
  background-color: #cc3300;
  margin: 30px 20px 0 20px;
  text-align: center;
  line-height: 40px;
  border-radius: 25px;
  color: #fff;
  cursor: pointer;
}
</style>
