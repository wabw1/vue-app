<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function() {
    console.log('App Show');
    // uni.hideHomeButton();
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style>
/* 引入iconfont自定义图标库 */
/* @import '@/static/iconfont.css'; */

/* 彩色图标的引入，依然是全局引入样式 */
@import './static/fonts/iconfont-weapp-icon.css';

/*每个页面公共css */
@font-face {
  font-family: Arial, Helvetica, sans-serif;
}
/* #ifndef MP-WEIXIN */
* {
  font-family: Arial;
}
/* #endif */
</style>
