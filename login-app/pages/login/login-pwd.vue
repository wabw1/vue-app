<template>
  <view class="container">
    <!-- X 返回上一个页面 -->
    <view class="close"><uni-icons @click="goBack" type="closeempty" size="60rpx"></uni-icons></view>

    <view class="title"><text>账号密码登录</text></view>

    <!-- 输入表单 -->
    <uni-forms class="form" :rules="rules" :model="formData" ref="form">
      <uni-forms-item class="form-item" name="username">
        <uni-easyinput v-model="formData.username" :inputBorder="false" placeholder="昵称/手机号/邮箱" placeholderStyle="font-size:16px"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="password">
        <view class="form-item pwd-box">
          <uni-easyinput :inputBorder="false" type="password" v-model="formData.password" placeholder="请输入密码" placeholderStyle="font-size:16px"></uni-easyinput>
          <view @click="forgetPwd">忘记密码?</view>
        </view>
      </uni-forms-item>

      <button class="login-btn" @click="loginPwd">登录</button>

      <!-- 登录遇到问题 -->
      <view class="link-box">
        <text class="link" @click="loginCaptcha">验证码登录</text>
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
        username: '',
        passward: ''
      },
      userData: {},
      rules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: '不能为空' // 空格占位，否则会有红色错误信息
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: '不能为空'
            },
            {
              minLength: 3,
              maxLength: 10,
              errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符'
            }
          ]
        }
      }
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    loginCaptcha() {
      uni.navigateTo({
        url: '/pages/login/login-sms'
      });
    },
    forgetPwd() {
      uni.showToast({
        title: '忘记密码',
        icon: 'error'
      });
    },
    loginPwd() {
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
              url: '/pages/home/home'
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

<style scoped lang="scss">
.form {
  padding: 0 30rpx;
}

.form-item {
  display: flex;
  align-items: center;
  border-bottom: 2rpx solid lightgray;
  height: 80rpx;
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
.close {
  padding: 60rpx 20rpx 20rpx;
}
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
.login-btn {
  margin: 40rpx 20rpx;
  background-color: cornflowerblue;
  color: white;
  border-radius: 50rpx;
}
</style>
