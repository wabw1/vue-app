"use strict";
const common_vendor = require("../../common/vendor.js");
const PostList = () => "../../components/post-list/post-list.js";
const _sfc_main = {
  components: { PostList },
  data() {
    return {
      list: [
        { name: "\u5708\u5B50" },
        { name: "\u70ED\u70B9" },
        { name: "\u6D3B\u52A8" },
        { name: "\u516C\u544A" },
        { name: "\u8BDD\u9898" }
      ],
      current: 0,
      swiperCurrent: 0,
      dx: 0
    };
  },
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 500);
  },
  methods: {
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
      console.log("\u5230\u5E95\u4E86");
    },
    change(index) {
      this.current = index;
      this.swiperCurrent = index;
    }
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
    a: common_vendor.sr("uTabs", "4c1b26cf-0"),
    b: common_vendor.o($options.change),
    c: common_vendor.p({
      activeColor: "#f29100",
      list: $data.list,
      current: $data.current,
      ["is-scroll"]: false,
      swiperWidth: "750"
    }),
    d: common_vendor.p({
      status: "loadmore",
      bgColor: "#f2f2f2"
    }),
    e: common_vendor.o((...args) => $options.reachBottom && $options.reachBottom(...args)),
    f: $data.swiperCurrent,
    g: common_vendor.o((...args) => $options.transition && $options.transition(...args)),
    h: common_vendor.o((...args) => $options.animationfinish && $options.animationfinish(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c1b26cf"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);
