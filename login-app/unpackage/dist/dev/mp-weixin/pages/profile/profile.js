"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 500);
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dd383ca2"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/profile/profile.vue"]]);
wx.createPage(MiniProgramPage);
