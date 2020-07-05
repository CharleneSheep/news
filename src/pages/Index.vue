<template>
  <div class="index">
    <div class="head">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        搜索新闻
      </div>
      <div class="right" @click="$router.push('/user')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <div class="nav">
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="item in navList" :title="item.name" :key="item.id">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :immediate-check="false"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              offset="30"
            >
              <news-content v-for="list in TabList" :key="list.name" :item="list"></news-content>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //active是tab栏的索引值
      active: 0,
      pageIndex: 1,
      pageSize: 4,
      navList: [],
      TabList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    //获取导航数据
    this.getNav()
  },
  methods: {
    async getNav() {
      let res = await this.$axios.get('/category')
      this.navList = res.data.data
      this.getTabList(this.navList[this.active].id)
    },
    //获取当前当前导航对应的内容数据
    async getTabList(id) {
      let res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          category: id
        }
      })
      if (res.data.statusCode === 200) {
        //合并数据
        this.TabList = [...this.TabList, ...res.data.data]
        //停止加载
        this.loading = false
        //停止刷新
        this.refreshing = false
      }
      if (res.data.data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad() {
      //触发onLoad会默认把loading设置为true
      //页数增加
      this.pageIndex++
      //发送请求获取这一页的数据
      this.getTabList(this.navList[this.active].id)
    },
    //下拉刷新获取当前导航对应的第一页的最新数据
    onRefresh() {
      //清空当前的数据
      this.TabList = []
      //设置页码为1
      this.pageIndex = 1
      //将finished设置为false 防止下滑刷新到底之后finished为true了 再下拉刷新的话会直接显示没有更多了
      this.finished = false
      //禁止加载更多数据,只加载当前页的
      this.loading = true
      //发送请求
      this.getTabList(this.navList[this.active].id)
    }
  },
  //对active进行监听  获取对应的数据内容
  watch: {
    active(newVal) {
      //换页了,清空之前的数据
      this.TabList = []
      //页码设置回1
      this.pageIndex = 1
      //禁止加载更多数据,只加载当前页的!!!!!
      this.loading = true
      //设置未完成加载
      this.finished = false
      //发送axios请求
      this.getTabList(this.navList[newVal].id)
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  .head {
    display: flex;
    height: 50px;
    line-height: 50px;
    background-color: #ff0000;
    padding: 0 10px;
    box-sizing: border-box;
    .left {
      width: 50px;
      i {
        color: #fff;
        font-size: 50px;
      }
    }
    .center {
      display: flex;
      flex: 1;
      width: 100%;
      color: #fff;
      font-size: 14px;
      align-items: center;
      justify-content: center;
      background-color: rgba(253, 216, 216, 0.5);
      margin: 10px 20px;
      border-radius: 15px;
    }
    .right {
      width: 50px;
      color: #fff;
      font-size: 16px;
      text-align: center;
    }
  }
}
</style>