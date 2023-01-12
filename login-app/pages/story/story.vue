<template>
  <view class="container">
    <!-- #ifdef MP-WEIXIN  -->
    <!-- 只有小程序才需要自定义的navBar -->
    <NavBar></NavBar>
    <!-- #endif -->

    <!-- 内容区需要margin, 因为上面是fixed会脱离文档流 -->
    <view class="content-box" :style="{ marginTop: contentTop }">
      <view class="tabs">tabs</view>
      <view class="posts-box">posts</view>
    </view>
  </view>
</template>

<script>
import NavBar from '/components/navbar/navbar.vue';
export default {
  components: {
    NavBar
  },
  data() {
    return {
      contentTop: uni.getStorageSync('menuInfo').contentTop
    };
  },
  onPullDownRefresh() {
    console.log('refresh');
    setTimeout(function() {
      uni.stopPullDownRefresh();
    }, 500);
  },
  onReady() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.content-box {
  font-size: 36px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
</style>
