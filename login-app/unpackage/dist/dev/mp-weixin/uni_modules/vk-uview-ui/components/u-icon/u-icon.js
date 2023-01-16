"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-icon",
  emits: ["click", "touchstart"],
  props: {
    name: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    size: {
      type: [Number, String],
      default: "inherit"
    },
    bold: {
      type: Boolean,
      default: false
    },
    index: {
      type: [Number, String],
      default: ""
    },
    hoverClass: {
      type: String,
      default: ""
    },
    customPrefix: {
      type: String,
      default: "uicon"
    },
    label: {
      type: [String, Number],
      default: ""
    },
    labelPos: {
      type: String,
      default: "right"
    },
    labelSize: {
      type: [String, Number],
      default: "28"
    },
    labelColor: {
      type: String,
      default: "#606266"
    },
    marginLeft: {
      type: [String, Number],
      default: "6"
    },
    marginTop: {
      type: [String, Number],
      default: "6"
    },
    marginRight: {
      type: [String, Number],
      default: "6"
    },
    marginBottom: {
      type: [String, Number],
      default: "6"
    },
    imgMode: {
      type: String,
      default: "widthFix"
    },
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    width: {
      type: [String, Number],
      default: ""
    },
    height: {
      type: [String, Number],
      default: ""
    },
    top: {
      type: [String, Number],
      default: 0
    },
    showDecimalIcon: {
      type: Boolean,
      default: false
    },
    inactiveColor: {
      type: String,
      default: "#ececec"
    },
    percent: {
      type: [Number, String],
      default: "50"
    }
  },
  computed: {
    customClass() {
      let classes = [];
      let { customPrefix, name } = this;
      let index = name.indexOf("-icon-");
      if (index > -1) {
        customPrefix = name.substring(0, index + 5);
        classes.push(name);
      } else {
        classes.push(`${customPrefix}-${name}`);
      }
      if (customPrefix === "uicon") {
        classes.push("u-iconfont");
      } else {
        classes.push(customPrefix);
      }
      if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
        classes.push("u-icon__icon--" + this.inactiveColor);
      } else if (this.color && this.$u.config.type.includes(this.color))
        classes.push("u-icon__icon--" + this.color);
      return classes;
    },
    iconStyle() {
      let style = {};
      style = {
        fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
        fontWeight: this.bold ? "bold" : "normal",
        top: this.$u.addUnit(this.top)
      };
      if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
        style.color = this.inactiveColor;
      } else if (this.color && !this.$u.config.type.includes(this.color))
        style.color = this.color;
      return style;
    },
    isImg() {
      return this.name.indexOf("/") !== -1;
    },
    imgStyle() {
      let style = {};
      style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
      style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
      return style;
    },
    decimalIconStyle() {
      let style = {};
      style = {
        fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
        fontWeight: this.bold ? "bold" : "normal",
        top: this.$u.addUnit(this.top),
        width: this.percent + "%"
      };
      if (this.color && !this.$u.config.type.includes(this.color))
        style.color = this.color;
      return style;
    },
    decimalIconClass() {
      let classes = [];
      classes.push(this.customPrefix + "-" + this.name);
      if (this.customPrefix == "uicon") {
        classes.push("u-iconfont");
      } else {
        classes.push(this.customPrefix);
      }
      if (this.color && this.$u.config.type.includes(this.color))
        classes.push("u-icon__icon--" + this.color);
      else
        classes.push("u-icon__icon--primary");
      return classes;
    }
  },
  methods: {
    click() {
      this.$emit("click", this.index);
    },
    touchstart() {
      this.$emit("touchstart", this.index);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.isImg
  }, $options.isImg ? {
    b: $props.name,
    c: $props.imgMode,
    d: common_vendor.s($options.imgStyle)
  } : common_vendor.e({
    e: $props.showDecimalIcon
  }, $props.showDecimalIcon ? {
    f: common_vendor.s($options.decimalIconStyle),
    g: common_vendor.n($options.decimalIconClass),
    h: $props.hoverClass
  } : {}, {
    i: common_vendor.n($options.customClass),
    j: common_vendor.s($options.iconStyle),
    k: $props.hoverClass,
    l: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args))
  }), {
    m: $props.label !== "" && $props.label !== null
  }, $props.label !== "" && $props.label !== null ? {
    n: common_vendor.t($props.label),
    o: $props.labelColor,
    p: _ctx.$u.addUnit($props.labelSize),
    q: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
    r: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
    s: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
    t: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
  } : {}, {
    v: common_vendor.s($props.customStyle),
    w: common_vendor.o((...args) => $options.click && $options.click(...args)),
    x: common_vendor.n("u-icon--" + $props.labelPos)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5de67484"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-icon/u-icon.vue"]]);
wx.createComponent(Component);
