<template>
  <view>
    <view class="wrap">
      <view class="u-tabs-box">
        <u-tabs-swiper
          activeColor="#82AAE3"
          ref="uTabs"
          :list="tabList"
          :current="current"
          @change="tabsChange"
          :is-scroll="false"
        ></u-tabs-swiper>
      </view>

      <swiper
        class="swiper-box"
        :current="swiperCurrent"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <!-- <swiper-item class="swiper-item">
          <scroll-view
            scroll-y
            style="height: 100%; width: 100%; background-color: #f2f2f2"
            refresher-enabled="true"
            :refresher-triggered="triggered"
            :refresher-threshold="100"
            refresher-background="#93c0ff"
            @refresherpulling="pulling"
            @refresherrefresh="refresh"
            @refresherrestore="restore"
            @refresherabort="abort"
            @scrolltolower="reachBottom"
          >
            <view class="page-box">
              <PostList :postList="postList" @modifyThumb="modifyThumb" />
              <u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item> -->
      </swiper>
    </view>
  </view>
</template>

<script>
// 自定义组件
import PostList from "/components/post-list/post-list.vue";
// import Post from "/components/post/post.vue";

import data from "@/data/db.json"; // 导入本地数据

export default {
  components: {
    PostList
    // Post
  },
  data() {
    return {
      contentTop: uni.getStorageSync("menuInfo").contentTop,
      triggered: false,
      current: 0,
      swiperCurrent: 0,
      dx: 0,
      loadStatus: "loadmore",
      bold: true,
      showBar: true,
      isScroll: false,
      dataSrcList: [],
      tabList: [],
      postList: []
    };
  },

  methods: {
    // ops:  up || down
    modifyThumb(ops, id) {
      if (ops == "up") {
        uni.showToast({
          title: "点赞成功"
        });
        this.postList.forEach(post => {
          if (post._id === id) {
            post.thumbup++;
          }
        });
      } else if (ops == "down") {
        uni.showToast({
          title: "踩了"
        });
      }
    },
    // 获取数据
    tabsChange(index) {
      this.current = index;
      this.swiperCurrent = index;
    },
    // swiper-item左右移动，通知tabs的滑块跟随移动，swiper滑动结束，分别设置tabs和swiper的状态
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },

    // 触底加载更多
    reachBottom() {},
    pulling(e) {
      this.triggered = true;
    },
    refresh() {
      if (this._freshing) return;
      this._freshing = true;
      setTimeout(() => {
        this.triggered = false;
        this._freshing = false;
        // 重新请求 allpost
        uniCloud
          .callFunction({
            name: "getAllPost"
          })
          .then(res => {
            console.log("getAllPost refresh");
            this.postList = res.result.reverse();
          });
      }, 1500);
    },
    restore() {
      this.triggered = "restore"; // 需要重置
    },
    abort() {
      console.error("onAbort");
    }
  },

  // 生命周期钩子
  onLoad() {
    console.log("on load");
    this._freshing = false;
    this.tabList = data["tabList"];

    uniCloud.callFunction({
      name: "getAllPost",
      success: res => {
        this.postList = res.result.reverse();
      },
      fail(err) {
        console.log("getpost出错了: ", err);
      }
    });
  },

  // 新增帖子, 跳转到新增页面
  onNavigationBarButtonTap(e) {
    uni.navigateTo({
      url: "/pages/createPost/createPost"
    });
  },
  onNavigationBarSearchInputClicked() {
    uni.navigateTo({
      url: "/pages/home/search-detail/search-detail" //跳转到搜索详情页
    });
  },
  // 控制下拉刷新后0.5s后恢复
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      uni.stopPullDownRefresh();
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
/* #ifndef H5  */
page {
  height: 100%;
  background-color: #f2f2f2;
}
/* #endif  */
</style>

<!-- 样式 -->
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;

  .swiper-box {
    flex: 1;
    .swiper-item {
      height: 100%;
      .page-box {
        padding-bottom: 100px;
      }
    }
  }
}
</style>
