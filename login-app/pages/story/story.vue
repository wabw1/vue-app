<template>
  <view class="container">
    <!-- #ifdef MP-WEIXIN  -->
    <!-- 只有小程序才需要自定义的navBar -->
    <NavBar></NavBar>
    <!-- #endif -->
  </view>
</template>

<script>
import NavBar from "/components/navbar/navbar.vue";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      contentTop: uni.getStorageSync("menuInfo").contentTop
    };
  },
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      uni.stopPullDownRefresh();
    }, 500);
  },
  onPullDownRefresh() {
    console.log("refresh");
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  display: flex;
  flex-direction: column;
}
</style>
