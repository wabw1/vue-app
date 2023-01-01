<template>
  <view class="container">
    <!-- X 返回上一个页面 -->
    <view class="close"><uni-icons @click="goBack" type="closeempty" size="60rpx"></uni-icons></view>

    <view class="title"><text>手机验证码登录</text></view>

    <uni-forms class="form" :model="formData" ref="form" :rules="rules">
      <uni-forms-item name="phone">
        <view class="phone-box">
          <view class="area">+86</view>
          <uni-easyinput type="number" :inputBorder="false" v-model="formData.phone" maxlength="11" placeholder="手机号" placeholderStyle="font-size:16px" />
        </view>
      </uni-forms-item>
      <uni-forms-item name="smscode">
        <view class="sms-box">
          <uni-easyinput
            :clearable="false"
            :inputBorder="false"
            v-model="formData.smscode"
            type="number"
            maxlength="6"
            placeholder="请输入验证码"
            placeholderStyle="font-size:16px"
          />

          <button v-show="!isDisabled" class="sms-btn" @tap="sendCode">获取验证码</button>
          <text v-show="isDisabled" class="disabled-btn">{{ loadTime }}s后重新发送</text>
        </view>
      </uni-forms-item>

      <button class="login-btn" @tap="loginSms">登录</button>

      <!-- 登录遇到问题 -->
      <view class="link-box">
        <text class="link" @click="toPwd">账号密码登录</text>
        <view class="sep"></view>
        <text class="link">登录遇到问题</text>
      </view>

      <!-- 社交组件 -->
      <social-links></social-links>
    </uni-forms>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        phone: '',
        smscode: ''
      },
      userData: {},
      loadTime: 60,
      isDisabled: false,
      rules: {
        phone: {
          rules: [
            {
              required: true,
              errorMessage: '手机号不能为空' // 空格占位，否则会有红色错误信息
            },
            {
              validateFunction: function(rule, value, data, callback) {
                if (value.length < 11) {
                  //自定义校验手机号，是否为11位
                  callback('请输入正确手机号');
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
              errorMessage: '验证码不能为空'
            },
            {
              validateFunction: function(rule, value, data, callback) {
                if (value.length < 6) {
                  //自定义校验验证码是否为6位
                  callback('请输入正确验证码');
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
    // uni.hideHomeButton();
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    toPwd() {
      uni.navigateTo({
        url: '/pages/login/login-pwd'
      });
    },
    sendCode() {
      uni.showToast({
        title: '发送验证码'
      });
      // 点击按钮，开始倒计时，每1s更新文字，当剩余时间为1时关掉定时器
      this.isDisabled = true; //倒计时 为true
      let timer = setInterval(() => {
        if (this.loadTime === 1) {
          clearInterval(timer);
          this.isDisabled = false; //按钮模式，为false
        } else {
          this.loadTime--;
        }
      }, 1000);
    },

    // 登录逻辑
    loginSms() {
      this.$refs.form
        .validate()
        .then(data => {
          console.log('表单信息：', data);
          this.userData = data;
          uni.showLoading({
            title: '登陆成功，跳转到首页...'
          });
          setTimeout(() => {
            uni.hideLoading();
            uni.navigateTo({
              url: '/pages/message/message'
            });
          }, 1000);
        })
        .catch(err => {
          console.log('校验失败,错误信息：', err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.link-box {
  margin: 40rpx;
  display: flex;
  justify-content: center;
  .sep {
    width: 4rpx;
    margin: 0 20rpx;
    background-color: darkgray;
  }
  .link {
    color: #2e8ad7;
  }
}
// title的叉叉
.close {
  padding: 60rpx 20rpx 20rpx;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  .title {
    text-align: center;
    padding: 140rpx;
    font-size: 1.8rem;
    font-weight: bold;
  }
}
.form {
  padding: 0 30rpx;
}
// .form .phone-box  这样不行？flex不生效
.phone-box {
  align-items: center;
  border-bottom: 2rpx solid lightgray;
  position: relative;
  display: flex;
  height: 80rpx;
  .area {
    padding: 0 20rpx;
  }
}
.sms-box {
  display: flex;
  align-items: center;
  border-bottom: 2rpx solid lightgray;
  height: 80rpx;
  .sms-btn {
    border-radius: 0;
    background-color: cornflowerblue;
    color: white;
    font-size: 1rem;
  }
  .disabled-btn {
    padding: 5rpx 30rpx 10rpx;
  }
}
.login-btn {
  margin: 40rpx 20rpx;
  background-color: cornflowerblue;
  color: white;
  border-radius: 50rpx;
}
</style>
