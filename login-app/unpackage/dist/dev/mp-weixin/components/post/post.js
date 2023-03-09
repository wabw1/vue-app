"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "post",
  props: {
    postObj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    follow() {
      common_vendor.index.showToast({
        title: "\u5DF2\u5173\u6CE8"
      });
    }
  }
};
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_avatar2 + _easycom_u_icon2)();
}
const _easycom_u_avatar = () => "../../uni_modules/vk-uview-ui/components/u-avatar/u-avatar.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      src: $props.postObj.avaSrc
    }),
    b: common_vendor.t($props.postObj.name),
    c: common_vendor.t($props.postObj.time),
    d: common_vendor.o((...args) => $options.follow && $options.follow(...args)),
    e: common_vendor.t($props.postObj.text),
    f: $props.postObj.imgSrc,
    g: $props.postObj.imgSrc,
    h: common_vendor.p({
      name: "thumb-up"
    }),
    i: common_vendor.t($props.postObj.thumbup),
    j: common_vendor.p({
      name: "thumb-down"
    }),
    k: common_vendor.t($props.postObj.thumbdown),
    l: common_vendor.p({
      name: "chat"
    }),
    m: common_vendor.p({
      name: "zhuanfa"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f8ba2b3"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/post/post.vue"]]);
wx.createComponent(Component);
