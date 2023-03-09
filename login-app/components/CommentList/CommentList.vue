<template>
  <view class="comments-box">
    <view class="title">最新评论 {{ comments.length }}</view>
    <view class="comment-list">
      <view class="comment-card" v-for="item in comments">
        <u-avatar icon="server-man" class="avatar"></u-avatar>
        <view class="username">{{ item.userName }}</view>
        <view class="text">{{ item.text }}</view>
        <view class="time"> {{ item.time }} </view>
      </view>
    </view>
  </view>
</template>

<script>
import avatar from "../../static/images/userAvatar.png";
export default {
  name: "CommentList",
  props: {
    comments: Array
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.comments-box {
  background-color: white;
  .title {
    font-size: $uni-font-size-lg;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .comment-list {
    .comment-card {
      margin-bottom: 6px;
      border-bottom: 1px solid #eeeff2;
      display: grid;
      grid-template-columns: 60px 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-areas:
        "ava  username"
        "ava  text"
        ".    time";
      .avatar {
        grid-area: ava;
      }
      .username {
        grid-area: username;
        letter-spacing: 2rpx;
        color: steelblue;
        font-weight: bold;
      }
      .text {
        grid-area: text;
      }
      .time {
        grid-area: time;
        color: $uni-text-color-grey;
      }
    }
  }
}
</style>
