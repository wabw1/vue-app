<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="btn-wrapper">
      <button @click="loginPwd">密码登录</button>
      <view class="sep"></view>
      <button @click="loginCaptcha">手机验证码</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello'
    };
  },
  onLoad() {},
  methods: {
    loginPwd() {
      uni.navigateTo({
        url: '/pages/login/login-pwd'
      });
    },
    loginCaptcha() {
      uni.navigateTo({
        url: '/pages/login/login-sms'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btn-wrapper {
  display: flex;
  margin: 20rpx;
  button {
    background-color: transparent;
    border-style: none;
  }
  .sep {
    width: 2rpx;
    margin: 10rpx;
    background-color: gray;
  }
}
.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
</style>
