"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-badge",
  props: {
    type: {
      type: String,
      default: "error"
    },
    size: {
      type: String,
      default: "default"
    },
    isDot: {
      type: Boolean,
      default: false
    },
    count: {
      type: [Number, String]
    },
    overflowCount: {
      type: Number,
      default: 99
    },
    showZero: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Array,
      default: () => {
        return [20, 20];
      }
    },
    absolute: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: [String, Number],
      default: "24"
    },
    color: {
      type: String,
      default: "#ffffff"
    },
    bgColor: {
      type: String,
      default: ""
    },
    isCenter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    boxStyle() {
      let style = {};
      if (this.isCenter) {
        style.top = 0;
        style.right = 0;
        style.transform = "translateY(-50%) translateX(50%)";
      } else {
        style.top = this.offset[0] + "rpx";
        style.right = this.offset[1] + "rpx";
        style.transform = "translateY(0) translateX(0)";
      }
      if (this.size == "mini") {
        style.transform = style.transform + " scale(0.8)";
      }
      return style;
    },
    showText() {
      if (this.isDot)
        return "";
      else {
        if (this.count > this.overflowCount)
          return `${this.overflowCount}+`;
        else
          return this.count;
      }
    },
    show() {
      if (this.count == 0 && this.showZero == false)
        return false;
      else
        return true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.show
  }, $options.show ? {
    b: common_vendor.t($options.showText),
    c: common_vendor.n($props.isDot ? "u-badge-dot" : ""),
    d: common_vendor.n($props.size == "mini" ? "u-badge-mini" : ""),
    e: common_vendor.n($props.type ? "u-badge--bg--" + $props.type : ""),
    f: common_vendor.s({
      top: $props.offset[0] + "rpx",
      right: $props.offset[1] + "rpx",
      fontSize: $props.fontSize + "rpx",
      position: $props.absolute ? "absolute" : "static",
      color: $props.color,
      backgroundColor: $props.bgColor
    }),
    g: common_vendor.s($options.boxStyle)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f84de764"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-badge/u-badge.vue"]]);
wx.createComponent(Component);
