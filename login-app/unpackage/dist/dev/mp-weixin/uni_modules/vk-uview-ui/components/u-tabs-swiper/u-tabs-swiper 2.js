"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_vkUviewUi_libs_function_colorGradient = require("../../libs/function/colorGradient.js");
let color = uni_modules_vkUviewUi_libs_function_colorGradient.colorGradient;
const { windowWidth } = common_vendor.index.getSystemInfoSync();
const preId = "UEl_";
const _sfc_main = {
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
      return common_vendor.index.upx2px(this.barWidth);
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
      this.colorGradientArr = color.colorGradient(this.inactiveColor, this.activeColor, this.colorStep);
    },
    getTabsInfo() {
      return new Promise((resolve, reject) => {
        let view = common_vendor.index.createSelectorQuery().in(this);
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
      this.sW = common_vendor.index.upx2px(Number(this.swiperWidth));
    },
    emit(index) {
      this.$emit("change", index);
    },
    change() {
      this.setScrollViewToCenter();
    },
    getQuery(cb) {
      try {
        let view = common_vendor.index.createSelectorQuery().in(this).select(".u-tabs");
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
if (!Array) {
  const _easycom_u_badge2 = common_vendor.resolveComponent("u-badge");
  _easycom_u_badge2();
}
const _easycom_u_badge = () => "../u-badge/u-badge.js";
if (!Math) {
  _easycom_u_badge();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($options.getTabs, (item, index, i0) => {
      return {
        a: "d226c2b0-0-" + i0,
        b: common_vendor.p({
          count: item[$props.count] || item["count"] || 0,
          offset: $props.offset,
          size: "mini"
        }),
        c: common_vendor.t(item[$props.name] || item["name"]),
        d: common_vendor.s($options.tabItemStyle(index)),
        e: index,
        f: common_vendor.n($data.preId + index),
        g: common_vendor.o(($event) => $options.emit(index), index)
      };
    }),
    b: $props.showBar
  }, $props.showBar ? {
    c: common_vendor.s($options.tabBarStyle)
  } : {}, {
    d: !$props.isScroll ? 1 : "",
    e: $data.scrollLeft,
    f: $props.zIndex + 1,
    g: $props.zIndex,
    h: $props.bgColor
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d226c2b0"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-tabs-swiper/u-tabs-swiper.vue"]]);
wx.createComponent(Component);
