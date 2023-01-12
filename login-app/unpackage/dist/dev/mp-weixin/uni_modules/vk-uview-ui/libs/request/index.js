"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_vkUviewUi_libs_function_deepMerge = require("../function/deepMerge.js");
const uni_modules_vkUviewUi_libs_function_test = require("../function/test.js");
class Request {
  setConfig(customConfig) {
    this.config = uni_modules_vkUviewUi_libs_function_deepMerge.deepMerge(this.config, customConfig);
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
        common_vendor.index.hideLoading();
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
      options.url = uni_modules_vkUviewUi_libs_function_test.test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
      if (this.config.showLoading && !this.config.timer) {
        this.config.timer = setTimeout(() => {
          common_vendor.index.showLoading({
            title: this.config.loadingText,
            mask: this.config.loadingMask
          });
          this.config.timer = null;
        }, this.config.loadingTime);
      }
      common_vendor.index.request(options);
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
    this.get = (url, data = {}, header = {}) => {
      return this.request({
        method: "GET",
        url,
        header,
        data
      });
    };
    this.post = (url, data = {}, header = {}) => {
      return this.request({
        url,
        method: "POST",
        header,
        data
      });
    };
    this.put = (url, data = {}, header = {}) => {
      return this.request({
        url,
        method: "PUT",
        header,
        data
      });
    };
    this.delete = (url, data = {}, header = {}) => {
      return this.request({
        url,
        method: "DELETE",
        header,
        data
      });
    };
  }
}
const http = new Request();
exports.http = http;
