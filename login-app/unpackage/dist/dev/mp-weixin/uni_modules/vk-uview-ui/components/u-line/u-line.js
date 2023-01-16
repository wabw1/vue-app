"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-line",
  props: {
    color: {
      type: String,
      default: "#e4e7ed"
    },
    length: {
      type: String,
      default: "100%"
    },
    direction: {
      type: String,
      default: "row"
    },
    hairLine: {
      type: Boolean,
      default: true
    },
    margin: {
      type: String,
      default: "0"
    },
    borderStyle: {
      type: String,
      default: "solid"
    }
  },
  computed: {
    lineStyle() {
      let style = {};
      style.margin = this.margin;
      if (this.direction == "row") {
        style.borderBottomWidth = "1px";
        style.borderBottomStyle = this.borderStyle;
        style.width = this.$u.addUnit(this.length);
        if (this.hairLine)
          style.transform = "scaleY(0.5)";
      } else {
        style.borderLeftWidth = "1px";
        style.borderLeftStyle = this.borderStyle;
        style.height = this.$u.addUnit(this.length);
        if (this.hairLine)
          style.transform = "scaleX(0.5)";
      }
      style.borderColor = this.color;
      return style;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.lineStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3e1cc47b"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-line/u-line.vue"]]);
wx.createComponent(Component);
