<template>
  <view>
    <view class="wrap">
      <view class="u-tabs-box">
        <u-tabs-swiper
          activeColor="#f29100"
          ref="uTabs"
          :list="list"
          :current="current"
          @change="change"
          :is-scroll="false"
          swiperWidth="750"
        ></u-tabs-swiper>
      </view>

      <swiper
        class="swiper-box"
        :current="swiperCurrent"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%; width: 100%" @scrolltolower="reachBottom">
            <view class="page-box" style="background-color: gold">
              <PostList></PostList>
              <u-loadmore status="loadmore" bgColor="#f2f2f2"></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import PostList from "/components/post-list/post-list.vue";
export default {
  components: { PostList },
  data() {
    return {
      list: [
        { name: "圈子" },
        { name: "热点" },
        { name: "活动" },
        { name: "公告" },
        { name: "话题" }
      ],
      current: 0,
      swiperCurrent: 0,
      dx: 0
    };
  },
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      uni.stopPullDownRefresh();
    }, 500);
  },
  methods: {
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    reachBottom() {
      console.log("到底了");
    },
    change(index) {
      this.current = index;
      this.swiperCurrent = index;
    }
  }
};
</script>

<style>
/* #ifndef H5 */
page {
  height: 100%;
  background-color: gold;
}
/* #endif */
</style>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;
  .swiper-box {
    flex: 1;
    // padding-bottom: 34rpx;
    .swiper-item {
      height: 100%;
    }
  }
}
</style>
