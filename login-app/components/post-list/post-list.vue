<template>
  <view class="container">
    <!-- 传给子组件一整个列表 -->
    <!-- 给子组件传递postObj对象 -->
    <view class="post" v-for="(post, idx) in postList" key="idx">
      <Post :postObj="post"></Post>
    </view>
  </view>
</template>

<script>
import Post from "@/components/post/post";

export default {
  name: "post-list",
  components: {
    Post
  },
  props: {
    postList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx 20rpx 0;
}
</style>
