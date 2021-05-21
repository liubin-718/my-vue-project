<template>
  <div>
    <CommonDialog
      :title="dialogOption.title"
      :content="dialogOption.content"
      :option="dialogOption.option"
      :custom="dialogOption.custom"
      v-if="dialogOption.visitly"
      @close="closeDialog(dialogOption.option)"
      @bind="confirmDialog"
    >
     <template v-if="dialogOption.custom">
       <div style="width:544px;height:376px;position:relative" class="uploadPhoto">
         <span style="font-weight: 400;font-size: 14px;color: rgba(0,0,0,0.45);
         line-height: 22px;margin-top:14px;margin-bottom:24px;
         display: inline-block;
         ">仅支持5M以内的jpg、jpeg、png格式图片</span>
          <div style="width:280px;height:280px;border-radius:50% 50%;
          background: #F5F5F5;border:1px solid transparent;overflow:hidden;
          position:relative;margin:0 auto"
          >
           <VueAvatar
            :width="280"
             ref="vueavatar"
            :height="280"
            :image="editPhoto"
            :border="0"
            :borderRadius="140"
            :color= "[245, 245, 245, 1]"
            accept="image/png,image/jpeg,image/jpg"
            :hasRotation="false"
            placeholderSvg=""
            draggable="true"
            finishText=""
            :scale="scale"
            @vue-avatar-editor:image-ready="onImageReady"
            @select-file="onSelectFile($event)"
           ></VueAvatar>
          </div>
          <a href="javascript:;"  @click="fileSelected">
           <svg-icon
              v-show="plusFlag"
              :width="21.5"
              :height="22.5"
              icon-class="Plus"
              style=" position:absolute;top:190px;left:260px;color:#08C5AC;cursor:pointer"
              className="icon-Plus"
            />
          </a>

          <a href="javascript:;" @click="minusPhoto">
          <svg-icon
              :width="16"
              :height="16"
              icon-class="Minus-Square"
              style=" position:absolute;top:302px;right:17px"
              className="icon-Minus-Square"
            />
            </a>
            <a href="javascript:;" @click="plusPhoto">
              <svg-icon
                :width="16"
                :height="16"
                icon-class="plus-square"
                style=" position:absolute;top:66px;right:17px;"
                className="icon-plus-square"
              />
            </a>
             <a href="javascript:;" @click="cancelClicked" v-show="!plusFlag">
              <svg-icon
                :width="24"
                :height="24"
                icon-class="Close-Circle"
                style=" position:absolute;bottom:0px;left:262px;color:#f2445b;"
                className="icon-Close-Circle"
              />
            </a>

            <el-slider
              style="position:absolute; right:6px;top:92px;"
              v-model="scale"
              vertical
              :min="1"
              :max="2"
              :step="step"
              :format-tooltip="value=>value && value.toFixed(1)"
              height="200px">
            </el-slider>

       </div>
      </template>
    </CommonDialog>
  </div>
</template>

<script>
import {VueAvatar} from 'vue-avatar-editor-improved'
export default {
  name: 'VueAvatarEditorImproved',
  components: { VueAvatar },
  data() {
    return {
      scale:1,
      editPhoto:'', // 修改头像
      plusFlag:true,
      step:0.2,
      textInfoName: '',
      uploadPhoto1:require('@/assets/images/upload-photo.png'),
      uploadPhoto:'',
      uploadPhotoVisible:false,
      uploadText:'上传',
      dialogOption: {
        visitly: true,
      },
    };
  },
  mounted() {
    
  },
  methods: {
    minusPhoto () {
      if (this.scale.toFixed(1) <= 1) {
        return
      }
      this.scale -= this.step
    },
    plusPhoto () {
      if (this.scale.toFixed(1) >= 2) {
        return
      }
      this.scale += this.step
    },
    onSelectFile (file) {
      const flag = file[0].size / 1024 / 1024 < 5
      if (!flag) {
        this.cancelClicked()
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      if (file.length && file.length == 1) {
        this.plusFlag = false
      }
      console.log(file);
    },
    fileSelected () {
      this.plusFlag = true
      this.$refs.vueavatar.clicked()
    },
    saveClicked () {
      var img = this.$refs.vueavatar.getImageScaled()
      // this.$refs.image.src = img.toDataURL()
      this.uploadPhoto = img.toDataURL()
      const state = this.$refs.vueavatar.state.image

      if (state && state.resource) {
        this.uploadPhotoVisible = true;
        this.uploadText = '修改'
        this.plusFlag = false
      } else {
        this.uploadPhotoVisible = false;
        this.plusFlag = true
        this.uploadText = '上传'
      }
      console.log(state,this.uploadPhotoVisible);
      this.closeDialog()
    },
    cancelClicked () {
      this.$refs.vueavatar.resetImage()
      // this.$refs.vueavatar.getImageScaled()
      this.plusFlag = true
    },
    onImageReady () {
      this.scale = 1
    },
    uploadPhotoClick () {
      this.dialogOption = {
        visitly: true,
        title: '设置头像',
        custom: true,
        option: {
          emitName: 'setting',
          confirm: '设置'
        },
        type:'setting'
      }
      if (this.uploadText === '修改') {
        this.editPhoto = this.uploadPhoto
      } else {
        this.editPhoto = ''
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>