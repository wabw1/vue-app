"use strict";
const common_vendor = require("../../common/vendor.js");
const SearchNavBar = () => "../../components/search-navbar/search-navbar.js";
const MyTabs = () => "../../components/my-tabs/my-tabs.js";
const PostList = () => "../../components/post-list/post-list.js";
const _sfc_main = {
  components: {
    SearchNavBar,
    MyTabs,
    PostList
  },
  data() {
    return {
      contentTop: common_vendor.index.getStorageSync("menuInfo").contentTop,
      list: [
        { name: "\u5708\u5B50" },
        { name: "\u70ED\u70B9" },
        { name: "\u6D3B\u52A8" },
        { name: "\u516C\u544A" },
        { name: "\u8BDD\u9898" }
      ],
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
    tabsClick(e) {
      console.log(e);
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
      common_vendor.index.showToast({
        title: "\u52A0\u8F7D\u4E2D..."
      });
    }
  },
  onLoad() {
  },
  onNavigationBarButtonTap(e) {
    console.log("\u70B9\u51FB\u4E86button");
  },
  onNavigationBarSearchInputClicked() {
    common_vendor.index.navigateTo({
      url: "/pages/home/search-detail/search-detail"
    });
  },
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 500);
  }
};
if (!Array) {
  const _component_SearchNavBar = common_vendor.resolveComponent("SearchNavBar");
  const _easycom_u_tabs_swiper2 = common_vendor.resolveComponent("u-tabs-swiper");
  const _component_PostList = common_vendor.resolveComponent("PostList");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_component_SearchNavBar + _easycom_u_tabs_swiper2 + _component_PostList + _easycom_u_loadmore2)();
}
const _easycom_u_tabs_swiper = () => "../../uni_modules/vk-uview-ui/components/u-tabs-swiper/u-tabs-swiper.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_u_tabs_swiper + _easycom_u_loadmore)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("uTabs", "07e72d3c-1"),
    b: common_vendor.o($options.tabsClick),
    c: common_vendor.o($options.tabsChange),
    d: common_vendor.p({
      list: $data.list,
      current: $data.current,
      activeColor: "#7599cf",
      ["is-scroll"]: $data.isScroll,
      bold: $data.bold,
      showBar: $data.showBar
    }),
    e: common_vendor.p({
      status: $data.loadStatus,
      bgColor: "#f2f2f2"
    }),
    f: common_vendor.o((...args) => $options.reachBottom && $options.reachBottom(...args)),
    g: $data.swiperCurrent,
    h: common_vendor.o((...args) => $options.transition && $options.transition(...args)),
    i: common_vendor.o((...args) => $options.animationfinish && $options.animationfinish(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
