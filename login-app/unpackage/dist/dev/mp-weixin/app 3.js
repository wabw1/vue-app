"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
const uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
require("./uni_modules/vk-uview-ui/libs/mixin/mixin.js");
require("./uni_modules/vk-uview-ui/libs/request/index.js");
require("./uni_modules/vk-uview-ui/libs/function/deepMerge.js");
require("./uni_modules/vk-uview-ui/libs/function/deepClone.js");
require("./uni_modules/vk-uview-ui/libs/function/test.js");
require("./uni_modules/vk-uview-ui/libs/function/queryParams.js");
require("./uni_modules/vk-uview-ui/libs/function/route.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFormat.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFrom.js");
require("./uni_modules/vk-uview-ui/libs/function/colorGradient.js");
require("./uni_modules/vk-uview-ui/libs/function/guid.js");
require("./uni_modules/vk-uview-ui/libs/function/color.js");
require("./uni_modules/vk-uview-ui/libs/function/type2icon.js");
require("./uni_modules/vk-uview-ui/libs/function/randomArray.js");
require("./uni_modules/vk-uview-ui/libs/function/addUnit.js");
require("./uni_modules/vk-uview-ui/libs/function/random.js");
require("./uni_modules/vk-uview-ui/libs/function/trim.js");
require("./uni_modules/vk-uview-ui/libs/function/toast.js");
require("./uni_modules/vk-uview-ui/libs/function/getParent.js");
require("./uni_modules/vk-uview-ui/libs/function/_parent.js");
require("./uni_modules/vk-uview-ui/libs/function/sys.js");
require("./uni_modules/vk-uview-ui/libs/function/debounce.js");
require("./uni_modules/vk-uview-ui/libs/function/throttle.js");
require("./uni_modules/vk-uview-ui/libs/config/config.js");
require("./uni_modules/vk-uview-ui/libs/config/zIndex.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/home/search-detail/search-detail.js";
  "./pages/story/story.js";
  "./pages/message/message.js";
  "./pages/profile/profile.js";
  "./pages/login/login-pwd.js";
  "./pages/login/login-sms.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
    common_vendor.index.getSystemInfo({
      success: (res) => {
        const statusBarHeight = res.statusBarHeight + "px";
        const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
        let menuWidth = menuButtonInfo.width + "px";
        let menuHeight = menuButtonInfo.height + "px";
        let menuBorderRadius = menuButtonInfo.height / 2 + "px";
        let menuRight = res.screenWidth - menuButtonInfo.right + "px";
        let menuTop = menuButtonInfo.top + "px";
        let contentTop = res.statusBarHeight + 44 + "px";
        let windowHeight = res.windowHeight + "px";
        let paddingRight = res.screenWidth - menuButtonInfo.left + "px";
        const menuInfo = {
          windowHeight,
          statusBarHeight,
          menuWidth,
          menuHeight,
          menuBorderRadius,
          menuRight,
          menuTop,
          contentTop,
          paddingRight
        };
        console.log("\u72B6\u6001\u680F\u9AD8\u5EA6", statusBarHeight);
        console.log("\u80F6\u56CA\u53C2\u6570", menuButtonInfo);
        console.log("paddingRight ", paddingRight);
        common_vendor.index.setStorageSync("menuInfo", menuInfo);
      },
      fail: (error) => {
        console.log(error);
      }
    });
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(uni_modules_vkUviewUi_index.uView);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
