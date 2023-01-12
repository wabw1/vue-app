"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {
    loginPwd() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login-pwd"
      });
    },
    loginCaptcha() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login-sms"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title),
    b: common_vendor.o((...args) => $options.loginPwd && $options.loginPwd(...args)),
    c: common_vendor.o((...args) => $options.loginCaptcha && $options.loginCaptcha(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ddc8dd5d"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/start/start.vue"]]);
wx.createPage(MiniProgramPage);
