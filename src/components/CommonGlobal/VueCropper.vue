<template>
  <div class="bnRadio-container">
      <div class="avator-cropper">
        <div class="limit-tips">仅支持5M以内的jpg、jpeg、png格式图片</div>
        <div class="cropper-container" :class="optionsData.round ? 'round' : ''">
          <div v-if="!optionsData.img" class="upload-container">
            <el-upload
              class="avatar-uploader"
              action="http://10.58.144.13/oscenter/upload/uploadQuestionFile"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <VueCropper
            v-else
            ref="cropper"
            :img="optionsData.img"
            :outputSize="optionsData.size"
            :outputType="optionsData.outputType"
            :info="optionsData.info"
            :canScale="optionsData.canScale"
            :full="optionsData.full"
            :canMove="optionsData.canMove"
            :canMoveBox="optionsData.canMoveBox"
            :centerBox="optionsData.centerBox"
            :original="optionsData.original"
            :autoCrop="optionsData.autoCrop"
            :autoCropWidth="optionsData.autoCropWidth"
            :autoCropHeight="optionsData.autoCropHeight"
            :fixedBox="optionsData.fixedBox"
          ></VueCropper>
        </div>
        <div class="slider-container">
          <div class="plus el-icon-plus" @click="changeScale(optionsData.slider + 10)"></div>
          <el-slider
            class="slider"
            v-model="optionsData.slider"
            vertical
            :min="0"
            :step="10"
            :max="100"
            @change="changeSlider"
            :show-tooltip="false"
            height="150px">
          </el-slider>
          <div class="minus el-icon-minus" @click="changeScale(optionsData.slider - 10)"></div>
        </div>
        <div v-if="optionsData.img">
          <span class="upload-close el-icon-circle-close"></span>
        </div>
      </div>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'VueCropper',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  data () {
    return {
      optionsData: {}
    }
  },
  components: {
    VueCropper,
  },
  mounted () {
    this.optionsData = Object.assign({
      scale: 0,
      slider: 0,
      info: false,
      round: true,
      img: '', // https://avatars2.githubusercontent.com/u/15681693?s=460&v=4
      size: 1,
      full: true,
      outputType: 'png',
      canMove: true,
      fixedBox: true,
      original: false,
      canMoveBox: false,
      canScale: true,
      autoCrop: true,
      // 只有自动截图开启 宽度高度才生效
      autoCropWidth: 280,
      autoCropHeight: 280,
      centerBox: true,
      high: true,
      max: 99999
    }, this.options)
  },
  methods:{
    handleAvatarSuccess (res, file) {
      this.optionsData.img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'imagebmp';
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    },
    changeSlider (num) {
      this.optionsData.slider = num
      let currentScale = num / 10
      let number1 = Number(`${currentScale < this.optionsData.scale && this.optionsData.scale >= 0 ? '-' : ''}${currentScale}`)
      if (number1 <= 0 && this.optionsData.scale > 0 ) {
        number1 = - this.optionsData.scale
      }
      this.$refs.cropper.changeScale(number1)
      this.optionsData.scale = currentScale
    },
    changeScale (num) {
      if (num > 100 || num < 0) {
        return false
      } else {
        this.changeSlider(num)
      }
    },
    close () {
      console.log('取消')
    },
    comfire () {
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData(data => {
        console.log(data, '获取截图的base64')
        // 将剪裁后base64的图片转化为file格式
        let file = this.convertBase64UrlToBlob(data);
        // this.fileImg=URL.createObjectURL(file);
        var formData = new FormData();
        formData.append('file', file);
        formData.append('isFile', '1');
        console.log(formData, 'formData')
      })
    },
    // 将base64的图片转换为file文件
    convertBase64UrlToBlob (urlData) {
      let bytes = window.atob(urlData.split(',')[1]); // 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/jpeg' });
    },
  },
}
</script>
<style lang="less" scoped>
.avator-cropper {
  position: relative;
  .upload-close {
    cursor: pointer;
    font-size: 25px;
    color: red;
    margin: 20px 0;
  }
  .limit-tips {
    font-size: 14px;
    color: rgba(0,0,0,0.45);
    line-height: 22px;
    font-weight: 400;
    margin-top: 20px;
  }
  .cropper-container {
    width: 280px;
    height: 280px;
    margin: auto;
    margin-top: 20px;
    background: #eee;
    .upload-container {
      width: 100%;
      height: 100%;
      .avatar-uploader {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .avatar-uploader-icon {
          font-size: 25px;
          color: #08C5AC;
          font-weight: bold;
        }
      }
    }
  }
  .slider-container {
    position: absolute;
    right: -15px;
    top: 46px;
    .slider {
      margin: 15px 0 15px 0px;
    }
    .plus, .minus {
      width: 16px;
      height: 16px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      border: 1px solid #ddd;
      font-size: 12px;
      cursor: pointer;
      margin: auto;
      transform: scale(0.9);
    }
  }
  .round {
    border-radius: 50%;
    overflow: hidden;
  }
  /deep/ .el-slider__bar {
    background-color: #08C5AC;
  }
  /deep/ .el-slider__button {
    border: 2px solid #08C5AC;
    background-color: #08C5AC;
  }
}
</style>