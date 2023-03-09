<template>
  <view class="post">
    <view class="user-info">
      <u-avatar :src="postObj.avaSrc" class="avatar"></u-avatar>
      <view class="middle-content">
        <view class="name">{{ postObj.name }}</view>
        <view class="time">{{ postObj.time }}</view>
      </view>
      <button
        :class="[isFollowed ? 'follow-btn' : 'not-follow-btn']"
        @tap="follow"
      >
        {{ isFollowed ? "已关注" : "关注" }}
      </button>
    </view>

    <view class="post-content">
      <!-- 有 title 才显示 -->
      <view class="post-title" v-show="showTitle">{{ postObj.text }}</view>
      <view class="post-text">{{ postObj.text }}</view>
      <!-- 有图片才显示，没有不显示 -->
      <image
        v-show="postObj.imgSrc"
        :src="postObj.imgSrc[0]"
        class="post-img"
        mode="aspectFill"
      ></image>
    </view>

    <view class="btn-group">
      <view class="up">
        <u-icon :name="thumbupIcon" size="32" @tap="thumbUp"></u-icon>
        {{ postObj.thumbup }}
      </view>
      <view class="down">
        <u-icon :name="thumbdownIcon" size="32" @tap="thumbDown"></u-icon>
        {{ postObj.thumbdown }}
      </view>
      <view class="comment" @click="toDetailPage">
        <u-icon :name="chatIcon" bold size="32"></u-icon>
        <text v-if="postObj.comments"> {{ postObj.comments.length }} </text>
        <!-- {{ postObj.comments.length !== 0 ? postObj.comments.length : "" }} -->
      </view>
      <view class="share" @click="share">
        <u-icon :name="zhuanfaIcon" size="32"></u-icon>
        分享
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "post",
  props: {
    showTitle: {
      type: Boolean,
      default: false
    }, //判断是否显示 title
    postObj: {
      type: Object, //接受父组件传来的对象
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      thumbupIcon: "thumb-up",
      thumbdownIcon: "thumb-down",
      chatIcon: "chat",
      zhuanfaIcon: "zhuanfa",
      isFollowed: false
    };
  },
  methods: {
    share() {
      uni.showToast({
        title: "分享成功"
      });
    },
    // 路由传参
    toDetailPage() {
      console.log("id ", this.postObj._id);
      uni.navigateTo({
        url: "/pages/postDetail/postDetail?id=" + this.postObj._id
      });
    },
    follow() {
      uni.showToast({
        title: "已关注"
      });
      this.isFollowed = !this.isFollowed;
      const curId = this.postObj.user_id; //获取用户 id
      uniCloud
        .callFunction({
          name: "updateFollow",
          data: {
            userId: "63f6f299f5cf3ae5107944b1", //我
            followId: curId
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    thumbUp() {
      if (this.thumbupIcon !== "thumb-up-fill") {
        this.thumbupIcon = "thumb-up-fill";
        this.$emit("thumbup", this.postObj._id); //当前 id 作为参数传给父级
      }
    },
    thumbDown() {
      uni.showToast({
        title: "已踩"
      });
      if (this.thumbdownIcon !== "thumb-down-fill") {
        this.thumbdownIcon = "thumb-down-fill"; //改变颜色
        this.$emit("thumbdown", this.postObj.id);
        this.thumbupIcon = "thumb-up";
      }
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
  padding: 20rpx 20rpx 10rpx;

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
      background-color: $uni-text-color-disable;
      color: white;
      // height: 72rpx;
      line-height: 56rpx;
      width: 180rpx;
    }
    .not-follow-btn {
      background-color: $uni-color-primary;
      color: white;
      // height: 72rpx;
      line-height: 56rpx;
      width: 180rpx;
    }
  }
  .post-content {
    // background-color: lightblue;
    margin-top: 10rpx;
    text-align: start;
    .post-title {
      font-size: $uni-font-size-lg;
    }
    .post-text {
      margin-bottom: 6rpx;
      font-size: $uni-font-size-base;

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
      height: 300rpx;
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
