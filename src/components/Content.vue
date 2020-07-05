<template>
  <div class="content">
    <!-- 视频 -->
    <div class="video" v-if="item.type===2">
      <div class="title">{{item.title}}</div>
      <div class="myvideo">
        <img :src="filterUrl(item.cover[0].url)" alt />
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="author">
        {{item.user.nickname}}
        <div class="count">{{item.comments?item.comments.length:item.comment_length}}跟帖</div>
      </div>
    </div>
    <!-- 单张照片 -->
    <div class="single-img" v-else-if="item.cover.length===1">
      <div class="left">
        <div class="title">{{item.title}}</div>
        <div class="author">
          {{item.user.nickname}}
          <div class="count">{{item.comments?item.comments.length:item.comment_length}}跟帖</div>
        </div>
      </div>
      <div class="right">
        <img :src="filterUrl(item.cover[0].url)" alt />
      </div>
    </div>
    <!-- 多张照片 -->
    <div class="multi-img" v-else>
      <div class="title">{{item.title}}</div>
      <div class="imgs">
        <img :src="filterUrl(item.cover[0].url)" alt />
        <img :src="filterUrl(item.cover[1].url)" alt />
        <img :src="filterUrl(item.cover[2].url)" alt />
      </div>
      <div class="author">
        {{item.user.nickname}}
        <div class="count">{{item.comments?item.comments.length:item.comment_length}}跟帖</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    filterUrl(url) {
      //判断url是否以http开头
      if (url.startsWith('http')) {
        return url
      } else {
        return this.$axios.defaults.baseURL + url
      }
    }
  }
}
</script>
   
<style  lang='less' scoped>
.content {
  padding: 10px;
  /* 单张图片 */
  .single-img {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    padding-bottom: 10px;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: left;
      margin-right: 5px;
      .title {
        font-size: 16px;
      }
      .author {
        display: flex;
        color: #999;
        font-size: 12px;
        .count {
          margin-left: 10px;
        }
      }
    }
    .right {
      img {
        width: 115px;
        height: 80px;
        object-fit: cover;
      }
    }
  }
  /* 多张图片 */
  .multi-img {
    // margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    .title {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .imgs {
      display: flex;
      justify-self: space-around;
      margin-bottom: 10px;
      img {
        flex: 1;
        height: 80px;
        margin-right: 5px;
        object-fit: cover;
        &:nth-child(3) {
          margin-right: 0;
        }
      }
    }
    .author {
      display: flex;
      color: #999;
      font-size: 12px;
      .count {
        margin-left: 10px;
      }
    }
  }
  /* 视频 */
  .video {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    .title {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .myvideo {
      position: relative;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 140px;
      }
      i {
        position: absolute;
        color: #fff;
        font-size: 40px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgba(127, 96, 101, 0.3);
        border-radius: 50%;
      }
    }
    .author {
      display: flex;
      color: #999;
      font-size: 12px;
      .count {
        margin-left: 10px;
      }
    }
  }
}
</style>