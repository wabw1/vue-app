"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "social-links",
  data() {
    return {};
  },
  methods: {
    loginWx() {
      common_vendor.index.showToast({
        title: "\u5FAE\u4FE1\u767B\u5F55..."
      });
    },
    loginQQ() {
      common_vendor.index.showToast({
        title: "QQ\u767B\u5F55..."
      });
    },
    loginWb() {
      common_vendor.index.showToast({
        title: "weibo\u767B\u5F55..."
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.loginWx && $options.loginWx(...args)),
    b: common_vendor.o((...args) => $options.loginQQ && $options.loginQQ(...args)),
    c: common_vendor.o((...args) => $options.loginWb && $options.loginWb(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/social-links/social-links.vue"]]);
wx.createComponent(Component);
