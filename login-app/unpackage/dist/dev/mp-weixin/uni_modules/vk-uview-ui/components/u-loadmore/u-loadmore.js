"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-loadmore",
  emits: ["loadmore"],
  props: {
    bgColor: {
      type: String,
      default: "transparent"
    },
    icon: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: String,
      default: "28"
    },
    color: {
      type: String,
      default: "#606266"
    },
    status: {
      type: String,
      default: "loadmore"
    },
    iconType: {
      type: String,
      default: "circle"
    },
    loadText: {
      type: Object,
      default() {
        return {
          loadmore: "\u52A0\u8F7D\u66F4\u591A",
          loading: "\u6B63\u5728\u52A0\u8F7D...",
          nomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
        };
      }
    },
    isDot: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: "#b7b7b7"
    },
    marginTop: {
      type: [String, Number],
      default: 0
    },
    marginBottom: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: [String, Number],
      default: "auto"
    }
  },
  data() {
    return {
      dotText: "\u25CF"
    };
  },
  computed: {
    loadTextStyle() {
      return {
        color: this.color,
        fontSize: this.fontSize + "rpx",
        position: "relative",
        zIndex: 1,
        backgroundColor: this.bgColor
      };
    },
    cricleStyle() {
      return {
        borderColor: `#e5e5e5 #e5e5e5 #e5e5e5 ${this.circleColor}`
      };
    },
    flowerStyle() {
      return {};
    },
    showText() {
      let text = "";
      if (this.status == "loadmore")
        text = this.loadText.loadmore;
      else if (this.status == "loading")
        text = this.loadText.loading;
      else if (this.status == "nomore" && this.isDot)
        text = this.dotText;
      else
        text = this.loadText.nomore;
      return text;
    }
  },
  methods: {
    loadMore() {
      if (this.status == "loadmore")
        this.$emit("loadmore");
    }
  }
};
if (!Array) {
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  const _easycom_u_loading2 = common_vendor.resolveComponent("u-loading");
  (_easycom_u_line2 + _easycom_u_loading2)();
}
const _easycom_u_line = () => "../u-line/u-line.js";
const _easycom_u_loading = () => "../u-loading/u-loading.js";
if (!Math) {
  (_easycom_u_line + _easycom_u_loading)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      color: "#d4d4d4",
      length: "50"
    }),
    b: common_vendor.p({
      color: $props.iconColor,
      mode: $props.iconType == "circle" ? "circle" : "flower",
      show: $props.status == "loading" && $props.icon
    }),
    c: common_vendor.t($options.showText),
    d: common_vendor.s($options.loadTextStyle),
    e: common_vendor.n($props.status == "nomore" && $props.isDot == true ? "u-dot-text" : "u-more-text"),
    f: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    g: common_vendor.n($props.status == "loadmore" || $props.status == "nomore" ? "u-more" : ""),
    h: common_vendor.p({
      color: "#d4d4d4",
      length: "50"
    }),
    i: $props.bgColor,
    j: $props.marginBottom + "rpx",
    k: $props.marginTop + "rpx",
    l: _ctx.$u.addUnit($props.height)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e9906cfb"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.vue"]]);
wx.createComponent(Component);
