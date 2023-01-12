<template>
  <!-- #ifdef MP-WEIXIN  -->
  <!-- 只有小程序才需要自定义的navBar -->
  <NavBar></NavBar>
  <!-- #endif -->
  <view>SearchDetail</view>
</template>

<script>
import NavBar from '/components/navbar/navbar.vue';
export default {
  components: {
    NavBar
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style></style>
