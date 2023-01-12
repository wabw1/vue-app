<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function() {
    console.log('App Show');

    // #ifdef MP-WEIXIN
    uni.getSystemInfo({
      success: res => {
        const statusBarHeight = res.statusBarHeight + 'px';
        const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
        let menuWidth = menuButtonInfo.width + 'px';
        let menuHeight = menuButtonInfo.height + 'px';
        let menuBorderRadius = menuButtonInfo.height / 2 + 'px';
        let menuRight = res.screenWidth - menuButtonInfo.right + 'px';
        let menuTop = menuButtonInfo.top + 'px';
        let contentTop = res.statusBarHeight + 44 + 'px';
        let windowHeight = res.windowHeight + 'px'; //内容区高度
        let paddingRight = res.screenWidth - menuButtonInfo.left + 'px'; //胶囊左边缘距离屏幕最右的

        const menuInfo = {
          windowHeight: windowHeight,
          statusBarHeight: statusBarHeight,
          menuWidth: menuWidth,
          menuHeight: menuHeight,
          menuBorderRadius: menuBorderRadius,
          menuRight: menuRight,
          menuTop: menuTop,
          contentTop: contentTop, //真正的内容区，距顶部的margin应该为statusBarH + 44px;
          paddingRight: paddingRight
        };

        console.log('状态栏高度', statusBarHeight);
        console.log('胶囊参数', menuButtonInfo);
        console.log('paddingRight ', paddingRight);
        // console.log('内容区marginTop高度', contentTop);
        // console.log('内容区高度', windowHeight);
        uni.setStorageSync('menuInfo', menuInfo); //存在本地
      },
      // 失败错误处理
      fail: error => {
        console.log(error);
      }
    });
    // #endif
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
@import './uni_modules/vk-uview-ui/index.scss'; // 导入组件库样式
@import './static/fonts/iconfont-weapp-icon.css';
@import './static/iconfont.css';
@font-face {
  font-family: Arial, Helvetica, sans-serif;
}
/* #ifndef MP-WEIXIN */
* {
  font-family: Arial;
}
/* #endif */
</style>
