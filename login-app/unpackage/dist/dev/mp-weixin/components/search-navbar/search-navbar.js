"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "search-navbar",
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
  },
  methods: {
    toSearchPage() {
      common_vendor.index.navigateTo({
        url: "/pages/home/search-detail/search-detail"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight,
    b: common_vendor.p({
      type: "back",
      size: "36",
      color: "#fff"
    }),
    c: common_vendor.o((...args) => $options.toSearchPage && $options.toSearchPage(...args)),
    d: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-pencil-white",
      size: "36"
    }),
    e: $data.navBarHeight,
    f: $data.paddingRight
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/search-navbar/search-navbar.vue"]]);
wx.createComponent(Component);
