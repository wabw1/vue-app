"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "navbar",
  onShow() {
    console.log("\u83B7\u5F97\u7684paddingR:", this.paddingRight);
  },
  data() {
    return {
      windowHeight: common_vendor.index.getStorageSync("menuInfo").windowHeight,
      navBarHeight: "44px",
      statusBarHeight: common_vendor.index.getStorageSync("menuInfo").statusBarHeight,
      menuHeight: common_vendor.index.getStorageSync("menuInfo").menuHeight,
      menuWidth: common_vendor.index.getStorageSync("menuInfo").menuWidth,
      menuRight: common_vendor.index.getStorageSync("menuInfo").menuRight,
      contentTop: common_vendor.index.getStorageSync("menuInfo").contentTop,
      paddingRight: common_vendor.index.getStorageSync("menuInfo").paddingRight
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight,
    b: $data.navBarHeight,
    c: $data.paddingRight
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eaf4c2e5"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/navbar/navbar.vue"]]);
wx.createComponent(Component);
