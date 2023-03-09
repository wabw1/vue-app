<template>
  <view class="content">
    <text class="title">搜索历史</text>
    <view class="wrapper">
      <view class="card" v-for="(item, idx) in historyList" key="idx">{{
        item
      }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      historyList: [],
      curInput: ""
    };
  },
  methods: {},
  onLoad() {},
  // onshow 生命周期获取 搜索历史缓存
  onShow() {
    console.log("Search 组件on show");
    uni.getStorage({
      key: "search_history",
      success: res => {
        this.historyList = res.data || []; //进入页面, 使用缓存初始化
        console.log("history:", this.historyList);
      },
      fail: err => {
        console.log(err);
      }
    });
  },
  onHide() {},
  onNavigationBarSearchInputChanged(e) {
    this.curInput = e.text;
  },
  onNavigationBarSearchInputConfirmed(e) {
    this.historyList.unshift(e.text); //前方插入 text
    uni.setStorage({
      key: "search_history",
      data: this.historyList,
      success: function() {
        console.log("缓存成功");
      }
    });
  },
  // 点搜索, 添加入历史记录
  onNavigationBarButtonTap(e) {
    this.historyList.unshift(this.curInput);
    uni.setStorage({
      key: "search_history",
      data: this.historyList,
      success: function() {
        console.log("缓存成功");
      }
    });
  },
  // 返回主页
  onBackPress() {
    uni.navigateTo({
      url: "/pages/home/home"
    });
  }
};
</script>

<style lang="scss" scoped>
page {
  box-sizing: border-box;
}
.content {
  height: 100%;
  padding: 4rpx;
  .title {
    font-size: $uni-font-size-lg;
    margin: 12rpx auto 20rpx 12rpx;
    font-weight: bold;
  }
  .wrapper {
    display: flex;

    .card {
      border: 1px solid $uni-border-color;
      padding: 4rpx 20rpx;
      margin: 8rpx 12rpx;
    }
  }
}
</style>
