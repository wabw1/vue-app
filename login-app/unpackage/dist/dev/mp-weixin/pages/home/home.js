"use strict";
const common_vendor = require("../../common/vendor.js");
const PostList = () => "../../components/post-list/post-list.js";
const Post = () => "../../components/post/post.js";
const _sfc_main = {
  components: {
    PostList,
    Post
  },
  data() {
    return {
      contentTop: common_vendor.index.getStorageSync("menuInfo").contentTop,
      triggered: false,
      tabList: [
        { name: "\u5708\u5B50" },
        { name: "\u70ED\u70B9" },
        { name: "\u6D3B\u52A8" },
        { name: "\u516C\u544A" },
        { name: "\u8BDD\u9898" }
      ],
      dataSrcList: [],
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
      const that = this;
      common_vendor.index.request({
        url: "http://localhost:3000/postList",
        success(res) {
          console.log("resdata:", res.data);
          that.dataSrcList = res.data;
          for (let i = 0; i < 4; i++) {
            that.postList.push(that.dataSrcList[i]);
          }
        },
        fail(err) {
          console.log("\u8BF7\u6C42\u5931\u8D25", err);
        }
      });
      this.loadStatus = "loadmore";
    },
    tabsChange(index) {
      this.current = index;
      this.swiperCurrent = index;
    },
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
    reachBottom() {
      this.loadStatus = "loading";
      setTimeout(() => {
        this.getData();
      }, 1500);
    },
    onPulling(e) {
      console.log("onpulling\u6B63\u5728\u4E0B\u62C9", e);
      this.triggered = true;
    },
    onRefresh() {
      if (this._freshing)
        return;
      this._freshing = true;
      setTimeout(() => {
        this.triggered = false;
        this._freshing = false;
        this.postList = this.postList.sort(function() {
          return 0.5 - Math.random();
        });
      }, 1500);
    },
    onRestore() {
      this.triggered = "restore";
      console.error("onRestore");
    },
    onAbort() {
      console.error("onAbort");
    }
  },
  onNavigationBarButtonTap(e) {
    console.log("\u65B0\u589E");
  },
  onNavigationBarSearchInputClicked() {
    common_vendor.index.navigateTo({
      url: "/pages/home/search-detail/search-detail"
    });
  },
  onLoad() {
    this._freshing = false;
    this.getData();
  },
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 500);
  }
};
if (!Array) {
  const _easycom_u_tabs_swiper2 = common_vendor.resolveComponent("u-tabs-swiper");
  const _component_PostList = common_vendor.resolveComponent("PostList");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_u_tabs_swiper2 + _component_PostList + _easycom_u_loadmore2)();
}
const _easycom_u_tabs_swiper = () => "../../uni_modules/vk-uview-ui/components/u-tabs-swiper/u-tabs-swiper.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_u_tabs_swiper + _easycom_u_loadmore)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("uTabs", "07e72d3c-0"),
    b: common_vendor.o($options.tabsChange),
    c: common_vendor.p({
      activeColor: "#f29100",
      list: $data.tabList,
      current: $data.current,
      ["is-scroll"]: false
    }),
    d: common_vendor.p({
      postList: $data.postList
    }),
    e: common_vendor.p({
      status: $data.loadStatus,
      bgColor: "#f2f2f2"
    }),
    f: $data.triggered,
    g: common_vendor.o((...args) => $options.onPulling && $options.onPulling(...args)),
    h: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    i: common_vendor.o((...args) => $options.onRestore && $options.onRestore(...args)),
    j: common_vendor.o((...args) => $options.onAbort && $options.onAbort(...args)),
    k: common_vendor.o((...args) => $options.reachBottom && $options.reachBottom(...args)),
    l: $data.swiperCurrent,
    m: common_vendor.o((...args) => $options.transition && $options.transition(...args)),
    n: common_vendor.o((...args) => $options.animationfinish && $options.animationfinish(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
