<template>
  <div>
    <news-header title="我的跟帖"></news-header>
    <!-- 不要立即检查 :immediate-check='false'
        offset滚动条与底部距离小于offset时触发load事件
    -->
    <van-list
      v-model="loading "
      finished-text="没有更多了"
      @load="onLoad"
      :finished="finished"
      loading-text="火速加载中"
      :immediate-check="false"
      offset="30"
    >
      <div class="comments" v-for="item in list" :key="item.id">
        <!-- 时间 -->
        <div class="date">{{ item.create_date |dateFilter('YYYY-MM-DD hh:mm:ss') }}</div>
        <!-- 父评论 -->
        <div class="parent" v-if="item.parent">
          <div class="name">回复：{{item.parent.user.nickname}}</div>
          <div class="parentContent">{{item.parent.content}}</div>
        </div>
        <!-- 回复内容 -->
        <div class="content">{{item.content}}</div>
        <div class="post">
          <div class="page line1">{{item.post.title}}</div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 5,
      finished: false,
      loading: false
    }
  },
  created() {
    this.getComments()
  },

  /* List 组件通过loading和finished两个变量控制加载状态，当组件滚动到底部时，会触发load事件并将loading设置成true。此时可以发起异步操作并更新数据，数据更新完毕后，将loading设置成false即可。若数据已全部加载完毕，则直接将finished设置成true即可。 */
  methods: {
    getComments() {
      //获取跟帖的数据
      this.$axios
        .get('/user_comments', {
          //拼接在url后面
          params: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          if (res.data.statusCode === 200) {
            //将数据拼接[...]
            this.list = [...this.list, ...res.data.data]
            this.loading = false
            if (res.data.data.length < this.pageSize) {
              this.finished = true
            }
          }
        })
    },
    //滚动条滑动到offset:30距离底部30px的时候会触发load事件执行onLoad事件
    //load事件会将loading设置为true,在onload事件中改变页码发送axios请求获取下一页的数据
    //再将loading设置为false,滚动条距离30px的时候又会自动触发onLoad事件,又会执行load函数发送请求,默认将loading设置为true,执行完请求又再次将loading设置为false如此循环
    //使用finished来结束这个循环,判断当加载的数据条数是否小于每页显示的条数,是的话说明已经加载完了,设置finished:true
    onLoad() {
      this.pageIndex++
      this.getComments()
    }
  }
}
</script>

<style lang='less' scoped>
.comments {
  padding: 20px;
  border-bottom: 2px solid #ccc;
  .date {
    color: #999;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .parent {
    color: #999;
    padding: 10px;
    margin-bottom: 15px;
    background-color: #e4e4e4;
    .name {
      margin-bottom: 10px;
    }
  }
  .content {
    font-size: 16px;
    margin-bottom: 15px;
  }
  .post {
    display: flex;
    color: #999;
    font-size: 12px;
    justify-content: space-between;
  }
}
</style>