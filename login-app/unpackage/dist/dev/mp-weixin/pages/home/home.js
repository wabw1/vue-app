"use strict";
const common_vendor = require("../../common/vendor.js");
const SearchNavBar = () => "../../components/search-navbar/search-navbar.js";
const MyTabs = () => "../../components/my-tabs/my-tabs.js";
const _sfc_main = {
  components: {
    SearchNavBar,
    MyTabs
  },
  data() {
    return {
      contentTop: common_vendor.index.getStorageSync("menuInfo").contentTop
    };
  },
  methods: {},
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
  _component_SearchNavBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.contentTop
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
