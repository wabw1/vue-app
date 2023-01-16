<template>
  <view class="post">
    <view class="user-info">
      <u-avatar :src="postObj.avaSrc" class="avatar"></u-avatar>
      <view class="middle-content">
        <view class="name">{{ postObj.name }}</view> <view class="time">{{ postObj.time }}</view>
      </view>
      <button class="follow-btn" @tap="follow">关注</button>
    </view>
    <view class="post-content">
      <view class="post-text">{{ postObj.text }}</view>
      <!-- 有图片才显示，没有不显示 -->
      <image v-show="postObj.imgSrc" :src="postObj.imgSrc" class="post-img" mode="widthFix"></image>
    </view>
    <view class="btn-group">
      <view class="up">
        <u-icon name="thumb-up"></u-icon>
        {{ postObj.thumbup }}
      </view>
      <view class="down">
        <u-icon name="thumb-down"></u-icon>
        {{ postObj.thumbdown }}
      </view>
      <view class="comment">
        <u-icon name="chat"></u-icon>
        评论
      </view>
      <view class="share">
        <u-icon name="zhuanfa"></u-icon>
        分享
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "post",
  props: {
    postObj: {
      type: Object, //接受父组件传来的对象
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    follow() {
      uni.showToast({
        title: "已关注"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10rpx;
  margin-bottom: 18rpx;
  padding: 20rpx;

  .user-info {
    display: flex;
    align-items: center;
    .avatar {
      background-color: wheat;
      margin-right: 10rpx;
    }
    .middle-content {
      flex: 1;
      text-align: start;
      .name {
        font-weight: bold;
      }
      .time {
        font-size: 28rpx;
        color: $uni-text-color-grey;
      }
    }
    .follow-btn {
      background-color: $uni-color-primary;
      color: white;
      // height: 72rpx;
      line-height: 56rpx;
      width: 156rpx;
    }
  }
  .post-content {
    // background-color: lightblue;
    margin-top: 10rpx;
    text-align: start;
    .post-text {
      margin-bottom: 6rpx;
      font-size: 32rpx;

      display: -webkit-box; // 超出两行缩略
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .post-img {
      // background-color: green;
      border-radius: 8rpx;
      width: 100%;
    }
  }
  .btn-group {
    margin-top: 10rpx;
    line-height: 60rpx; //垂直对齐
    display: flex;
    justify-content: space-between;
  }
}
</style>
