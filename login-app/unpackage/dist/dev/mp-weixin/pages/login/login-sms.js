"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
      common_vendor.index.navigateBack();
    },
    toPwd() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login-pwd"
      });
    },
    sendCode() {
      common_vendor.index.showToast({
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
        console.log("\u8868\u5355\u4FE1\u606F\uFF1A", data);
        this.userData = data;
        common_vendor.index.showLoading({
          title: "\u767B\u9646\u6210\u529F\uFF0C\u8DF3\u8F6C\u5230\u9996\u9875..."
        });
        setTimeout(() => {
          common_vendor.index.hideLoading();
          common_vendor.index.navigateTo({
            url: "/pages/home/home"
          });
        }, 1e3);
      }).catch((err) => {
        console.log("\u6821\u9A8C\u5931\u8D25,\u9519\u8BEF\u4FE1\u606F\uFF1A", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_social_links2 = common_vendor.resolveComponent("social-links");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_icons2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_social_links2 + _easycom_uni_forms2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_social_links = () => "../../components/social-links/social-links.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_social_links + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.goBack),
    b: common_vendor.p({
      type: "closeempty",
      size: "60rpx"
    }),
    c: common_vendor.o(($event) => $data.formData.phone = $event),
    d: common_vendor.p({
      type: "number",
      inputBorder: false,
      maxlength: "11",
      placeholder: "\u624B\u673A\u53F7",
      placeholderStyle: "font-size:16px",
      modelValue: $data.formData.phone
    }),
    e: common_vendor.p({
      name: "phone"
    }),
    f: common_vendor.o(($event) => $data.formData.smscode = $event),
    g: common_vendor.p({
      clearable: false,
      inputBorder: false,
      type: "number",
      maxlength: "6",
      placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
      placeholderStyle: "font-size:16px",
      modelValue: $data.formData.smscode
    }),
    h: !$data.isDisabled,
    i: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    j: common_vendor.t($data.loadTime),
    k: $data.isDisabled,
    l: common_vendor.p({
      name: "smscode"
    }),
    m: common_vendor.o((...args) => $options.loginSms && $options.loginSms(...args)),
    n: common_vendor.o((...args) => $options.toPwd && $options.toPwd(...args)),
    o: common_vendor.sr("form", "ebf93849-1"),
    p: common_vendor.p({
      model: $data.formData,
      rules: $data.rules
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ebf93849"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/login/login-sms.vue"]]);
wx.createPage(MiniProgramPage);
