<template>
  <view class="tabs">
    <u-tabs :list="list" :is-scroll="true" v-model="current" @change="change" height="80"></u-tabs>
  </view>
</template>

<script>
export default {
  name: 'my-tabs',
  data() {
    return {
      list: [
        {
          name: '圈子'
        },
        {
          name: '热点'
        },
        {
          name: '活动'
        },
        {
          name: '公告'
        },
        {
          name: '话题'
        }
      ],
      current: 0
    };
  },
  methods: {
    change(index) {
      console.log(index);
    }
  }
};
</script>

<style lang="scss">
.tabs {
  display: flex;
  justify-content: center;
}
</style>
