<template>
  <div class="star">
    <news-header title="我的收藏"></news-header>
    <news-content v-for="item in list" :key="item.id" :item="item"></news-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  async created() {
    //获取数据
    let res = await this.$axios.get('/user_star')
    this.list = res.data.data
  }
}
</script>

<style>
</style>