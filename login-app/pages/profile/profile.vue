<template>
  <view>
    <!-- 只要不是小程序，就得设占位区域 -->
    <!-- #ifndef MP-WEIXIN -->
    <view class="status_bar"></view>
    <!-- #endif -->
    我的
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      uni.stopPullDownRefresh();
    }, 500);
  },
  methods: {}
};
</script>

<style scoped>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
