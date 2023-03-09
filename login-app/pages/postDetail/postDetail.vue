<template>
  <view class="detail-page">
    <!-- 加个 showTitle 判断 -->
    <Post :postObj="postObj" showTitle></Post>
    <CommentList class="comment-list" :comments="comments"></CommentList>
    <view class="placeholder"></view>
    <view class="add-box">
      <input
        v-model="inputVal"
        type="text"
        class="ipt"
        placeholder="文明发言"
      />
      <uni-icons
        type="paperplane"
        class="icon"
        size="24"
        @click="sendComment"
      ></uni-icons>
    </view>
  </view>
</template>

<script>
import Post from "@/components/post/post";
export default {
  components: {
    Post
  },
  data() {
    return {
      postObj: {},
      comments: [],
      inputVal: ""
    };
  },
  methods: {
    sendComment() {
      // 简写一下
      const newComment = { ...this.comments[0] }; //复制一份, 再改一下直接 push
      newComment.text = this.inputVal;
      this.comments.unshift(newComment);
    }
  },
  onLoad(options) {
    const { id } = options;
    // 发请求获取指定 id 的 post
    uniCloud.callFunction({
      name: "getPostById",
      data: {
        id: id
      },
      success: res => {
        this.postObj = res.result.data[0];
        this.comments = this.postObj.comments;
      },
      fail: err => {
        console.log("获取post失败", err);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  // padding: 0;
}
.detail-page {
  background-color: $uni-bg-color-grey;

  .comment-list {
    margin-top: 10px;
    padding: 20rpx 20rpx 10rpx;
  }
  .placeholder {
    height: 44px;
  }
  .add-box {
    position: fixed; //固定在底部
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 6px;
    background-color: white;
    width: 100%;

    .ipt {
      flex: 1;
      height: 28px;
      padding: 8px;
      background-color: $uni-bg-color-grey;
    }
    .icon {
      width: 30px;
      margin-left: 10px;
    }
  }
}
</style>
