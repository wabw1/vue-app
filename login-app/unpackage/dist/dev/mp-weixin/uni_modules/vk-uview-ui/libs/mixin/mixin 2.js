"use strict";
const common_vendor = require("../../../../common/vendor.js");
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
        common_vendor.index.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
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
    common_vendor.index.$emit("uOnReachBottom");
  },
  beforeUnmount() {
    if (this.parent && common_vendor.index.$u.test.array(this.parent.children)) {
      const childrenList = this.parent.children;
      childrenList.map((child, index) => {
        if (child === this) {
          childrenList.splice(index, 1);
        }
      });
    }
  }
};
exports.mixin = mixin;
