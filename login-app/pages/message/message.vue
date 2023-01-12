<template>
  <view>消息</view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onPullDownRefresh() {
    console.log('refresh');
    setTimeout(function() {
      uni.stopPullDownRefresh();
    }, 500);
  },
  methods: {}
};
</script>

<style></style>
