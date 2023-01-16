if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$n = {
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
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return $options.show ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: vue.normalizeClass(["u-badge", [
        $props.isDot ? "u-badge-dot" : "",
        $props.size == "mini" ? "u-badge-mini" : "",
        $props.type ? "u-badge--bg--" + $props.type : ""
      ]]),
      style: vue.normalizeStyle([{
        top: $props.offset[0] + "rpx",
        right: $props.offset[1] + "rpx",
        fontSize: $props.fontSize + "rpx",
        position: $props.absolute ? "absolute" : "static",
        color: $props.color,
        backgroundColor: $props.bgColor
      }, $options.boxStyle])
    }, vue.toDisplayString($options.showText), 7)) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-f84de764"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-badge/u-badge.vue"]]);
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    let startRGB = hexToRgb(startColor, false);
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = hexToRgb(endColor, false);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    let colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex("rgb(" + Math.round(sR * i + startR) + "," + Math.round(sG * i + startG) + "," + Math.round(sB * i + startB) + ")");
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      if (!str) {
        return sColorChange;
      } else {
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
      }
    } else if (/^(rgb|RGB)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    } else {
      return sColor;
    }
  }
  function rgbToHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? 0 + "" + hex : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha = 0.3) {
    color2 = rgbToHex(color2);
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color2.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
    } else {
      return sColor;
    }
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  let color$1 = colorGradient$1;
  const { windowWidth } = uni.getSystemInfoSync();
  const preId = "UEl_";
  const _sfc_main$m = {
    name: "u-tabs-swiper",
    props: {
      isScroll: {
        type: Boolean,
        default: true
      },
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      current: {
        type: [Number, String],
        default: 0
      },
      height: {
        type: [Number, String],
        default: 80
      },
      fontSize: {
        type: [Number, String],
        default: 30
      },
      swiperWidth: {
        type: [String, Number],
        default: 750
      },
      activeColor: {
        type: String,
        default: "#2979ff"
      },
      inactiveColor: {
        type: String,
        default: "#303133"
      },
      barWidth: {
        type: [Number, String],
        default: 40
      },
      barHeight: {
        type: [Number, String],
        default: 6
      },
      gutter: {
        type: [Number, String],
        default: 40
      },
      zIndex: {
        type: [Number, String],
        default: 1
      },
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      autoCenterMode: {
        type: String,
        default: "window"
      },
      name: {
        type: String,
        default: "name"
      },
      count: {
        type: String,
        default: "count"
      },
      offset: {
        type: Array,
        default: () => {
          return [5, 20];
        }
      },
      bold: {
        type: Boolean,
        default: true
      },
      activeItemStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      showBar: {
        type: Boolean,
        default: true
      },
      barStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        scrollLeft: 0,
        tabQueryInfo: [],
        windowWidth: 0,
        animationFinishCurrent: this.current,
        componentsWidth: 0,
        line3AddDx: 0,
        line3Dx: 0,
        preId,
        sW: 0,
        tabsInfo: [],
        colorGradientArr: [],
        colorStep: 100
      };
    },
    computed: {
      getCurrent() {
        const current = Number(this.current);
        if (current > this.getTabs.length - 1) {
          return this.getTabs.length - 1;
        }
        if (current < 0)
          return 0;
        return current;
      },
      getTabs() {
        return this.list;
      },
      scrollBarLeft() {
        return Number(this.line3Dx) + Number(this.line3AddDx);
      },
      barWidthPx() {
        return uni.upx2px(this.barWidth);
      },
      tabItemStyle() {
        return (index) => {
          let style = {
            height: this.height + "rpx",
            lineHeight: this.height + "rpx",
            padding: `0 ${this.gutter / 2}rpx`,
            color: this.tabsInfo.length > 0 ? this.tabsInfo[index] ? this.tabsInfo[index].color : this.activeColor : this.inactiveColor,
            fontSize: this.fontSize + "rpx",
            zIndex: this.zIndex + 2,
            fontWeight: index == this.getCurrent && this.bold ? "bold" : "normal"
          };
          if (index == this.getCurrent) {
            style = Object.assign(style, this.activeItemStyle);
          }
          return style;
        };
      },
      tabBarStyle() {
        let style = {
          width: this.barWidthPx + "px",
          height: this.barHeight + "rpx",
          borderRadius: "100px",
          backgroundColor: this.activeColor,
          left: this.scrollBarLeft + "px"
        };
        return Object.assign(style, this.barStyle);
      }
    },
    watch: {
      current(n, o) {
        this.change(n);
        this.setFinishCurrent(n);
      },
      list() {
        this.$nextTick(() => {
          this.init();
        });
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        this.countPx();
        await this.getTabsInfo();
        this.countLine3Dx();
        this.getQuery(() => {
          this.setScrollViewToCenter();
        });
        this.colorGradientArr = color$1.colorGradient(this.inactiveColor, this.activeColor, this.colorStep);
      },
      getTabsInfo() {
        return new Promise((resolve, reject) => {
          let view = uni.createSelectorQuery().in(this);
          for (let i = 0; i < this.list.length; i++) {
            view.select("." + preId + i).boundingClientRect();
          }
          view.exec((res) => {
            const arr = [];
            for (let i = 0; i < res.length; i++) {
              res[i].color = this.inactiveColor;
              if (i == this.getCurrent)
                res[i].color = this.activeColor;
              arr.push(res[i]);
            }
            this.tabsInfo = arr;
            resolve();
          });
        });
      },
      countLine3Dx() {
        const tab = this.tabsInfo[this.animationFinishCurrent];
        if (tab)
          this.line3Dx = tab.left + tab.width / 2 - this.barWidthPx / 2 - this.tabsInfo[0].left;
      },
      countPx() {
        this.sW = uni.upx2px(Number(this.swiperWidth));
      },
      emit(index) {
        this.$emit("change", index);
      },
      change() {
        this.setScrollViewToCenter();
      },
      getQuery(cb) {
        try {
          let view = uni.createSelectorQuery().in(this).select(".u-tabs");
          view.fields(
            {
              size: true
            },
            (data) => {
              if (data) {
                this.componentsWidth = data.width;
                if (cb && typeof cb === "function")
                  cb(data);
              } else {
                this.getQuery(cb);
              }
            }
          ).exec();
        } catch (e) {
          this.componentsWidth = windowWidth;
        }
      },
      setScrollViewToCenter() {
        let tab;
        tab = this.tabsInfo[this.animationFinishCurrent];
        if (tab) {
          let tabCenter = tab.left + tab.width / 2;
          let fatherWidth;
          if (this.autoCenterMode === "window") {
            fatherWidth = windowWidth;
          } else {
            fatherWidth = this.componentsWidth;
          }
          this.scrollLeft = tabCenter - fatherWidth / 2;
        }
      },
      setDx(dx) {
        let nextTabIndex = dx > 0 ? this.animationFinishCurrent + 1 : this.animationFinishCurrent - 1;
        nextTabIndex = nextTabIndex <= 0 ? 0 : nextTabIndex;
        nextTabIndex = nextTabIndex >= this.list.length ? this.list.length - 1 : nextTabIndex;
        this.tabsInfo[nextTabIndex];
        let nowTab = this.tabsInfo[this.animationFinishCurrent];
        let nowTabX = nowTab.left + nowTab.width / 2;
        let nextTab = this.tabsInfo[nextTabIndex];
        let nextTabX = nextTab.left + nextTab.width / 2;
        let distanceX = Math.abs(nextTabX - nowTabX);
        this.line3AddDx = dx / this.sW * distanceX;
        this.setTabColor(this.animationFinishCurrent, nextTabIndex, dx);
      },
      setTabColor(nowTabIndex, nextTabIndex, dx) {
        let colorIndex = Math.abs(Math.ceil(dx / this.sW * 100));
        let colorLength = this.colorGradientArr.length;
        colorIndex = colorIndex >= colorLength ? colorLength - 1 : colorIndex <= 0 ? 0 : colorIndex;
        this.tabsInfo[nextTabIndex].color = this.colorGradientArr[colorIndex];
        this.tabsInfo[nowTabIndex].color = this.colorGradientArr[colorLength - 1 - colorIndex];
      },
      setFinishCurrent(current) {
        this.tabsInfo.map((val, index) => {
          if (current == index)
            val.color = this.activeColor;
          else
            val.color = this.inactiveColor;
          return val;
        });
        this.line3AddDx = 0;
        this.animationFinishCurrent = current;
        this.countLine3Dx();
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_badge = resolveEasycom(vue.resolveDynamicComponent("u-badge"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "u-tabs",
      style: vue.normalizeStyle({
        zIndex: $props.zIndex,
        background: $props.bgColor
      })
    }, [
      vue.createElementVNode("scroll-view", {
        "scroll-x": "",
        class: "u-scroll-view",
        "scroll-left": $data.scrollLeft,
        "scroll-with-animation": "",
        style: vue.normalizeStyle({ zIndex: $props.zIndex + 1 })
      }, [
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["u-tabs-scroll-box", { "u-tabs-scorll-flex": !$props.isScroll }])
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getTabs, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass(["u-tabs-item", [$data.preId + index]]),
              style: vue.normalizeStyle([$options.tabItemStyle(index)]),
              key: index,
              onClick: ($event) => $options.emit(index)
            }, [
              vue.createVNode(_component_u_badge, {
                count: item[$props.count] || item["count"] || 0,
                offset: $props.offset,
                size: "mini"
              }, null, 8, ["count", "offset"]),
              vue.createTextVNode(" " + vue.toDisplayString(item[$props.name] || item["name"]), 1)
            ], 14, ["onClick"]);
          }), 128)),
          $props.showBar ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "u-scroll-bar",
            style: vue.normalizeStyle([$options.tabBarStyle])
          }, null, 4)) : vue.createCommentVNode("v-if", true)
        ], 2)
      ], 12, ["scroll-left"])
    ], 4);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-d226c2b0"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-tabs-swiper/u-tabs-swiper.vue"]]);
  const _sfc_main$l = {
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
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "u-line",
      style: vue.normalizeStyle([$options.lineStyle])
    }, null, 4);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-3e1cc47b"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-line/u-line.vue"]]);
  const _sfc_main$k = {
    name: "u-loading",
    props: {
      mode: {
        type: String,
        default: "circle"
      },
      color: {
        type: String,
        default: "#c7c7c7"
      },
      size: {
        type: [String, Number],
        default: "34"
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      cricleStyle() {
        let style = {};
        style.width = this.size + "rpx";
        style.height = this.size + "rpx";
        if (this.mode == "circle")
          style.borderColor = `#e4e4e4 #e4e4e4 #e4e4e4 ${this.color ? this.color : "#c7c7c7"}`;
        return style;
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.show ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: vue.normalizeClass(["u-loading", $props.mode == "circle" ? "u-loading-circle" : "u-loading-flower"]),
      style: vue.normalizeStyle([$options.cricleStyle])
    }, null, 6)) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-32db0ed8"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-loading/u-loading.vue"]]);
  const _sfc_main$j = {
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
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_0$2);
    const _component_u_loading = resolveEasycom(vue.resolveDynamicComponent("u-loading"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "u-load-more-wrap",
      style: vue.normalizeStyle({
        backgroundColor: $props.bgColor,
        marginBottom: $props.marginBottom + "rpx",
        marginTop: $props.marginTop + "rpx",
        height: _ctx.$u.addUnit($props.height)
      })
    }, [
      vue.createVNode(_component_u_line, {
        color: "#d4d4d4",
        length: "50"
      }),
      vue.createCommentVNode(" \u52A0\u8F7D\u4E2D\u548C\u6CA1\u6709\u66F4\u591A\u7684\u72B6\u6001\u624D\u663E\u793A\u4E24\u8FB9\u7684\u6A2A\u7EBF "),
      vue.createElementVNode("view", {
        class: vue.normalizeClass([$props.status == "loadmore" || $props.status == "nomore" ? "u-more" : "", "u-load-more-inner"])
      }, [
        vue.createElementVNode("view", { class: "u-loadmore-icon-wrap" }, [
          vue.createVNode(_component_u_loading, {
            class: "u-loadmore-icon",
            color: $props.iconColor,
            mode: $props.iconType == "circle" ? "circle" : "flower",
            show: $props.status == "loading" && $props.icon
          }, null, 8, ["color", "mode", "show"])
        ]),
        vue.createCommentVNode(" \u5982\u679C\u6CA1\u6709\u66F4\u591A\u7684\u72B6\u6001\u4E0B\uFF0C\u663E\u793A\u5185\u5BB9\u4E3Adot\uFF08\u7C97\u70B9\uFF09\uFF0C\u52A0\u8F7D\u7279\u5B9A\u6837\u5F0F "),
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["u-line-1", [$props.status == "nomore" && $props.isDot == true ? "u-dot-text" : "u-more-text"]]),
          style: vue.normalizeStyle([$options.loadTextStyle]),
          onClick: _cache[0] || (_cache[0] = (...args) => $options.loadMore && $options.loadMore(...args))
        }, vue.toDisplayString($options.showText), 7)
      ], 2),
      vue.createVNode(_component_u_line, {
        color: "#d4d4d4",
        length: "50"
      })
    ], 4);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-e9906cfb"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.vue"]]);
  const _sfc_main$i = {
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
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      style: vue.normalizeStyle([$props.customStyle]),
      class: vue.normalizeClass(["u-icon", ["u-icon--" + $props.labelPos]]),
      onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
    }, [
      $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        class: "u-icon__img",
        src: $props.name,
        mode: $props.imgMode,
        style: vue.normalizeStyle([$options.imgStyle])
      }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: vue.normalizeClass(["u-icon__icon", $options.customClass]),
        style: vue.normalizeStyle([$options.iconStyle]),
        "hover-class": $props.hoverClass,
        onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchstart && $options.touchstart(...args))
      }, [
        $props.showDecimalIcon ? (vue.openBlock(), vue.createElementBlock("text", {
          key: 0,
          style: vue.normalizeStyle([$options.decimalIconStyle]),
          class: vue.normalizeClass([$options.decimalIconClass, "u-icon__decimal"]),
          "hover-class": $props.hoverClass
        }, null, 14, ["hover-class"])) : vue.createCommentVNode("v-if", true)
      ], 46, ["hover-class"])),
      vue.createCommentVNode(' \u8FD9\u91CC\u8FDB\u884C\u7A7A\u5B57\u7B26\u4E32\u5224\u65AD\uFF0C\u5982\u679C\u4EC5\u4EC5\u662Fv-if="label"\uFF0C\u53EF\u80FD\u4F1A\u51FA\u73B0\u4F20\u90120\u7684\u65F6\u5019\uFF0C\u7ED3\u679C\u4E5F\u65E0\u6CD5\u663E\u793A\uFF0C\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u4E0D\u4F20\u503C\u9ED8\u8BA4\u4E3Anull\uFF0C\u6545\u9700\u8981\u589E\u52A0null\u7684\u5224\u65AD '),
      $props.label !== "" && $props.label !== null ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 2,
        class: "u-icon__label",
        style: vue.normalizeStyle({
          color: $props.labelColor,
          fontSize: _ctx.$u.addUnit($props.labelSize),
          marginLeft: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
          marginTop: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
          marginRight: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
          marginBottom: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
        })
      }, vue.toDisplayString($props.label), 5)) : vue.createCommentVNode("v-if", true)
    ], 6);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-5de67484"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-icon/u-icon.vue"]]);
  let base64Avatar = "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCADIAMgDAREAAhEBAxEB/8QAcQABAQEAAwEBAAAAAAAAAAAAAAUEAQMGAgcBAQAAAAAAAAAAAAAAAAAAAAAQAAIBAwICBgkDBQAAAAAAAAABAhEDBCEFMVFBYXGREiKBscHRMkJSEyOh4XLxYjNDFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHbHFyZ/Dam+yLA+Z2L0Pjtyj2poD4AAAAAAAAAAAAAAAAAAAAAAAAKWFs9y6lcvvwQeqj8z9wFaziY1n/HbUX9XF97A7QAGXI23EvJ1goyfzR0YEfN269jeZ+a03pNe0DIAAAAAAAAAAAAAAAAAAAACvtO3RcVkXlWutuL9YFYAAAAAOJRjKLjJVi9GmB5/csH/mu1h/in8PU+QGMAAAAAAAAAAAAAAAAAAaMDG/6MmMH8C80+xAelSSVFolwQAAAAAAAHVlWI37ErUulaPk+hgeYnCUJuElSUXRrrQHAAAAAAAAAAAAAAAAABa2Oz4bM7r4zdF2ICmAAAAAAAAAg7zZ8GX41wuJP0rRgYAAAAAAAAAAAAAAAAAD0m2R8ODaXU33tsDSAAAAAAAAAlb9HyWZcnJd9PcBHAAAAAAAAAAAAAAAAAPS7e64Vn+KA0AAAAAAAAAJm+v8Ftf3ewCKAAAAAAAAAAAAAAAAAX9muqeGo9NttP06+0DcAAAAAAAAAjb7dTu2ra+VOT9P8AQCWAAAAAAAAAAAAAAAAAUNmyPt5Ltv4bui/kuAF0AAAAAAADiUlGLlJ0SVW+oDzOXfd/Ind6JPRdS0QHSAAAAAAAAAAAAAAAAAE2nVaNcGB6Lbs6OTao9LsF51z60BrAAAAAABJ3jOVHjW3r/sa9QEgAAAAAAAAAAAAAAAAAAAPu1duWriuW34ZR4MC9hbnZyEoy8l36XwfYBsAAADaSq9EuLAlZ+7xSdrGdW9Hc5dgEdtt1erfFgAAAAAAAAAAAAAAAAADVjbblX6NR8MH80tEBRs7HYivyzlN8lovaBPzduvY0m6eK10TXtAyAarO55lpJK54orolr+4GqO/Xaea1FvqbXvA+Z77kNeW3GPbV+4DJfzcm/pcm3H6Vou5AdAFLC2ed2Pjv1txa8sV8T6wOL+yZEKu1JXFy4MDBOE4ScZxcZLinoB8gAAAAAAAAAAAB242LeyJ+C3GvN9C7QLmJtePYpKS+5c+p8F2IDYAANJqj1T4oCfk7Nj3G5Wn9qXJax7gJ93Z82D8sVNc4v30A6Xg5i42Z+iLfqARwcyT0sz9MWvWBps7LlTf5Grce9/oBTxdtxseklHxT+uWr9AGoAB138ezfj4bsFJdD6V2MCPm7RdtJzs1uW1xXzL3gTgAAAAAAAAADRhYc8q74I6RWs5ckB6GxYtWLat21SK731sDsAAAAAAAAAAAAAAAASt021NO/YjrxuQXT1oCOAAAAAAABzGLlJRSq26JAelwsWONYjbXxcZvmwO8AAAAAAAAAAAAAAAAAAef3TEWPkVivx3NY9T6UBiAAAAAABo2+VmGXblddIJ8eivRUD0oAAAAAAAAAAAAAAAAAAAYt4tKeFKVNYNSXfRgefAAAAAAAAr7VuSSWPedKaW5v1MCsAAAAAAAAAAAAAAAAAAIe6bj96Ts2n+JPzSXzP3ATgAAAAAAAAFbbt1UUrOQ9FpC4/UwK6aaqtU+DAAAAAAAAAAAAAAA4lKMIuUmoxWrb4ARNx3R3q2rLpa4Sl0y/YCcAAAAAAAAAAANmFud7G8r89r6X0dgFvGzLGRGtuWvTF6NAdwAAAAAAAAAAAy5W442PVN+K59EePp5ARMvOv5MvO6QXCC4AZwAAAAAAAAAAAAAcxlKLUotprg1owN+PvORborq+7Hnwl3gUbO74VzRydt8pKn68ANcJwmqwkpLmnUDkAAAAfNy9atqtyagut0AxXt5xIV8Fbj6lRd7Am5G65V6qUvtwfyx94GMAAAAAAAAAAAAAAAAAAAOU2nVOj5gdsc3LiqRvTpyqwOxbnnrhdfpSfrQB7pnv/AGvuS9gHXPMy5/Fem1yq0v0A6W29XqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";
  const _sfc_main$h = {
    name: "u-avatar",
    emits: ["click"],
    props: {
      bgColor: {
        type: String,
        default: "transparent"
      },
      src: {
        type: String,
        default: ""
      },
      size: {
        type: [String, Number],
        default: "default"
      },
      mode: {
        type: String,
        default: "circle"
      },
      text: {
        type: String,
        default: ""
      },
      imgMode: {
        type: String,
        default: "aspectFill"
      },
      index: {
        type: [String, Number],
        default: ""
      },
      sexIcon: {
        type: String,
        default: "man"
      },
      levelIcon: {
        type: String,
        default: "level"
      },
      levelBgColor: {
        type: String,
        default: ""
      },
      sexBgColor: {
        type: String,
        default: ""
      },
      showSex: {
        type: Boolean,
        default: false
      },
      showLevel: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        error: false,
        avatar: this.src ? this.src : base64Avatar
      };
    },
    watch: {
      src(n) {
        if (!n) {
          this.avatar = base64Avatar;
          this.error = true;
        } else {
          this.avatar = n;
          this.error = false;
        }
      }
    },
    computed: {
      wrapStyle() {
        let style = {};
        style.height = this.size == "large" ? "120rpx" : this.size == "default" ? "90rpx" : this.size == "mini" ? "70rpx" : this.size + "rpx";
        style.width = style.height;
        style.flex = `0 0 ${style.height}`;
        style.backgroundColor = this.bgColor;
        style.borderRadius = this.mode == "circle" ? "500px" : "5px";
        if (this.text)
          style.padding = `0 6rpx`;
        return style;
      },
      imgStyle() {
        let style = {};
        style.borderRadius = this.mode == "circle" ? "500px" : "5px";
        return style;
      },
      uText() {
        return String(this.text)[0];
      },
      uSexStyle() {
        let style = {};
        if (this.sexBgColor)
          style.backgroundColor = this.sexBgColor;
        return style;
      },
      uLevelStyle() {
        let style = {};
        if (this.levelBgColor)
          style.backgroundColor = this.levelBgColor;
        return style;
      }
    },
    methods: {
      loadError() {
        this.error = true;
        this.avatar = base64Avatar;
      },
      click() {
        this.$emit("click", this.index);
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "u-avatar",
      style: vue.normalizeStyle([$options.wrapStyle]),
      onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
    }, [
      !$options.uText && $data.avatar ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        onError: _cache[0] || (_cache[0] = (...args) => $options.loadError && $options.loadError(...args)),
        style: vue.normalizeStyle([$options.imgStyle]),
        class: "u-avatar__img",
        src: $data.avatar,
        mode: $props.imgMode
      }, null, 44, ["src", "mode"])) : $options.uText ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 1,
        class: "u-line-1",
        style: {
          fontSize: "38rpx"
        }
      }, vue.toDisplayString($options.uText), 1)) : vue.renderSlot(_ctx.$slots, "default", { key: 2 }, void 0, true),
      $props.showSex ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: vue.normalizeClass(["u-avatar__sex", ["u-avatar__sex--" + $props.sexIcon]]),
        style: vue.normalizeStyle([$options.uSexStyle])
      }, [
        vue.createVNode(_component_u_icon, {
          name: $props.sexIcon,
          size: "20"
        }, null, 8, ["name"])
      ], 6)) : vue.createCommentVNode("v-if", true),
      $props.showLevel ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 4,
        class: "u-avatar__level",
        style: vue.normalizeStyle([$options.uLevelStyle])
      }, [
        vue.createVNode(_component_u_icon, {
          name: $props.levelIcon,
          size: "20"
        }, null, 8, ["name"])
      ], 4)) : vue.createCommentVNode("v-if", true)
    ], 4);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-49012a02"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-avatar/u-avatar.vue"]]);
  const _sfc_main$g = {
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
        uni.showToast({
          title: "\u5DF2\u5173\u6CE8"
        });
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_avatar = resolveEasycom(vue.resolveDynamicComponent("u-avatar"), __easycom_0$1);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "post" }, [
      vue.createElementVNode("view", { class: "user-info" }, [
        vue.createVNode(_component_u_avatar, {
          src: $props.postObj.avaSrc,
          class: "avatar"
        }, null, 8, ["src"]),
        vue.createElementVNode("view", { class: "middle-content" }, [
          vue.createElementVNode("view", { class: "name" }, vue.toDisplayString($props.postObj.name), 1),
          vue.createTextVNode(),
          vue.createElementVNode("view", { class: "time" }, vue.toDisplayString($props.postObj.time), 1)
        ]),
        vue.createElementVNode("button", {
          class: "follow-btn",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.follow && $options.follow(...args))
        }, "\u5173\u6CE8")
      ]),
      vue.createElementVNode("view", { class: "post-content" }, [
        vue.createElementVNode("view", { class: "post-text" }, vue.toDisplayString($props.postObj.text), 1),
        vue.createCommentVNode(" \u6709\u56FE\u7247\u624D\u663E\u793A\uFF0C\u6CA1\u6709\u4E0D\u663E\u793A "),
        vue.withDirectives(vue.createElementVNode("image", {
          src: $props.postObj.imgSrc,
          class: "post-img",
          mode: "widthFix"
        }, null, 8, ["src"]), [
          [vue.vShow, $props.postObj.imgSrc]
        ])
      ]),
      vue.createElementVNode("view", { class: "btn-group" }, [
        vue.createElementVNode("view", { class: "up" }, [
          vue.createVNode(_component_u_icon, { name: "thumb-up" }),
          vue.createTextVNode(" " + vue.toDisplayString($props.postObj.thumbup), 1)
        ]),
        vue.createElementVNode("view", { class: "down" }, [
          vue.createVNode(_component_u_icon, { name: "thumb-down" }),
          vue.createTextVNode(" " + vue.toDisplayString($props.postObj.thumbdown), 1)
        ]),
        vue.createElementVNode("view", { class: "comment" }, [
          vue.createVNode(_component_u_icon, { name: "chat" }),
          vue.createTextVNode(" \u8BC4\u8BBA ")
        ]),
        vue.createElementVNode("view", { class: "share" }, [
          vue.createVNode(_component_u_icon, { name: "zhuanfa" }),
          vue.createTextVNode(" \u5206\u4EAB ")
        ])
      ])
    ]);
  }
  const Post = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-2f8ba2b3"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/post/post.vue"]]);
  const _sfc_main$f = {
    name: "post-list",
    components: {
      Post
    },
    props: {
      postList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {};
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Post = vue.resolveComponent("Post");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" \u4F20\u7ED9\u5B50\u7EC4\u4EF6\u4E00\u6574\u4E2A\u5217\u8868 "),
      vue.createCommentVNode(" \u7ED9\u5B50\u7EC4\u4EF6\u4F20\u9012postObj\u5BF9\u8C61 "),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.postList, (post, idx) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "post",
          key: "idx"
        }, [
          vue.createVNode(_component_Post, { postObj: post }, null, 8, ["postObj"])
        ]);
      }), 128))
    ]);
  }
  const PostList = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-6a24639b"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/post-list/post-list.vue"]]);
  const a1 = "/static/images/a1.jpg";
  const a2 = "/static/images/a2.jpg";
  const p3 = "/static/images/img3.jpg";
  const p4 = "/static/images/img4.jpg";
  const _sfc_main$e = {
    components: {
      PostList,
      Post
    },
    data() {
      return {
        contentTop: uni.getStorageSync("menuInfo").contentTop,
        triggered: false,
        list: [
          { name: "\u5708\u5B50" },
          { name: "\u70ED\u70B9" },
          { name: "\u6D3B\u52A8" },
          { name: "\u516C\u544A" },
          { name: "\u8BDD\u9898" }
        ],
        dataSrcList: [
          {
            avaSrc: a1,
            name: "\u8DF3\u8DF3\u864E",
            time: "1\u670814\u65E5 \u4E0A\u534812:00",
            text: "Lorem ipsum dolor ipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            imgSrc: "",
            thumbup: 2,
            thumbdown: 1
          },
          {
            avaSrc: a2,
            name: "\u8F9B\u5FB7\u745E\u62C9",
            time: "1\u670811\u65E5 \u4E0A\u53489:20",
            text: "\u6674\u6717\u7684\u4E00\u5929:)",
            imgSrc: p3,
            thumbup: 1,
            thumbdown: 0
          },
          {
            avaSrc: a1,
            name: "\u8DF3\u8DF3\u864E",
            time: "1\u670810\u65E5 \u4E0A\u53487:20",
            text: "\u6DF1\u591C\u6536\u5DE5",
            imgSrc: p4,
            thumbup: 12,
            thumbdown: 0
          },
          {
            avaSrc: "https://images.unsplash.com/profile-1654780721545-f705790401b8image?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
            name: "RIck",
            time: "12\u67081\u65E5 \u4E0B\u53486:50",
            text: "\u5403\u4E0B\u5348\u8336\u5566\uFF01~",
            imgSrc: "https://images.unsplash.com/photo-1673868077539-9c3120f78420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
            thumbup: 35,
            thumbdown: 1
          }
        ],
        postList: [],
        current: 0,
        swiperCurrent: 0,
        dx: 0,
        loadStatus: "loadmore",
        bold: true,
        showBar: true,
        isScroll: false
      };
    },
    methods: {
      getData() {
        formatAppLog("log", "at pages/home/home.vue:126", "\u83B7\u53D6\u6570\u636E");
        for (let i = 0; i < 4; i++) {
          this.postList.push(this.dataSrcList[i]);
        }
        this.loadStatus = "loadmore";
      },
      tabsChange(index) {
        this.current = index;
        this.swiperCurrent = index;
      },
      transition(e) {
        let dx = e.detail.dx;
        this.$refs.uTabs.setDx(dx);
      },
      animationfinish(e) {
        let current = e.detail.current;
        this.$refs.uTabs.setFinishCurrent(current);
        this.swiperCurrent = current;
        this.current = current;
      },
      reachBottom() {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getData();
        }, 1500);
      },
      onPulling(e) {
        formatAppLog("log", "at pages/home/home.vue:158", "onpulling\u6B63\u5728\u4E0B\u62C9", e);
        this.triggered = true;
      },
      onRefresh() {
        if (this._freshing)
          return;
        this._freshing = true;
        setTimeout(() => {
          this.triggered = false;
          this._freshing = false;
          this.postList = this.postList.sort(function() {
            return 0.5 - Math.random();
          });
        }, 1500);
      },
      onRestore() {
        this.triggered = "restore";
        formatAppLog("error", "at pages/home/home.vue:175", "onRestore");
      },
      onAbort() {
        formatAppLog("error", "at pages/home/home.vue:178", "onAbort");
      }
    },
    onNavigationBarButtonTap(e) {
      formatAppLog("log", "at pages/home/home.vue:183", "\u65B0\u589E");
    },
    onNavigationBarSearchInputClicked() {
      uni.navigateTo({
        url: "/pages/home/search-detail/search-detail"
      });
    },
    onLoad() {
      this._freshing = false;
      this.getData();
    },
    onPullDownRefresh() {
      formatAppLog("log", "at pages/home/home.vue:196", "refresh");
      setTimeout(function() {
        uni.stopPullDownRefresh();
      }, 500);
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_tabs_swiper = resolveEasycom(vue.resolveDynamicComponent("u-tabs-swiper"), __easycom_0$3);
    const _component_PostList = vue.resolveComponent("PostList");
    const _component_u_loadmore = resolveEasycom(vue.resolveDynamicComponent("u-loadmore"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "wrap" }, [
        vue.createElementVNode("view", { class: "u-tabs-box" }, [
          vue.createVNode(_component_u_tabs_swiper, {
            activeColor: "#f29100",
            ref: "uTabs",
            list: $data.list,
            current: $data.current,
            onChange: $options.tabsChange,
            "is-scroll": false
          }, null, 8, ["list", "current", "onChange"])
        ]),
        vue.createElementVNode("swiper", {
          class: "swiper-box",
          current: $data.swiperCurrent,
          onTransition: _cache[5] || (_cache[5] = (...args) => $options.transition && $options.transition(...args)),
          onAnimationfinish: _cache[6] || (_cache[6] = (...args) => $options.animationfinish && $options.animationfinish(...args))
        }, [
          vue.createElementVNode("swiper-item", { class: "swiper-item" }, [
            vue.createElementVNode("scroll-view", {
              "scroll-y": "",
              style: { "height": "100%", "width": "100%", "background-color": "#f2f2f2" },
              "refresher-enabled": "true",
              "refresher-triggered": $data.triggered,
              "refresher-threshold": 100,
              "refresher-background": "#f2f2f2",
              onRefresherpulling: _cache[0] || (_cache[0] = (...args) => $options.onPulling && $options.onPulling(...args)),
              onRefresherrefresh: _cache[1] || (_cache[1] = (...args) => $options.onRefresh && $options.onRefresh(...args)),
              onRefresherrestore: _cache[2] || (_cache[2] = (...args) => $options.onRestore && $options.onRestore(...args)),
              onRefresherabort: _cache[3] || (_cache[3] = (...args) => $options.onAbort && $options.onAbort(...args)),
              onScrolltolower: _cache[4] || (_cache[4] = (...args) => $options.reachBottom && $options.reachBottom(...args))
            }, [
              vue.createElementVNode("view", { class: "page-box" }, [
                vue.createVNode(_component_PostList, { postList: $data.postList }, null, 8, ["postList"]),
                vue.createVNode(_component_u_loadmore, {
                  status: $data.loadStatus,
                  bgColor: "#f2f2f2"
                }, null, 8, ["status"])
              ])
            ], 40, ["refresher-triggered"])
          ])
        ], 40, ["current"])
      ])
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-07e72d3c"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/home/home.vue"]]);
  const _sfc_main$d = {
    name: "navbar",
    onShow() {
      formatAppLog("log", "at components/navbar/navbar.vue:12", "\u83B7\u5F97\u7684paddingR:", this.paddingRight);
    },
    data() {
      return {
        windowHeight: uni.getStorageSync("menuInfo").windowHeight,
        navBarHeight: "44px",
        statusBarHeight: uni.getStorageSync("menuInfo").statusBarHeight,
        menuHeight: uni.getStorageSync("menuInfo").menuHeight,
        menuWidth: uni.getStorageSync("menuInfo").menuWidth,
        menuRight: uni.getStorageSync("menuInfo").menuRight,
        contentTop: uni.getStorageSync("menuInfo").contentTop,
        paddingRight: uni.getStorageSync("menuInfo").paddingRight
      };
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "bars" }, [
      vue.createElementVNode("view", {
        class: "status-bar",
        style: vue.normalizeStyle({ height: $data.statusBarHeight })
      }, null, 4),
      vue.createElementVNode("view", {
        class: "nav-bar",
        style: vue.normalizeStyle({ height: $data.navBarHeight, paddingRight: $data.paddingRight })
      }, null, 4)
    ]);
  }
  const NavBar = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-eaf4c2e5"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/navbar/navbar.vue"]]);
  const _sfc_main$c = {
    components: {
      NavBar
    },
    data() {
      return {
        contentTop: uni.getStorageSync("menuInfo").contentTop
      };
    },
    onPullDownRefresh() {
      formatAppLog("log", "at pages/story/story.vue:23", "refresh");
      setTimeout(function() {
        uni.stopPullDownRefresh();
      }, 500);
    },
    onPullDownRefresh() {
      formatAppLog("log", "at pages/story/story.vue:29", "refresh");
    },
    methods: {}
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" });
  }
  const PagesStoryStory = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-fd6d2232"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/story/story.vue"]]);
  const _sfc_main$b = {
    components: {
      NavBar
    },
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, "\u641C\u7D22\u7ED3\u679C...");
  }
  const PagesHomeSearchDetailSearchDetail = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/home/search-detail/search-detail.vue"]]);
  const _sfc_main$a = {
    components: { PostList },
    data() {
      return {
        list: [
          { name: "\u5708\u5B50" },
          { name: "\u70ED\u70B9" },
          { name: "\u6D3B\u52A8" },
          { name: "\u516C\u544A" },
          { name: "\u8BDD\u9898" }
        ],
        current: 0,
        swiperCurrent: 0,
        dx: 0
      };
    },
    onPullDownRefresh() {
      formatAppLog("log", "at pages/message/message.vue:54", "refresh");
      setTimeout(function() {
        uni.stopPullDownRefresh();
      }, 500);
    },
    methods: {
      transition(e) {
        let dx = e.detail.dx;
        this.$refs.uTabs.setDx(dx);
      },
      animationfinish(e) {
        let current = e.detail.current;
        this.$refs.uTabs.setFinishCurrent(current);
        this.swiperCurrent = current;
        this.current = current;
      },
      reachBottom() {
        formatAppLog("log", "at pages/message/message.vue:72", "\u5230\u5E95\u4E86");
      },
      change(index) {
        this.current = index;
        this.swiperCurrent = index;
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_tabs_swiper = resolveEasycom(vue.resolveDynamicComponent("u-tabs-swiper"), __easycom_0$3);
    const _component_PostList = vue.resolveComponent("PostList");
    const _component_u_loadmore = resolveEasycom(vue.resolveDynamicComponent("u-loadmore"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "wrap" }, [
        vue.createElementVNode("view", { class: "u-tabs-box" }, [
          vue.createVNode(_component_u_tabs_swiper, {
            activeColor: "#f29100",
            ref: "uTabs",
            list: $data.list,
            current: $data.current,
            onChange: $options.change,
            "is-scroll": false,
            swiperWidth: "750"
          }, null, 8, ["list", "current", "onChange"])
        ]),
        vue.createElementVNode("swiper", {
          class: "swiper-box",
          current: $data.swiperCurrent,
          onTransition: _cache[1] || (_cache[1] = (...args) => $options.transition && $options.transition(...args)),
          onAnimationfinish: _cache[2] || (_cache[2] = (...args) => $options.animationfinish && $options.animationfinish(...args))
        }, [
          vue.createElementVNode("swiper-item", { class: "swiper-item" }, [
            vue.createElementVNode("scroll-view", {
              "scroll-y": "",
              style: { "height": "100%", "width": "100%" },
              onScrolltolower: _cache[0] || (_cache[0] = (...args) => $options.reachBottom && $options.reachBottom(...args))
            }, [
              vue.createElementVNode("view", {
                class: "page-box",
                style: { "background-color": "gold" }
              }, [
                vue.createVNode(_component_PostList),
                vue.createVNode(_component_u_loadmore, {
                  status: "loadmore",
                  bgColor: "#f2f2f2"
                })
              ])
            ], 32)
          ])
        ], 40, ["current"])
      ])
    ]);
  }
  const PagesMessageMessage = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-4c1b26cf"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/message/message.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {};
    },
    onPullDownRefresh() {
      formatAppLog("log", "at pages/profile/profile.vue:17", "refresh");
      setTimeout(function() {
        uni.stopPullDownRefresh();
      }, 500);
    },
    methods: {}
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" \u53EA\u8981\u4E0D\u662F\u5C0F\u7A0B\u5E8F\uFF0C\u5C31\u5F97\u8BBE\u5360\u4F4D\u533A\u57DF "),
      vue.createElementVNode("view", { class: "status_bar" }),
      vue.createTextVNode(" \u6211\u7684 ")
    ]);
  }
  const PagesProfileProfile = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-dd383ca2"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/profile/profile.vue"]]);
  const icons = {
    "id": "2852637",
    "name": "uniui\u56FE\u6807\u5E93",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$8 = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons.glyphs
      };
    },
    computed: {
      unicode() {
        let code2 = this.icons.find((v) => v.font_class === this.type);
        if (code2) {
          return unescape(`%u${code2.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("text", {
      style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
      class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
      onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
    }, null, 6);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-d31e1c47"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$7 = {
    name: "uni-easyinput",
    emits: ["click", "iconClick", "update:modelValue", "input", "focus", "blur", "confirm", "clear", "eyes", "change"],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: true
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
      };
    },
    computed: {
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      inputMaxlength() {
        return Number(this.maxlength);
      },
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      },
      modelValue(newVal) {
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0) {
          this.val = this.modelValue;
        } else {
          this.val = null;
        }
      },
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      onBlur() {
        this.focused = false;
        this.$emit("focus", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
      style: vue.normalizeStyle($options.boxStyle)
    }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
        style: vue.normalizeStyle($options.inputContentStyle)
      }, [
        $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
          key: 0,
          class: "content-clear-icon",
          type: $props.prefixIcon,
          color: "#c0c4cc",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
          size: "22"
        }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
        $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
          key: 1,
          class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
          name: $props.name,
          value: $data.val,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled,
          "placeholder-class": "uni-easyinput__placeholder-class",
          maxlength: $options.inputMaxlength,
          focus: $data.focused,
          autoHeight: $props.autoHeight,
          onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
          onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
          onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
          onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight"])) : (vue.openBlock(), vue.createElementBlock("input", {
          key: 2,
          type: $props.type === "password" ? "text" : $props.type,
          class: "uni-easyinput__content-input",
          style: vue.normalizeStyle($options.inputStyle),
          name: $props.name,
          value: $data.val,
          password: !$data.showPassword && $props.type === "password",
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          "placeholder-class": "uni-easyinput__placeholder-class",
          disabled: $props.disabled,
          maxlength: $options.inputMaxlength,
          focus: $data.focused,
          confirmType: $props.confirmType,
          onFocus: _cache[5] || (_cache[5] = (...args) => $options._Focus && $options._Focus(...args)),
          onBlur: _cache[6] || (_cache[6] = (...args) => $options._Blur && $options._Blur(...args)),
          onInput: _cache[7] || (_cache[7] = (...args) => $options.onInput && $options.onInput(...args)),
          onConfirm: _cache[8] || (_cache[8] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType"])),
        $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
          vue.createCommentVNode(" \u5F00\u542F\u5BC6\u7801\u65F6\u663E\u793A\u5C0F\u773C\u775B "),
          $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
            key: 0,
            class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
            type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
            size: 22,
            color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
            onClick: $options.onEyes
          }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
        ], 64)) : $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 4 }, [
          $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
            key: 0,
            class: "content-clear-icon",
            type: $props.suffixIcon,
            color: "#c0c4cc",
            onClick: _cache[9] || (_cache[9] = ($event) => $options.onClickIcon("suffix")),
            size: "22"
          }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
        ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 5 }, [
          $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
            key: 0,
            class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
            type: "clear",
            size: $props.clearSize,
            color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
            onClick: $options.onClear
          }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
        ], 64)),
        vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
      ], 6)
    ], 6);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-09fd5285"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$6 = {
    name: "uniFormsItem",
    options: {
      virtualHost: true
    },
    provide() {
      return {
        uniFormItem: this
      };
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      rules: {
        type: Array,
        default() {
          return null;
        }
      },
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      labelAlign: {
        type: String,
        default: ""
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data() {
      return {
        errMsg: "",
        isRequired: false,
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "65px",
        localLabelPos: "left",
        border: false,
        isFirstBorder: false
      };
    },
    computed: {
      msg() {
        return this.errorMessage || this.errMsg;
      }
    },
    watch: {
      "form.formRules"(val) {
        this.init();
      },
      "form.labelWidth"(val) {
        this.localLabelWidth = this._labelWidthUnit(val);
      },
      "form.labelPosition"(val) {
        this.localLabelPos = this._labelPosition();
      },
      "form.labelAlign"(val) {
      }
    },
    created() {
      this.init(true);
      if (this.name && this.form) {
        this.$watch(
          () => {
            const val = this.form._getDataValue(this.name, this.form.localData);
            return val;
          },
          (value, oldVal) => {
            const isEqual2 = this.form._isEqual(value, oldVal);
            if (!isEqual2) {
              const val = this.itemSetValue(value);
              this.onFieldChange(val, false);
            }
          },
          {
            immediate: false
          }
        );
      }
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      setRules(rules = null) {
        this.userRules = rules;
        this.init(false);
      },
      setValue() {
      },
      async onFieldChange(value, formtrigger = true) {
        const {
          formData,
          localData,
          errShowType,
          validateCheck,
          validateTrigger,
          _isRequiredField,
          _realName
        } = this.form;
        const name = _realName(this.name);
        if (!value) {
          value = this.form.formData[name];
        }
        const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
        if (!this.validator || !ruleLen || ruleLen === 0)
          return;
        const isRequiredField2 = _isRequiredField(this.itemRules.rules || []);
        let result = null;
        if (validateTrigger === "bind" || formtrigger) {
          result = await this.validator.validateUpdate(
            {
              [name]: value
            },
            formData
          );
          if (!isRequiredField2 && (value === void 0 || value === "")) {
            result = null;
          }
          if (result && result.errorMessage) {
            if (errShowType === "undertext") {
              this.errMsg = !result ? "" : result.errorMessage;
            }
            if (errShowType === "toast") {
              uni.showToast({
                title: result.errorMessage || "\u6821\u9A8C\u9519\u8BEF",
                icon: "none"
              });
            }
            if (errShowType === "modal") {
              uni.showModal({
                title: "\u63D0\u793A",
                content: result.errorMessage || "\u6821\u9A8C\u9519\u8BEF"
              });
            }
          } else {
            this.errMsg = "";
          }
          validateCheck(result ? result : null);
        } else {
          this.errMsg = "";
        }
        return result ? result : null;
      },
      init(type = false) {
        const {
          validator,
          formRules,
          childrens,
          formData,
          localData,
          _realName,
          labelWidth,
          _getDataValue,
          _setDataValue
        } = this.form || {};
        this.localLabelAlign = this._justifyContent();
        this.localLabelWidth = this._labelWidthUnit(labelWidth);
        this.localLabelPos = this._labelPosition();
        this.isRequired = this.required;
        this.form && type && childrens.push(this);
        if (!validator || !formRules)
          return;
        if (!this.form.isFirstBorder) {
          this.form.isFirstBorder = true;
          this.isFirstBorder = true;
        }
        if (this.group) {
          if (!this.group.isFirstBorder) {
            this.group.isFirstBorder = true;
            this.isFirstBorder = true;
          }
        }
        this.border = this.form.border;
        const name = _realName(this.name);
        const itemRule = this.userRules || this.rules;
        if (typeof formRules === "object" && itemRule) {
          formRules[name] = {
            rules: itemRule
          };
          validator.updateSchema(formRules);
        }
        const itemRules = formRules[name] || {};
        this.itemRules = itemRules;
        this.validator = validator;
        this.itemSetValue(_getDataValue(this.name, localData));
        this.isRequired = this._isRequired();
      },
      unInit() {
        if (this.form) {
          const {
            childrens,
            formData,
            _realName
          } = this.form;
          childrens.forEach((item, index) => {
            if (item === this) {
              this.form.childrens.splice(index, 1);
              delete formData[_realName(item.name)];
            }
          });
        }
      },
      itemSetValue(value) {
        const name = this.form._realName(this.name);
        const rules = this.itemRules.rules || [];
        const val = this.form._getValue(name, value, rules);
        this.form._setDataValue(name, this.form.formData, val);
        return val;
      },
      clearValidate() {
        this.errMsg = "";
      },
      _isRequired() {
        return this.required;
      },
      _justifyContent() {
        if (this.form) {
          const {
            labelAlign
          } = this.form;
          let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (labelAli === "left")
            return "flex-start";
          if (labelAli === "center")
            return "center";
          if (labelAli === "right")
            return "flex-end";
        }
        return "flex-start";
      },
      _labelWidthUnit(labelWidth) {
        return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 65 : "auto"));
      },
      _labelPosition() {
        if (this.form)
          return this.form.labelPosition || "left";
        return "left";
      },
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "" ? "bind" : "submit";
              }
              return "submit";
            }
            return "bind";
          }
          return "submit";
        }
        return "bind";
      },
      num2px(num) {
        if (typeof num === "number") {
          return `${num}px`;
        }
        return num;
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-forms-item", ["is-direction-" + $data.localLabelPos, $data.border ? "uni-forms-item--border" : "", $data.border && $data.isFirstBorder ? "is-first-border" : ""]])
    }, [
      vue.renderSlot(_ctx.$slots, "label", {}, () => [
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["uni-forms-item__label", { "no-label": !$props.label && !$data.isRequired }]),
          style: vue.normalizeStyle({ width: $data.localLabelWidth, justifyContent: $data.localLabelAlign })
        }, [
          $data.isRequired ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            class: "is-required"
          }, "*")) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("text", null, vue.toDisplayString($props.label), 1)
        ], 6)
      ], true),
      vue.createElementVNode("view", { class: "uni-forms-item__content" }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["uni-forms-item__error", { "msg--active": $options.msg }])
        }, [
          vue.createElementVNode("text", null, vue.toDisplayString($options.msg), 1)
        ], 2)
      ])
    ], 2);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-462874dd"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
  const _sfc_main$5 = {
    name: "social-links",
    data() {
      return {};
    },
    methods: {
      loginWx() {
        uni.showToast({
          title: "\u5FAE\u4FE1\u767B\u5F55..."
        });
      },
      loginQQ() {
        uni.showToast({
          title: "QQ\u767B\u5F55..."
        });
      },
      loginWb() {
        uni.showToast({
          title: "weibo\u767B\u5F55..."
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u793E\u4EA4 "),
      vue.createElementVNode("view", { class: "social-box" }, [
        vue.createElementVNode("view", { class: "social-title" }, [
          vue.createElementVNode("view", { class: "row-sep" }),
          vue.createElementVNode("text", null, "\u793E\u4EA4\u8D26\u53F7\u767B\u5F55"),
          vue.createElementVNode("view", { class: "row-sep" })
        ]),
        vue.createElementVNode("view", { class: "icon-box" }, [
          vue.createElementVNode("text", {
            class: "t-icon t-icon-imagewechat",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.loginWx && $options.loginWx(...args))
          }),
          vue.createElementVNode("text", {
            class: "t-icon t-icon-QQ",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.loginQQ && $options.loginQQ(...args))
          }),
          vue.createElementVNode("text", {
            class: "t-icon t-icon-weibo",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.loginWb && $options.loginWb(...args))
          })
        ]),
        vue.createElementVNode("view", { class: "agreements" }, [
          vue.createTextVNode(" \u6CE8\u518C\u5373\u4EE3\u8868\u540C\u610F "),
          vue.createElementVNode("text", { class: "link" }, "\u300Axxx\u793E\u533A\u534F\u8BAE\u300B")
        ])
      ])
    ], 2112);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-0b498ac2"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/components/social-links/social-links.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    )
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value, type) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (typeof value === "string" && !value) {
      return true;
    }
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    if (type === "object" && !Object.keys(value).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    string(value) {
      return typeof value === "string";
    },
    number(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    "boolean": function(value) {
      return typeof value === "boolean";
    },
    "float": function(value) {
      return types.number(value) && !types.integer(value);
    },
    array(value) {
      return Array.isArray(value);
    },
    object(value) {
      return typeof value === "object" && !types.array(value);
    },
    date(value) {
      return value instanceof Date;
    },
    timestamp(value) {
      if (!this.integer(value) || Math.abs(value).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value) {
      return typeof value.url === "string";
    },
    email(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    pattern(reg, value) {
      try {
        return new RegExp(reg).test(value);
      } catch (e) {
        return false;
      }
    },
    method(value) {
      return typeof value === "function";
    },
    idcard(value) {
      return typeof value === "string" && !!value.match(pattern.idcard);
    },
    "url-https"(value) {
      return this.url(value) && value.startsWith("https://");
    },
    "url-scheme"(value) {
      return value.startsWith("://");
    },
    "url-web"(value) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message) {
      this._message = message;
    }
    async validateRule(fieldKey, fieldValue, value, data, allData) {
      var result = null;
      let rules = fieldValue.rules;
      let hasRequired = rules.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value === null || value === void 0) {
          return result;
        }
        if (typeof value === "string" && !value.length) {
          return result;
        }
      }
      var message = this._message;
      if (rules === void 0) {
        return message["default"];
      }
      for (var i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let vt = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt]) {
          result = RuleValidatorHelper[vt](rule, value, message);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now = Date.now();
          let resultExpr = rule.validateExpr(value, allData, now);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value, data, allData, vt);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value, data, allData, vt) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value, allData || data, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt);
        }
      } catch (e) {
        result = this._getMessage(rule, e.message, vt);
      }
      return result;
    }
    _getMessage(rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value, message) {
      if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
        return formatMessage(rule, rule.errorMessage || message.required);
      }
      return null;
    },
    range(rule, value, message) {
      const {
        range: range2,
        errorMessage
      } = rule;
      let list = new Array(range2.length);
      for (let i = 0; i < range2.length; i++) {
        const item = range2[i];
        if (types.object(item) && item.value !== void 0) {
          list[i] = item.value;
        } else {
          list[i] = item;
        }
      }
      let result = false;
      if (Array.isArray(value)) {
        result = new Set(value.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value, message) {
      if (!types.number(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value <= minimum : value < minimum;
      let max = exclusiveMaximum ? value >= maximum : value > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
        return formatMessage(rule, rule.errorMessage || message["number"].range);
      }
      return null;
    },
    rangeLength(rule, value, message) {
      if (!types.string(value) && !types.array(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let min = rule.minLength;
      let max = rule.maxLength;
      let val = value.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message["length"].minLength);
      } else if (max !== void 0 && val > max) {
        return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
      } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
        return formatMessage(rule, rule.errorMessage || message["length"].range);
      }
      return null;
    },
    pattern(rule, value, message) {
      if (!types["pattern"](rule.pattern, value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      return null;
    },
    format(rule, value, message) {
      var customTypes = Object.keys(types);
      var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format) > -1) {
        if (!types[format](value)) {
          return formatMessage(rule, rule.errorMessage || message.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value, message) {
      if (!Array.isArray(value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
      for (let i = 0; i < value.length; i++) {
        const element = value[i];
        let formatResult = this.format(rule, element, message);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, true, allData);
      }
      return result;
    }
    async validateUpdate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidateUpdate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value = schema[key];
        let errorMessage = await this.validateRule(key, value, data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data, all, allData) {
      let result = [];
      for (let key in data) {
        let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "\u9A8C\u8BC1\u9519\u8BEF",
      defaultInvalid: "\u63D0\u4EA4\u7684\u5B57\u6BB5{field}\u5728\u6570\u636E\u5E93\u4E2D\u5E76\u4E0D\u5B58\u5728",
      validateFunction: "\u9A8C\u8BC1\u65E0\u6548",
      required: "{label}\u5FC5\u586B",
      "enum": "{label}\u8D85\u51FA\u8303\u56F4",
      timestamp: "{label}\u683C\u5F0F\u65E0\u6548",
      whitespace: "{label}\u4E0D\u80FD\u4E3A\u7A7A",
      typeError: "{label}\u7C7B\u578B\u65E0\u6548",
      date: {
        format: "{label}\u65E5\u671F{value}\u683C\u5F0F\u65E0\u6548",
        parse: "{label}\u65E5\u671F\u65E0\u6CD5\u89E3\u6790,{value}\u65E0\u6548",
        invalid: "{label}\u65E5\u671F{value}\u65E0\u6548"
      },
      length: {
        minLength: "{label}\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E{minLength}",
        maxLength: "{label}\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7{maxLength}",
        range: "{label}\u5FC5\u987B\u4ECB\u4E8E{minLength}\u548C{maxLength}\u4E4B\u95F4"
      },
      number: {
        minimum: "{label}\u4E0D\u80FD\u5C0F\u4E8E{minimum}",
        maximum: "{label}\u4E0D\u80FD\u5927\u4E8E{maximum}",
        exclusiveMinimum: "{label}\u4E0D\u80FD\u5C0F\u4E8E\u7B49\u4E8E{minimum}",
        exclusiveMaximum: "{label}\u4E0D\u80FD\u5927\u4E8E\u7B49\u4E8E{maximum}",
        range: "{label}\u5FC5\u987B\u4ECB\u4E8E{minimum}and{maximum}\u4E4B\u95F4"
      },
      pattern: {
        mismatch: "{label}\u683C\u5F0F\u4E0D\u5339\u914D"
      }
    };
  }
  SchemaValidator.message = new Message();
  const deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val));
  };
  const typeFilter = (format) => {
    return format === "int" || format === "double" || format === "number" || format === "timestamp";
  };
  const getValue = (key, value, rules) => {
    const isRuleNumType = rules.find((val) => val.format && typeFilter(val.format));
    const isRuleBoolType = rules.find((val) => val.format && val.format === "boolean" || val.format === "bool");
    if (!!isRuleNumType) {
      if (!value && value !== 0) {
        value = null;
      } else {
        value = isNumber(Number(value)) ? Number(value) : value;
      }
    }
    if (!!isRuleBoolType) {
      value = isBoolean(value) ? value : false;
    }
    return value;
  };
  const setDataValue = (field, formdata, value) => {
    formdata[field] = value;
    return value || "";
  };
  const getDataValue = (field, data) => {
    return objGet(data, field);
  };
  const realName = (name, data = {}) => {
    const base_name = _basePath(name);
    if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
      const realname = base_name.reduce((a, b) => a += `#${b}`, "_formdata_");
      return realname;
    }
    return base_name[0] || name;
  };
  const isRealName = (name) => {
    const reg = /^_formdata_#*/;
    return reg.test(name);
  };
  const rawData = (object2 = {}, name) => {
    let newData = JSON.parse(JSON.stringify(object2));
    let formData = {};
    for (let i in newData) {
      let path = name2arr(i);
      objSet(formData, path, newData[i]);
    }
    return formData;
  };
  const name2arr = (name) => {
    let field = name.replace("_formdata_#", "");
    field = field.split("#").map((v) => isNumber(v) ? Number(v) : v);
    return field;
  };
  const objSet = (object2, path, value) => {
    if (typeof object2 !== "object")
      return object2;
    _basePath(path).reduce((o, k, i, _) => {
      if (i === _.length - 1) {
        o[k] = value;
        return null;
      } else if (k in o) {
        return o[k];
      } else {
        o[k] = /^[0-9]{1,}$/.test(_[i + 1]) ? [] : {};
        return o[k];
      }
    }, object2);
    return object2;
  };
  function _basePath(path) {
    if (Array.isArray(path))
      return path;
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  }
  const objGet = (object2, path, defaultVal = "undefined") => {
    let newPath = _basePath(path);
    let val = newPath.reduce((o, k) => {
      return (o || {})[k];
    }, object2);
    return !val || val !== void 0 ? val : defaultVal;
  };
  const isNumber = (num) => {
    return !isNaN(Number(num));
  };
  const isBoolean = (bool) => {
    return typeof bool === "boolean";
  };
  const isRequiredField = (rules) => {
    let isNoField = false;
    for (let i = 0; i < rules.length; i++) {
      const ruleData = rules[i];
      if (ruleData.required) {
        isNoField = true;
        break;
      }
    }
    return isNoField;
  };
  const isEqual = (a, b) => {
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    }
    if (a == null || b == null) {
      return a === b;
    }
    var classNameA = toString.call(a), classNameB = toString.call(b);
    if (classNameA !== classNameB) {
      return false;
    }
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;
      case "[object Number]":
        if (+a !== +a) {
          return +b !== +b;
        }
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;
    }
    if (classNameA == "[object Object]") {
      var propsA = Object.getOwnPropertyNames(a), propsB = Object.getOwnPropertyNames(b);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i = 0; i < propsA.length; i++) {
        var propName = propsA[i];
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      return true;
    }
    if (classNameA == "[object Array]") {
      if (a.toString() == b.toString()) {
        return true;
      }
      return false;
    }
  };
  const _sfc_main$4 = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: true
    },
    props: {
      value: {
        type: Object,
        default() {
          return null;
        }
      },
      modelValue: {
        type: Object,
        default() {
          return null;
        }
      },
      model: {
        type: Object,
        default() {
          return null;
        }
      },
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      errShowType: {
        type: String,
        default: "undertext"
      },
      validateTrigger: {
        type: String,
        default: "submit"
      },
      labelPosition: {
        type: String,
        default: "left"
      },
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        uniForm: this
      };
    },
    data() {
      return {
        formData: {},
        formRules: {}
      };
    },
    computed: {
      localData() {
        const localVal = this.model || this.modelValue || this.value;
        if (localVal) {
          return deepCopy(localVal);
        }
        return {};
      }
    },
    watch: {
      rules: {
        handler: function(val, oldVal) {
          this.setRules(val);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value);
          } else {
            let formVm;
            for (let i in this.$refs) {
              const vm = this.$refs[i];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:182", "\u5F53\u524D uni-froms \u7EC4\u4EF6\u7F3A\u5C11 ref \u5C5E\u6027");
            formVm.setValue(name, value);
          }
        };
      }
      this.childrens = [];
      this.inputChildrens = [];
      this.setRules(this.rules);
    },
    methods: {
      setRules(rules) {
        this.formRules = Object.assign({}, this.formRules, rules);
        this.validator = new SchemaValidator(rules);
      },
      setValue(key, value) {
        let example = this.childrens.find((child) => child.name === key);
        if (!example)
          return null;
        this.formData[key] = getValue(key, value, this.formRules[key] && this.formRules[key].rules || []);
        return example.onFieldChange(this.formData[key]);
      },
      validate(keepitem, callback) {
        return this.checkAll(this.formData, keepitem, callback);
      },
      validateField(props = [], callback) {
        props = [].concat(props);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          const name = realName(item.name);
          if (props.indexOf(name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [name]: this.formData[name]
            });
          }
        });
        return this.checkAll(invalidFields, [], callback);
      },
      clearValidate(props = []) {
        props = [].concat(props);
        this.childrens.forEach((item) => {
          if (props.length === 0) {
            item.errMsg = "";
          } else {
            const name = realName(item.name);
            if (props.indexOf(name) !== -1) {
              item.errMsg = "";
            }
          }
        });
      },
      submit(keepitem, callback, type) {
        for (let i in this.dataValue) {
          const itemData = this.childrens.find((v) => v.name === i);
          if (itemData) {
            if (this.formData[i] === void 0) {
              this.formData[i] = this._getValue(i, this.dataValue[i]);
            }
          }
        }
        if (!type) {
          formatAppLog("warn", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:289", "submit \u65B9\u6CD5\u5373\u5C06\u5E9F\u5F03\uFF0C\u8BF7\u4F7F\u7528validate\u65B9\u6CD5\u4EE3\u66FF\uFF01");
        }
        return this.checkAll(this.formData, keepitem, callback, "submit");
      },
      async checkAll(invalidFields, keepitem, callback, type) {
        if (!this.validator)
          return;
        let childrens = [];
        for (let i in invalidFields) {
          const item = this.childrens.find((v) => realName(v.name) === i);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise;
        if (!callback && typeof callback !== "function" && Promise) {
          promise = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let tempFormData = JSON.parse(JSON.stringify(invalidFields));
        for (let i in childrens) {
          const child = childrens[i];
          let name = realName(child.name);
          const result = await child.onFieldChange(tempFormData[name]);
          if (result) {
            results.push(result);
            if (this.errShowType === "toast" || this.errShowType === "modal")
              break;
          }
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v) => {
            let vName = realName(v);
            let value = getDataValue(v, this.localData);
            if (value !== void 0) {
              tempFormData[vName] = value;
            }
          });
        }
        if (type === "submit") {
          this.$emit("submit", {
            detail: {
              value: tempFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        let resetFormData = {};
        resetFormData = rawData(tempFormData, this.name);
        callback && typeof callback === "function" && callback(results, resetFormData);
        if (promise && callback) {
          return promise;
        } else {
          return null;
        }
      },
      validateCheck(result) {
        this.$emit("validate", result);
      },
      _getValue: getValue,
      _isRequiredField: isRequiredField,
      _setDataValue: setDataValue,
      _getDataValue: getDataValue,
      _realName: realName,
      _isRealName: isRealName,
      _isEqual: isEqual
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-forms" }, [
      vue.createElementVNode("form", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-9a1e3c32"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        formData: {
          username: "",
          passward: ""
        },
        userData: {},
        rules: {
          username: {
            rules: [
              {
                required: true,
                errorMessage: "\u4E0D\u80FD\u4E3A\u7A7A"
              }
            ]
          },
          password: {
            rules: [
              {
                required: true,
                errorMessage: "\u4E0D\u80FD\u4E3A\u7A7A"
              },
              {
                minLength: 3,
                maxLength: 10,
                errorMessage: "\u5BC6\u7801\u957F\u5EA6\u5728 {minLength} \u5230 {maxLength} \u4E2A\u5B57\u7B26"
              }
            ]
          }
        }
      };
    },
    methods: {
      goBack() {
        uni.navigateBack();
      },
      loginCaptcha() {
        uni.navigateTo({
          url: "/pages/login/login-sms"
        });
      },
      forgetPwd() {
        uni.showToast({
          title: "\u5FD8\u8BB0\u5BC6\u7801",
          icon: "error"
        });
      },
      loginPwd() {
        this.$refs.form.validate().then((data) => {
          formatAppLog("log", "at pages/login/login-pwd.vue:88", "\u8868\u5355\u4FE1\u606F\uFF1A", data);
          this.userData = data;
          uni.showLoading({
            title: "\u767B\u9646\u6210\u529F\uFF0C\u8DF3\u8F6C\u5230\u9996\u9875..."
          });
          setTimeout(() => {
            uni.hideLoading();
            uni.navigateTo({
              url: "/pages/home/home"
            });
          }, 1e3);
        }).catch((err) => {
          formatAppLog("log", "at pages/login/login-pwd.vue:101", "\u6821\u9A8C\u5931\u8D25,\u9519\u8BEF\u4FE1\u606F\uFF1A", err);
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_1);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_2);
    const _component_social_links = resolveEasycom(vue.resolveDynamicComponent("social-links"), __easycom_3);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" X \u8FD4\u56DE\u4E0A\u4E00\u4E2A\u9875\u9762 "),
      vue.createElementVNode("view", { class: "close" }, [
        vue.createVNode(_component_uni_icons, {
          onClick: $options.goBack,
          type: "closeempty",
          size: "60rpx"
        }, null, 8, ["onClick"])
      ]),
      vue.createElementVNode("view", { class: "title" }, [
        vue.createElementVNode("text", null, "\u8D26\u53F7\u5BC6\u7801\u767B\u5F55")
      ]),
      vue.createCommentVNode(" \u8F93\u5165\u8868\u5355 "),
      vue.createVNode(_component_uni_forms, {
        class: "form",
        rules: $data.rules,
        model: $data.formData,
        ref: "form"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, {
            class: "form-item",
            name: "username"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                modelValue: $data.formData.username,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.username = $event),
                inputBorder: false,
                placeholder: "\u6635\u79F0/\u624B\u673A\u53F7/\u90AE\u7BB1",
                placeholderStyle: "font-size:16px"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_uni_forms_item, { name: "password" }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "form-item pwd-box" }, [
                vue.createVNode(_component_uni_easyinput, {
                  inputBorder: false,
                  type: "password",
                  modelValue: $data.formData.password,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.password = $event),
                  placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                  placeholderStyle: "font-size:16px"
                }, null, 8, ["modelValue"]),
                vue.createElementVNode("view", {
                  onClick: _cache[2] || (_cache[2] = (...args) => $options.forgetPwd && $options.forgetPwd(...args))
                }, "\u5FD8\u8BB0\u5BC6\u7801?")
              ])
            ]),
            _: 1
          }),
          vue.createElementVNode("button", {
            class: "login-btn",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.loginPwd && $options.loginPwd(...args))
          }, "\u767B\u5F55"),
          vue.createCommentVNode(" \u767B\u5F55\u9047\u5230\u95EE\u9898 "),
          vue.createElementVNode("view", { class: "link-box" }, [
            vue.createElementVNode("text", {
              class: "link",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.loginCaptcha && $options.loginCaptcha(...args))
            }, "\u9A8C\u8BC1\u7801\u767B\u5F55"),
            vue.createElementVNode("view", { class: "sep" }),
            vue.createElementVNode("text", { class: "link" }, "\u767B\u5F55\u9047\u5230\u95EE\u9898")
          ]),
          vue.createCommentVNode(" \u793E\u4EA4\u7EC4\u4EF6 "),
          vue.createVNode(_component_social_links)
        ]),
        _: 1
      }, 8, ["rules", "model"])
    ]);
  }
  const PagesLoginLoginPwd = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-ed63c5a0"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/login/login-pwd.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        formData: {
          phone: "",
          smscode: ""
        },
        userData: {},
        loadTime: 60,
        isDisabled: false,
        rules: {
          phone: {
            rules: [
              {
                required: true,
                errorMessage: "\u624B\u673A\u53F7\u4E0D\u80FD\u4E3A\u7A7A"
              },
              {
                validateFunction: function(rule, value, data, callback) {
                  if (value.length < 11) {
                    callback("\u8BF7\u8F93\u5165\u6B63\u786E\u624B\u673A\u53F7");
                  }
                  return true;
                }
              }
            ]
          },
          smscode: {
            rules: [
              {
                required: true,
                errorMessage: "\u9A8C\u8BC1\u7801\u4E0D\u80FD\u4E3A\u7A7A"
              },
              {
                validateFunction: function(rule, value, data, callback) {
                  if (value.length < 6) {
                    callback("\u8BF7\u8F93\u5165\u6B63\u786E\u9A8C\u8BC1\u7801");
                  }
                  return true;
                }
              }
            ]
          }
        }
      };
    },
    onLoad() {
    },
    methods: {
      goBack() {
        uni.navigateBack();
      },
      toPwd() {
        uni.navigateTo({
          url: "/pages/login/login-pwd"
        });
      },
      sendCode() {
        uni.showToast({
          title: "\u53D1\u9001\u9A8C\u8BC1\u7801"
        });
        this.isDisabled = true;
        let timer = setInterval(() => {
          if (this.loadTime === 1) {
            clearInterval(timer);
            this.isDisabled = false;
          } else {
            this.loadTime--;
          }
        }, 1e3);
      },
      loginSms() {
        this.$refs.form.validate().then((data) => {
          formatAppLog("log", "at pages/login/login-sms.vue:129", "\u8868\u5355\u4FE1\u606F\uFF1A", data);
          this.userData = data;
          uni.showLoading({
            title: "\u767B\u9646\u6210\u529F\uFF0C\u8DF3\u8F6C\u5230\u9996\u9875..."
          });
          setTimeout(() => {
            uni.hideLoading();
            uni.navigateTo({
              url: "/pages/home/home"
            });
          }, 1e3);
        }).catch((err) => {
          formatAppLog("log", "at pages/login/login-sms.vue:142", "\u6821\u9A8C\u5931\u8D25,\u9519\u8BEF\u4FE1\u606F\uFF1A", err);
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_1);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_2);
    const _component_social_links = resolveEasycom(vue.resolveDynamicComponent("social-links"), __easycom_3);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" X \u8FD4\u56DE\u4E0A\u4E00\u4E2A\u9875\u9762 "),
      vue.createElementVNode("view", { class: "close" }, [
        vue.createVNode(_component_uni_icons, {
          onClick: $options.goBack,
          type: "closeempty",
          size: "60rpx"
        }, null, 8, ["onClick"])
      ]),
      vue.createElementVNode("view", { class: "title" }, [
        vue.createElementVNode("text", null, "\u624B\u673A\u9A8C\u8BC1\u7801\u767B\u5F55")
      ]),
      vue.createVNode(_component_uni_forms, {
        class: "form",
        model: $data.formData,
        ref: "form",
        rules: $data.rules
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, { name: "phone" }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "phone-box" }, [
                vue.createElementVNode("view", { class: "area" }, "+86"),
                vue.createVNode(_component_uni_easyinput, {
                  type: "number",
                  inputBorder: false,
                  modelValue: $data.formData.phone,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.phone = $event),
                  maxlength: "11",
                  placeholder: "\u624B\u673A\u53F7",
                  placeholderStyle: "font-size:16px"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _: 1
          }),
          vue.createVNode(_component_uni_forms_item, { name: "smscode" }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "sms-box" }, [
                vue.createVNode(_component_uni_easyinput, {
                  clearable: false,
                  inputBorder: false,
                  modelValue: $data.formData.smscode,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.smscode = $event),
                  type: "number",
                  maxlength: "6",
                  placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
                  placeholderStyle: "font-size:16px"
                }, null, 8, ["modelValue"]),
                vue.withDirectives(vue.createElementVNode("button", {
                  class: "sms-btn",
                  onClick: _cache[2] || (_cache[2] = (...args) => $options.sendCode && $options.sendCode(...args))
                }, "\u83B7\u53D6\u9A8C\u8BC1\u7801", 512), [
                  [vue.vShow, !$data.isDisabled]
                ]),
                vue.withDirectives(vue.createElementVNode("text", { class: "disabled-btn" }, vue.toDisplayString($data.loadTime) + "s\u540E\u91CD\u65B0\u53D1\u9001", 513), [
                  [vue.vShow, $data.isDisabled]
                ])
              ])
            ]),
            _: 1
          }),
          vue.createElementVNode("button", {
            class: "login-btn",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.loginSms && $options.loginSms(...args))
          }, "\u767B\u5F55"),
          vue.createCommentVNode(" \u767B\u5F55\u9047\u5230\u95EE\u9898 "),
          vue.createElementVNode("view", { class: "link-box" }, [
            vue.createElementVNode("text", {
              class: "link",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.toPwd && $options.toPwd(...args))
            }, "\u8D26\u53F7\u5BC6\u7801\u767B\u5F55"),
            vue.createElementVNode("view", { class: "sep" }),
            vue.createElementVNode("text", { class: "link" }, "\u767B\u5F55\u9047\u5230\u95EE\u9898")
          ]),
          vue.createCommentVNode(" \u793E\u4EA4\u7EC4\u4EF6 "),
          vue.createVNode(_component_social_links)
        ]),
        _: 1
      }, 8, ["model", "rules"])
    ]);
  }
  const PagesLoginLoginSms = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-ebf93849"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/login/login-sms.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, "Search\u9875\u9762");
  }
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/search/search.vue"]]);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/story/story", PagesStoryStory);
  __definePage("pages/home/search-detail/search-detail", PagesHomeSearchDetailSearchDetail);
  __definePage("pages/message/message", PagesMessageMessage);
  __definePage("pages/profile/profile", PagesProfileProfile);
  __definePage("pages/login/login-pwd", PagesLoginLoginPwd);
  __definePage("pages/login/login-sms", PagesLoginLoginSms);
  __definePage("pages/search/search", PagesSearchSearch);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:50", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/App.vue"]]);
  const mixin = {
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    methods: {
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = false;
        this.parent = this.$u.$parent.call(this, parentName);
        if (this.parent) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
          this.parentData.value = this.parent.modelValue;
        }
      },
      preventEvent(e) {
        e && e.stopPropagation && e.stopPropagation();
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeUnmount() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index) => {
          if (child === this) {
            childrenList.splice(index, 1);
          }
        });
      }
    }
  };
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o = isArray(obj) ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (var prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (typeof source[prop] !== "object") {
            target[prop] = source[prop];
          } else {
            if (target[prop].concat && source[prop].concat) {
              target[prop] = target[prop].concat(source[prop]);
            } else {
              target[prop] = deepMerge(target[prop], source[prop]);
            }
          }
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
  }
  function date(value) {
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    } else if (value.length === 8) {
      return xreg.test(value);
    } else {
      return false;
    }
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    let reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    let reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (0 === value || isNaN(value))
          return true;
        break;
      case "object":
        if (null === value || value.length === 0)
          return true;
        for (var i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value == "string") {
      try {
        var obj = JSON.parse(value);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code
  };
  class Request {
    setConfig(customConfig) {
      this.config = deepMerge(this.config, customConfig);
    }
    request(options = {}) {
      if (this.interceptor.request && typeof this.interceptor.request === "function") {
        let interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          return new Promise(() => {
          });
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || "";
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise((resolve, reject) => {
        options.complete = (response) => {
          uni.hideLoading();
          clearTimeout(this.config.timer);
          this.config.timer = null;
          if (this.config.originalData) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              let resInterceptors = this.interceptor.response(response);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response);
              }
            } else {
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (this.interceptor.response && typeof this.interceptor.response === "function") {
                let resInterceptors = this.interceptor.response(response.data);
                if (resInterceptors !== false) {
                  resolve(resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                resolve(response.data);
              }
            } else {
              reject(response);
            }
          }
        };
        options.url = test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
        if (this.config.showLoading && !this.config.timer) {
          this.config.timer = setTimeout(() => {
            uni.showLoading({
              title: this.config.loadingText,
              mask: this.config.loadingMask
            });
            this.config.timer = null;
          }, this.config.loadingTime);
        }
        uni.request(options);
      });
    }
    constructor() {
      this.config = {
        baseUrl: "",
        header: {},
        method: "POST",
        dataType: "json",
        responseType: "text",
        showLoading: true,
        loadingText: "\u8BF7\u6C42\u4E2D...",
        loadingTime: 800,
        timer: null,
        originalData: false,
        loadingMask: true
      };
      this.interceptor = {
        request: null,
        response: null
      };
      this.get = (url2, data = {}, header = {}) => {
        return this.request({
          method: "GET",
          url: url2,
          header,
          data
        });
      };
      this.post = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "POST",
          header,
          data
        });
      };
      this.put = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "PUT",
          header,
          data
        });
      };
      this.delete = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "DELETE",
          header,
          data
        });
      };
    }
  }
  const http = new Request();
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (let key in data) {
      let value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(key + "[" + i + "]=" + value[i]);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(key + "=" + _value);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(key + "=" + commaStr);
            break;
          default:
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
        }
      } else {
        _result.push(key + "=" + value);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        params: {},
        animationType: "pop-in",
        animationDuration: 300,
        intercept: false
      };
      this.route = this.route.bind(this);
    }
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += "&" + query;
      } else {
        query = uni.$u.queryParams(params);
        return url2 += query;
      }
    }
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = uni.$u.deepClone(options, this.config);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    openPage(config2) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]")
        throw new TypeError(
          "fillString must be String"
        );
      let str = this;
      if (str.length >= maxLength)
        return String(str);
      let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
      while (times >>= 1) {
        fillString += fillString;
        if (times === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let date2 = new Date(dateTime);
    let ret;
    let opt = {
      "y+": date2.getFullYear().toString(),
      "m+": (date2.getMonth() + 1).toString(),
      "d+": date2.getDate().toString(),
      "h+": date2.getHours().toString(),
      "M+": date2.getMinutes().toString(),
      "s+": date2.getSeconds().toString()
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      }
    }
    return fmt;
  }
  function timeFrom(dateTime = null, format = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let timestamp = +new Date(Number(dateTime));
    let timer = (Number(new Date()) - timestamp) / 1e3;
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "\u521A\u521A";
        break;
      case (timer >= 300 && timer < 3600):
        tips = parseInt(timer / 60) + "\u5206\u949F\u524D";
        break;
      case (timer >= 3600 && timer < 86400):
        tips = parseInt(timer / 3600) + "\u5C0F\u65F6\u524D";
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = parseInt(timer / 86400) + "\u5929\u524D";
        break;
      default:
        if (format === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = parseInt(timer / (86400 * 30)) + "\u4E2A\u6708\u524D";
          } else {
            tips = parseInt(timer / (86400 * 365)) + "\u5E74\u524D";
          }
        } else {
          tips = timeFormat(timestamp, format);
        }
    }
    return tips;
  }
  function guid(len = 32, firstU = true, radix = null) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return "u" + uuid.join("");
    } else {
      return uuid.join("");
    }
  }
  let color = {
    primary: "#2979ff",
    primaryDark: "#2b85e4",
    primaryDisabled: "#a0cfff",
    primaryLight: "#ecf5ff",
    bgColor: "#f3f4f6",
    info: "#909399",
    infoDark: "#82848a",
    infoDisabled: "#c8c9cc",
    infoLight: "#f4f4f5",
    warning: "#ff9900",
    warningDark: "#f29100",
    warningDisabled: "#fcbd71",
    warningLight: "#fdf6ec",
    error: "#fa3534",
    errorDark: "#dd6161",
    errorDisabled: "#fab6b6",
    errorLight: "#fef0f0",
    success: "#19be6b",
    successDark: "#18b566",
    successDisabled: "#71d5a1",
    successLight: "#dbf1e1",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  function addUnit(value = "auto", unit = "rpx") {
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      let gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    } else {
      return 0;
    }
  }
  function trim(str, pos = "both") {
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    } else if (pos == "left") {
      return str.replace(/^\s*/, "");
    } else if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    } else if (pos == "all") {
      return str.replace(/\s+/g, "");
    } else {
      return str;
    }
  }
  function toast(title, duration = 1500) {
    uni.showToast({
      title,
      icon: "none",
      duration
    });
  }
  function getParent(name, keys) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        let data = {};
        if (Array.isArray(keys)) {
          keys.map((val) => {
            data[val] = parent[val] ? parent[val] : "";
          });
        } else {
          for (let i in keys) {
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return data;
      }
    }
    return {};
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function os() {
    return uni.getSystemInfoSync().platform;
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  let timeout = null;
  function debounce(func, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func === "function" && func();
    } else {
      timeout = setTimeout(function() {
        typeof func === "function" && func();
      }, wait);
    }
  }
  let timeoutArr = [];
  let flagArr = [];
  function throttle(fn, time = 500, isImmediate = true, timeoutName = "default") {
    if (!timeoutArr[timeoutName])
      timeoutArr[timeoutName] = null;
    if (isImmediate) {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        if (typeof fn === "function")
          fn();
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
        }, time);
      }
    } else {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
          if (typeof fn === "function")
            fn();
        }, time);
      }
    }
  }
  let version = "1.10.1";
  const config = {
    v: version,
    version,
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ]
  };
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  function wranning(str) {
    {
      formatAppLog("warn", "at uni_modules/vk-uview-ui/index.js:13", str);
    }
  }
  const $u = {
    queryParams,
    route,
    timeFormat,
    date: timeFormat,
    timeFrom,
    colorGradient: colorGradient$1.colorGradient,
    colorToRgba: colorGradient$1.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    wranning,
    get: http.get,
    post: http.post,
    put: http.put,
    "delete": http.delete,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    addUnit,
    trim,
    type: ["primary", "success", "error", "warning", "info"],
    http,
    toast,
    config,
    zIndex,
    debounce,
    throttle
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.mixin(mixin);
    Vue2.config.globalProperties.$u = $u;
  };
  const uView = {
    install
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(uView);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
