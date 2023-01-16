"use strict";
const common_vendor = require("../../common/vendor.js");
const Post = () => "../post/post.js";
const _sfc_main = {
  name: "post-list",
  data() {
    return {};
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
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6a24639b"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/post-list/post-list.vue"]]);
wx.createComponent(Component);
