"use strict";
const common_vendor = require("../../../../common/vendor.js");
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
  addRootPath(url) {
    return url[0] === "/" ? url : `/${url}`;
  }
  mixinParam(url, params) {
    url = url && this.addRootPath(url);
    let query = "";
    if (/.*\/.*\?.*=.*/.test(url)) {
      query = common_vendor.index.$u.queryParams(params, false);
      return url += "&" + query;
    } else {
      query = common_vendor.index.$u.queryParams(params);
      return url += query;
    }
  }
  async route(options = {}, params = {}) {
    let mergeConfig = {};
    if (typeof options === "string") {
      mergeConfig.url = this.mixinParam(options, params);
      mergeConfig.type = "navigateTo";
    } else {
      mergeConfig = common_vendor.index.$u.deepClone(options, this.config);
      mergeConfig.url = this.mixinParam(options.url, options.params);
    }
    if (params.intercept) {
      this.config.intercept = params.intercept;
    }
    mergeConfig.params = params;
    mergeConfig = common_vendor.index.$u.deepMerge(this.config, mergeConfig);
    if (typeof common_vendor.index.$u.routeIntercept === "function") {
      const isNext = await new Promise((resolve, reject) => {
        common_vendor.index.$u.routeIntercept(mergeConfig, resolve);
      });
      isNext && this.openPage(mergeConfig);
    } else {
      this.openPage(mergeConfig);
    }
  }
  openPage(config) {
    const {
      url,
      type,
      delta,
      animationType,
      animationDuration
    } = config;
    if (config.type == "navigateTo" || config.type == "to") {
      common_vendor.index.navigateTo({
        url,
        animationType,
        animationDuration
      });
    }
    if (config.type == "redirectTo" || config.type == "redirect") {
      common_vendor.index.redirectTo({
        url
      });
    }
    if (config.type == "switchTab" || config.type == "tab") {
      common_vendor.index.switchTab({
        url
      });
    }
    if (config.type == "reLaunch" || config.type == "launch") {
      common_vendor.index.reLaunch({
        url
      });
    }
    if (config.type == "navigateBack" || config.type == "back") {
      common_vendor.index.navigateBack({
        delta
      });
    }
  }
}
const route = new Router().route;
exports.route = route;
