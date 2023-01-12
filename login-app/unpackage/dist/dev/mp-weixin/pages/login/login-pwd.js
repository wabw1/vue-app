"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
      common_vendor.index.navigateBack();
    },
    loginCaptcha() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login-sms"
      });
    },
    forgetPwd() {
      common_vendor.index.showToast({
        title: "\u5FD8\u8BB0\u5BC6\u7801",
        icon: "error"
      });
    },
    loginPwd() {
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
    c: common_vendor.o(($event) => $data.formData.username = $event),
    d: common_vendor.p({
      inputBorder: false,
      placeholder: "\u6635\u79F0/\u624B\u673A\u53F7/\u90AE\u7BB1",
      placeholderStyle: "font-size:16px",
      modelValue: $data.formData.username
    }),
    e: common_vendor.p({
      name: "username"
    }),
    f: common_vendor.o(($event) => $data.formData.password = $event),
    g: common_vendor.p({
      inputBorder: false,
      type: "password",
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      placeholderStyle: "font-size:16px",
      modelValue: $data.formData.password
    }),
    h: common_vendor.o((...args) => $options.forgetPwd && $options.forgetPwd(...args)),
    i: common_vendor.p({
      name: "password"
    }),
    j: common_vendor.o((...args) => $options.loginPwd && $options.loginPwd(...args)),
    k: common_vendor.o((...args) => $options.loginCaptcha && $options.loginCaptcha(...args)),
    l: common_vendor.sr("form", "ed63c5a0-1"),
    m: common_vendor.p({
      rules: $data.rules,
      model: $data.formData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ed63c5a0"], ["__file", "/Users/wangbo/Desktop/Github/vue-app/login-app/pages/login/login-pwd.vue"]]);
wx.createPage(MiniProgramPage);
