<template>
  <view class="container">
    <!-- 小程序自定义的navBar -->
    <!-- #ifdef MP-WEIXIN  -->
    <SearchNavBar></SearchNavBar>
    <!-- #endif -->

    <!-- 非MP-WX，contentTop为undefined，因此样式不起作用，所以无需再做条件编译 -->
    <view class="content-box" :style="{ marginTop: contentTop }">
      <!-- 顶部选项卡tabbar -->
      首页
    </view>
  </view>
</template>

<script>
import SearchNavBar from '/components/search-navbar/search-navbar.vue';
import MyTabs from '/components/my-tabs/my-tabs.vue';
export default {
  components: {
    SearchNavBar,
    MyTabs
  },
  data() {
    return {
      contentTop: uni.getStorageSync('menuInfo').contentTop
    };
  },
  methods: {},
  onNavigationBarButtonTap(e) {
    console.log('点击了button');
  },
  onNavigationBarSearchInputClicked() {
    uni.navigateTo({
      url: '/pages/home/search-detail/search-detail' //跳转到搜索详情页
    });
  },
  // 控制下拉刷新后0.5s后恢复
  onPullDownRefresh() {
    console.log('refresh');
    setTimeout(function() {
      uni.stopPullDownRefresh();
    }, 500);
  }
};
</script>

<style lang="scss">
.content-box {
  font-size: 36px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.swiper-box {
  flex: 1;
}
.swiper-item {
  height: 100%;
}

.main {
  display: flex;
  flex-direction: column;
}

.posts-box {
  background-color: gainsboro;
  flex: 1;
}
</style>
