<template>
  <!-- #ifdef MP-WEIXIN  -->
  <NavBar></NavBar>
  <!-- #endif -->
  <view>搜索结果...</view>
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
