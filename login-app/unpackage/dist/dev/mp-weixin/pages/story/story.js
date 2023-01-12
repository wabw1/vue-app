"use strict";
const common_vendor = require("../../common/vendor.js");
const NavBar = () => "../../components/navbar/navbar.js";
const _sfc_main = {
  components: {
    NavBar
  },
  data() {
    return {
      contentTop: common_vendor.index.getStorageSync("menuInfo").contentTop
    };
  },
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 500);
  },
  onReady() {
  },
  methods: {}
};
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  _component_NavBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.contentTop
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fd6d2232"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/story/story.vue"]]);
wx.createPage(MiniProgramPage);
