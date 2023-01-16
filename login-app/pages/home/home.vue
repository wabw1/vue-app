<template>
  <view>
    <view class="wrap">
      <view class="u-tabs-box">
        <u-tabs-swiper
          activeColor="#f29100"
          ref="uTabs"
          :list="list"
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
        <swiper-item class="swiper-item">
          <scroll-view
            scroll-y
            style="height: 100%; width: 100%; background-color: #f2f2f2;"
            refresher-enabled="true"
            :refresher-triggered="triggered"
            :refresher-threshold="100"
            refresher-background="#f2f2f2"
            @refresherpulling="onPulling"
            @refresherrefresh="onRefresh"
            @refresherrestore="onRestore"
            @refresherabort="onAbort"
            @scrolltolower="reachBottom"
          >
            <view class="page-box">
              <PostList :postList="postList"></PostList>
              <u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
// 自定义组件
import PostList from "/components/post-list/post-list.vue";
import Post from "/components/post/post.vue";
// 引入所需图片
import a1 from "@/static/images/a1.jpg";
import a2 from "@/static/images/a2.jpg";
import p1 from "@/static/images/img1.jpg";
import p3 from "@/static/images/img3.jpg";
import p4 from "@/static/images/img4.jpg";
export default {
  components: {
    PostList,
    Post
  },
  data() {
    return {
      contentTop: uni.getStorageSync("menuInfo").contentTop,
      triggered: false,
      list: [
        { name: "圈子" },
        { name: "热点" },
        { name: "活动" },
        { name: "公告" },
        { name: "话题" }
      ],
      dataSrcList: [
        {
          avaSrc: a1,
          name: "跳跳虎",
          time: "1月14日 上午12:00",
          text:
            "Lorem ipsum dolor ipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          imgSrc: "",
          thumbup: 2,
          thumbdown: 1
        },
        {
          avaSrc: a2,
          name: "辛德瑞拉",
          time: "1月11日 上午9:20",
          text: "晴朗的一天:)",
          imgSrc: p3,
          thumbup: 1,
          thumbdown: 0
        },
        {
          avaSrc: a1,
          name: "跳跳虎",
          time: "1月10日 上午7:20",
          text: "深夜收工",
          imgSrc: p4,
          thumbup: 12,
          thumbdown: 0
        },
        {
          avaSrc:
            "https://images.unsplash.com/profile-1654780721545-f705790401b8image?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
          name: "RIck",
          time: "12月1日 下午6:50",
          text: "吃下午茶啦！~",
          imgSrc:
            "https://images.unsplash.com/photo-1673868077539-9c3120f78420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
          thumbup: 35,
          thumbdown: 1
        }
      ],
      postList: [],
      current: 0,
      swiperCurrent: 0,
      dx: 0,
      loadStatus: "loadmore",
      bold: true,
      showBar: true,
      isScroll: false
    };
  },

  methods: {
    getData() {
      console.log("获取数据");
      for (let i = 0; i < 4; i++) {
        this.postList.push(this.dataSrcList[i]); //循环加载，。
      }
      this.loadStatus = "loadmore";
    },
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
    reachBottom() {
      // 先修改loadmore组件状态为loading，1s后重新加载数据
      this.loadStatus = "loading";
      setTimeout(() => {
        this.getData();
      }, 1500);
    },

    onPulling(e) {
      console.log("onpulling正在下拉", e);
      this.triggered = true;
    },
    onRefresh() {
      if (this._freshing) return;
      this._freshing = true;
      setTimeout(() => {
        this.triggered = false;
        this._freshing = false;
        // shuffle数组
        this.postList = this.postList.sort(function() {
          return 0.5 - Math.random();
        });
      }, 1500);
    },
    onRestore() {
      this.triggered = "restore"; // 需要重置
      console.error("onRestore");
    },
    onAbort() {
      console.error("onAbort");
    }
  },
  // 生命周期钩子
  onNavigationBarButtonTap(e) {
    console.log("新增");
  },
  onNavigationBarSearchInputClicked() {
    uni.navigateTo({
      url: "/pages/home/search-detail/search-detail" //跳转到搜索详情页
    });
  },
  onLoad() {
    this._freshing = false;
    this.getData(); //页面加载获取数据
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
