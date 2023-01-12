"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-tabs",
  data() {
    return {
      list: [
        {
          name: "\u5708\u5B50"
        },
        {
          name: "\u70ED\u70B9"
        },
        {
          name: "\u6D3B\u52A8"
        },
        {
          name: "\u516C\u544A"
        },
        {
          name: "\u8BDD\u9898"
        }
      ],
      current: 0
    };
  },
  methods: {
    change(index) {
      console.log(index);
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  _easycom_u_tabs2();
}
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
if (!Math) {
  _easycom_u_tabs();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.change),
    b: common_vendor.o(($event) => $data.current = $event),
    c: common_vendor.p({
      list: $data.list,
      ["is-scroll"]: true,
      height: "80",
      modelValue: $data.current
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/my-tabs/my-tabs.vue"]]);
wx.createComponent(Component);
