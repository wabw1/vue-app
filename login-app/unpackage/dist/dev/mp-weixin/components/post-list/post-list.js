"use strict";
const common_assets = require("../../common/assets.js");
const common_vendor = require("../../common/vendor.js");
const Post = () => "../post/post.js";
const _sfc_main = {
  name: "post-list",
  data() {
    return {
      postList: [
        {
          avaSrc: common_assets.a1,
          name: "\u8DF3\u8DF3\u864E",
          time: "1\u670814\u65E5 \u4E0A\u534812:00",
          text: "Lorem ipsum dolor ipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          imgSrc: "",
          thumbup: 2,
          thumbdown: 1
        },
        {
          avaSrc: common_assets.a2,
          name: "\u8F9B\u5FB7\u745E\u62C9",
          time: "1\u670811\u65E5 \u4E0A\u53489:20",
          text: "\u6674\u6717\u7684\u4E00\u5929:)",
          imgSrc: common_assets.p3,
          thumbup: 1,
          thumbdown: 0
        },
        {
          avaSrc: common_assets.a1,
          name: "\u8DF3\u8DF3\u864E",
          time: "1\u670810\u65E5 \u4E0A\u53487:20",
          text: "\u6DF1\u591C\u6536\u5DE5",
          imgSrc: common_assets.p4,
          thumbup: 12,
          thumbdown: 0
        }
      ]
    };
  },
  components: {
    Post
  }
};
if (!Array) {
  const _component_Post = common_vendor.resolveComponent("Post");
  _component_Post();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      list: $data.postList
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6a24639b"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/post-list/post-list.vue"]]);
wx.createComponent(Component);
