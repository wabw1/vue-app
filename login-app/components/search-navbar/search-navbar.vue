<template>
  <view class="bars">
    <view class="status-bar" :style="{ height: statusBarHeight }"></view>
    <view class="nav-bar" :style="{ height: navBarHeight, paddingRight: paddingRight }">
      <view class="backIcon"><uni-icons type="back" size="36" color="#fff"></uni-icons></view>
      <view class="search-input"><input type="text" placeholder="搜索帖子" @focus="toSearchPage" /></view>
      <view class="noteIcon"><uni-icons custom-prefix="iconfont" type="icon-pencil-white" size="36"></uni-icons></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'search-navbar',
  onShow() {
    console.log('获得的paddingR:', this.paddingRight);
  },
  data() {
    return {
      windowHeight: uni.getStorageSync('menuInfo').windowHeight, //窗体高度，暂时没用
      navBarHeight: '44px',
      statusBarHeight: uni.getStorageSync('menuInfo').statusBarHeight,
      menuHeight: uni.getStorageSync('menuInfo').menuHeight,
      menuWidth: uni.getStorageSync('menuInfo').menuWidth,
      menuRight: uni.getStorageSync('menuInfo').menuRight,
      contentTop: uni.getStorageSync('menuInfo').contentTop,
      paddingRight: uni.getStorageSync('menuInfo').paddingRight //右边胶囊的位置空出来
    };
  },
  methods: {
    toSearchPage() {
      uni.navigateTo({
        url: '/pages/home/search-detail/search-detail' //跳转到搜索详情页
      });
    }
  }
};
</script>

<style lang="scss">
.bars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .status-bar {
    background-color: #82aae3;
  }
  .nav-bar {
    // width: 100%;
    background-color: #82aae3;
    display: flex;
    // align-items: center;
    width: 100%;
    padding-left: 6px;
    padding-top: 4px;
    .search-input {
      flex: 1;
      background-color: #fff;
      padding: 5px;
      height: 32px;
      border-radius: 6px;
    }
    .backIcon {
      width: 40px;
    }
    .noteIcon {
      width: 40px;
      text-align: center;
    }
  }
}
</style>
