<template>
  <!-- 社交 -->
  <view class="social-box">
    <view class="social-title">
      <view class="row-sep"></view>
      <text>社交账号登录</text>
      <view class="row-sep"></view>
    </view>

    <view class="icon-box">
      <text class="t-icon t-icon-imagewechat" @click="loginWx"></text>
      <text class="t-icon t-icon-QQ" @click="loginQQ"></text>
      <text class="t-icon t-icon-weibo" @click="loginWb"></text>
    </view>
    <view class="agreements">
      注册即代表同意
      <text class="link">《xxx社区协议》</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'social-links',
  data() {
    return {};
  },
  methods: {
    loginWx() {
      uni.showToast({
        title: '微信登录...'
      });
    },
    loginQQ() {
      uni.showToast({
        title: 'QQ登录...'
      });
    },
    loginWb() {
      uni.showToast({
        title: 'weibo登录...'
      });
    }
  }
};
</script>

<style lang="scss">
.social-box {
  padding: 40rpx 10rpx;
  display: flex;
  flex-direction: column;
  .social-title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    .row-sep {
      width: 120rpx;
      height: 2rpx;
      margin: auto 30rpx;
      background-color: lightgray;
    }
  }
  .icon-box {
    padding: 20rpx 60rpx;
    margin: 20rpx 0;
    .t-icon {
      width: 100rpx;
      height: 100rpx;
      margin-right: 10rpx;
    }
  }
  .agreements {
    text-align: center;
    color: gray;
    .link {
      color: #2e8ad7;
    }
  }
}
</style>
