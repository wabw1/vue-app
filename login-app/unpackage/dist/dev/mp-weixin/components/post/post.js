"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "post",
  props: {
    list: Array
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
    a: common_vendor.f($props.list, (post, idx, i0) => {
      return {
        a: "560b236f-0-" + i0,
        b: common_vendor.p({
          src: post.avaSrc
        }),
        c: common_vendor.t(post.name),
        d: common_vendor.t(post.time),
        e: common_vendor.o((...args) => $options.follow && $options.follow(...args), idx),
        f: common_vendor.t(post.text),
        g: post.imgSrc,
        h: post.imgSrc,
        i: "560b236f-1-" + i0,
        j: common_vendor.t(post.thumbup),
        k: "560b236f-2-" + i0,
        l: common_vendor.t(post.thumbdown),
        m: "560b236f-3-" + i0,
        n: "560b236f-4-" + i0,
        o: idx
      };
    }),
    b: common_vendor.p({
      name: "thumb-up"
    }),
    c: common_vendor.p({
      name: "thumb-down"
    }),
    d: common_vendor.p({
      name: "chat"
    }),
    e: common_vendor.p({
      name: "zhuanfa"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/post/post.vue"]]);
wx.createComponent(Component);
