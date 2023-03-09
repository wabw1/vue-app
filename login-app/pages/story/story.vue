<template>
  <view class="container">
    <!-- #ifdef MP-WEIXIN  -->
    <!-- 只有小程序才需要自定义的navBar -->
    <NavBar></NavBar>
    <!-- #endif -->
    <view class="page-box">
      <PostList :postList="postList" />
      <u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
    </view>
  </view>
</template>

<script>
import NavBar from "/components/navbar/navbar.vue";
import PostList from "/components/post-list/post-list.vue";

export default {
  components: {
    NavBar,
    PostList
  },
  data() {
    return {
      postList: [],
      allPost: [],
      friendIds: [],
      loadStatus: "nomore"
    };
  },
  // 新增帖子, 跳转到新增页面
  onNavigationBarButtonTap(e) {
    uni.navigateTo({
      url: "/pages/createPost/createPost"
    });
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {}, 500);
    uni.stopPullDownRefresh();
  },
  onShow() {
    console.log("onshow");
    this.getFriendIds();
  },
  onLoad() {},
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      uni.stopPullDownRefresh();
    }, 500);
  },

  methods: {
    getFriendIds() {
      uniCloud
        .callFunction({
          name: "getFollows",
          data: {
            userId: "63f6f299f5cf3ae5107944b1"
          }
        })
        .then(res => res.result.data)
        .then(friendIds => {
          this.friendIds = friendIds;
          if (this.friendIds.length > 0) {
            uniCloud
              .callFunction({
                name: "getAllPost"
              })
              .then(res => {
                this.allPost = res.result;
                this.postList = [];
                this.allPost.forEach(post => {
                  if (this.friendIds.includes(post.user_id)) {
                    this.postList.push(post);
                  }
                });
              });
          }
        })
        .catch(err => {
          console.log("请求好友 id 失败", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  display: flex;
  flex-direction: column;
}
</style>
