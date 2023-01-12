"use strict";
const common_vendor = require("../../../common/vendor.js");
const NavBar = () => "../../../components/navbar/navbar.js";
const _sfc_main = {
  components: {
    NavBar
  },
  data() {
    return {};
  },
  methods: {}
};
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  _component_NavBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/home/search-detail/search-detail.vue"]]);
wx.createPage(MiniProgramPage);
