"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-tabs",
  emits: ["update:modelValue", "input", "change"],
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    modelValue: {
      type: [Number, String],
      default: 0
    },
    current: {
      type: [Number, String],
      default: 0
    },
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
    height: {
      type: [String, Number],
      default: 80
    },
    fontSize: {
      type: [String, Number],
      default: 30
    },
    duration: {
      type: [String, Number],
      default: 0.5
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
      type: [String, Number],
      default: 40
    },
    barHeight: {
      type: [String, Number],
      default: 6
    },
    gutter: {
      type: [String, Number],
      default: 30
    },
    bgColor: {
      type: String,
      default: "#ffffff"
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
    },
    itemWidth: {
      type: [Number, String],
      default: "auto"
    }
  },
  data() {
    return {
      scrollLeft: 0,
      tabQueryInfo: [],
      componentWidth: 0,
      scrollBarLeft: 0,
      parentLeft: 0,
      id: this.$u.guid(),
      currentIndex: this.current,
      barFirstTimeMove: true
    };
  },
  watch: {
    list(n, o) {
      if (n.length !== o.length)
        this.currentIndex = 0;
      this.$nextTick(() => {
        this.init();
      });
    },
    current: {
      immediate: true,
      handler(nVal, oVal) {
        this.$nextTick(() => {
          this.currentIndex = nVal;
          this.scrollByIndex();
        });
      }
    },
    valueCom: {
      immediate: true,
      handler(nVal, oVal) {
        this.$nextTick(() => {
          this.currentIndex = nVal;
          this.scrollByIndex();
        });
      }
    }
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    tabBarStyle() {
      let style = {
        width: this.barWidth + "rpx",
        transform: `translate(${this.scrollBarLeft}px, -100%)`,
        "transition-duration": `${this.barFirstTimeMove ? 0 : this.duration}s`,
        "background-color": this.activeColor,
        height: this.barHeight + "rpx",
        "border-radius": `${this.barHeight / 2}px`
      };
      Object.assign(style, this.barStyle);
      return style;
    },
    tabItemStyle() {
      return (index) => {
        let style = {
          height: this.height + "rpx",
          "line-height": this.height + "rpx",
          "font-size": this.fontSize + "rpx",
          "transition-duration": `${this.duration}s`,
          padding: this.isScroll ? `0 ${this.gutter}rpx` : "",
          flex: this.isScroll ? "auto" : "1",
          width: this.$u.addUnit(this.itemWidth)
        };
        if (index == this.currentIndex && this.bold)
          style.fontWeight = "bold";
        if (index == this.currentIndex) {
          style.color = this.activeColor;
          style = Object.assign(style, this.activeItemStyle);
        } else {
          style.color = this.inactiveColor;
        }
        return style;
      };
    }
  },
  methods: {
    async init() {
      let tabRect = await this.$uGetRect("#" + this.id);
      this.parentLeft = tabRect.left;
      this.componentWidth = tabRect.width;
      this.getTabRect();
    },
    clickTab(index) {
      if (index == this.currentIndex)
        return;
      this.$emit("change", index);
      this.$emit("input", index);
      this.$emit("update:modelValue", index);
    },
    getTabRect() {
      let query = common_vendor.index.createSelectorQuery().in(this);
      for (let i = 0; i < this.list.length; i++) {
        query.select(`#u-tab-item-${i}`).fields({
          size: true,
          rect: true
        });
      }
      query.exec(
        function(res) {
          this.tabQueryInfo = res;
          this.scrollByIndex();
        }.bind(this)
      );
    },
    scrollByIndex() {
      let tabInfo = this.tabQueryInfo[this.currentIndex];
      if (!tabInfo)
        return;
      let tabWidth = tabInfo.width;
      let offsetLeft = tabInfo.left - this.parentLeft;
      let scrollLeft = offsetLeft - (this.componentWidth - tabWidth) / 2;
      this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;
      let left = tabInfo.left + tabInfo.width / 2 - this.parentLeft;
      this.scrollBarLeft = left - common_vendor.index.upx2px(this.barWidth) / 2;
      if (this.barFirstTimeMove == true) {
        setTimeout(() => {
          this.barFirstTimeMove = false;
        }, 100);
      }
    }
  },
  mounted() {
    this.init();
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
    a: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: "750d9d75-0-" + i0,
        b: common_vendor.p({
          count: item[$props.count] || item["count"] || 0,
          offset: $props.offset,
          size: "mini"
        }),
        c: common_vendor.t(item[$props.name] || item["name"]),
        d: "u-tab-item-" + index,
        e: index,
        f: common_vendor.o(($event) => $options.clickTab(index), index),
        g: common_vendor.s($options.tabItemStyle(index))
      };
    }),
    b: $props.showBar
  }, $props.showBar ? {
    c: common_vendor.s($options.tabBarStyle)
  } : {}, {
    d: $data.id,
    e: !$props.isScroll ? 1 : "",
    f: $data.scrollLeft,
    g: $data.id,
    h: $props.bgColor
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-750d9d75"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/uni_modules/vk-uview-ui/components/u-tabs/u-tabs.vue"]]);
wx.createComponent(Component);
