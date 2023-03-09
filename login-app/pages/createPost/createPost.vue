<template>
  <view class="create-page">
    <!-- 文字输入-->
    <view class="content">
      <u-input
        v-model="value"
        :type="type"
        :border="border"
        :height="height"
        :auto-height="autoHeight"
        placeholder="输入发帖内容"
        backgroundColor="#f4f4f5"
        borderColor="#f4f4f5"
      />
    </view>

    <!-- 所属标签 -->
    <view class="tags">
      <u-tag :text="'# ' + tag" type="info" shape="circle" class="tag" />
    </view>

    <!-- 图片上传 -->
    <view class="upload-pics">
      <view class="title-box">
        <view class="title">点击可预览选好的图片</view>
        <view class="cnt">{{ imageList.length }}/9</view>
      </view>
      <u-upload
        action=""
        :file-list="imageList"
        ref="uploadRef"
        max-count="6"
        del-icon="trash-fill"
        del-color="#fff"
        del-bg-color="rgba(0, 0, 0, 0.4)"
        :before-upload="beforeUpload"
      ></u-upload
    ></view>

    <!-- 底部 -->
    <view class="fix-bottom">
      <u-select
        v-model="showPicker"
        :list="pickerList"
        @confirm="confirm"
      ></u-select>
      <u-icon
        name="grid"
        class="grid-icon"
        size="48"
        @click="showPicker = true"
      ></u-icon>
      <u-icon name="photo" class="photo-icon" size="48"></u-icon>
      <u-button class="send-btn" type="error" @click="send">发送</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      type: "textarea",
      border: true,
      height: 200,
      autoHeight: true,
      imageList: [], //初始化的 imageList :{url:  }

      showPicker: false,
      pickerList: [
        {
          value: "1",
          label: "圈子"
        },
        {
          value: "2",
          label: "热点"
        },
        {
          value: "3",
          label: "活动"
        }
      ],
      tag: "圈子"
    };
  },

  methods: {
    // picker
    confirm(e) {
      this.tag = JSON.parse(JSON.stringify(e))[0].label;
    },
    // 单个文件上传前
    beforeUpload(idx, lists) {
      this.imageList = JSON.parse(JSON.stringify(lists));
    },
    async send() {
      let imgSrc = [];
      const contentSrc = this.value; // 获取输入框内容
      uni.showLoading();
      for (let item of this.imageList) {
        const res = await this.upLoadFile(JSON.parse(JSON.stringify(item)).url); //获取到本地图片 url
        imgSrc.push(res);
      }
      imgSrc = imgSrc.map(obj => obj.fileID); // 套出来真正的 fileID:  图片路径
      uni.hideLoading();
      console.log("imgSrc: ", imgSrc); //imgagelsit

      // 调用云函数,传过去帖子信息\
      uniCloud
        .callFunction({
          name: "createPost",
          data: {
            userId: "匿名用户",
            content: contentSrc,
            images: imgSrc
          }
        })
        .then(res => {
          console.log("创建结果:", res); // 调用成功会有 200 的提示
        });
    },

    async upLoadFile(filePath) {
      const res = await uniCloud.uploadFile({
        filePath: filePath,
        cloudPath: "postImg-" + filePath.slice(-8) + ".jpg" // 名称 不能省略.jpg
      });
      return res;
    }
  },
  onload() {}
};
</script>

<style lang="scss" scoped>
page {
  height: 100%;
}
button::after {
  border: none;
}
button {
  background-color: #fff;
  border: none;
}
.create-page {
  .content {
    margin: 0 15px;
  }
  .tags {
    margin: 10px 15px;
    .tag {
      margin-right: 4px;
    }
  }
  .upload-pics {
    margin: 15px 15px;
    .title-box {
      margin: 0 0.3rem;
      display: flex;
      justify-content: space-between;
    }
  }
  .fix-bottom {
    position: fixed; //吸底
    bottom: 0;
    width: 100%;
    padding: 10px 15px 20px;
    display: flex;
    justify-content: flex-start;
    .grid-icon {
      width: 48px;
      text-align: center;
    }
    .photo-icon {
      width: 48px;
      text-align: center;
    }
    .send-btn {
      margin-left: auto;
      margin-right: 0;
      height: 1.8rem;
    }
  }
}
</style>
