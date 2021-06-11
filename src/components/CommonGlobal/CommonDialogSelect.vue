<!--  -->
<template>
  <div>
    <el-dialog
      :title="configDialog.title"
      :visible.sync="configDialog.visible"
      :width="configDialog.width"
      :top="configDialog.top"
      :modal="configDialog.modal"
      :lockScroll="configDialog.lockScroll"
      :customClass="configDialog.customClass"
      :showClose="configDialog.showClose"
      :closeOnClickModal="configDialog.closeOnClickModal"
      class="common-dialog"
      @open="handleDialogOpen"
      @opened="handleDialogOpened"
      @close="handleDialogClose"
      @closed="handleDialogClosed"
    >
      <el-select
        v-model="selectedData"
        :multiple="multiple"
        :placeholder="placeholder"
        :filterable="filterable"
        :popper-append-to-body="false"
        @visible-change="visibleChange($event,selectedData)"
        @change="handleChooseTag"
        @clear="clear"
        ref="tagSelectRef"
      >
        <div :style="{height: `${selectHeight}px`,padding:0}">
          <el-option
            v-for="item in tagData"
            :key="item.id"
            :label="item.tagName"
            :value="item.id"
            :style="{width: `${optionWidth}px`,height: '40px',lineHeight: '40px',display: 'inline-block',
            padding: '8px 24px',textAlign: 'center',marginLeft:'16px',marginBottom: '6px',
            position: 'relative', border:'1px solid #e1e1e1',borderRadius: '6px'}"
          >
            <p style="display:float; border-radius:6px;font-size:16px;min-width:64px;height:24px;line-height:24px;margin:0">
              {{item.tagName}}
              <svg-icon
                v-show="item.isShow"
                :width="24"
                :height="24"
                icon-class="selected"
                className="icon-operation"
                style="position:absolute;right:0;bottom:0"
              />
            </p>
          </el-option>
          <div style="clear:both"></div>
        </div>
      </el-select>
      <div slot="footer" v-if="!configDialog.footer">
        <el-button class="btn" @click="handleDialogClose('cancle')">取 消</el-button>
        <el-button
          class="btn"
          type="primary"
          @click="confirm"
        >确 定</el-button>
      </div>
      <div v-else slot="footer" class="dialog-footer">
        <slot name="dialogFooter"></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CommonDialogSelect',
  props: {
    configDialogObj: Object,
    multiple: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '最多选择8个标签',
    },
    selectHeight:{
      type: Number,
      default:215,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    tagData: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      selectedData: [],
      optionWidth: 112,
    }
  },
  computed: {
    configDialog () {
      return Object.assign({
        title: 'dialog-select组件', //标题
        width: '544px', //宽
        top: '15vh', //距离顶部的距离
        modal: true, //是否需要遮罩层
        lockScroll: true, //显示时是否锁定滚动
        closeOnClickModal: false, //是否可以点击遮罩关闭
        customClass: '', //自定义类名
        showClose: true, //是否显示关闭按钮
        footer:false // 自定义弹窗按钮
      },this.configDialogObj)
    }
  },
  methods: {
    visibleChange (e,v) {
      console.log('visibleChange',e,v)
    },
    /*打开dialog回调*/
    handleDialogOpen () {
      this.$emit('handleOpen')
    },
    /*打开动画结束后回调*/
    handleDialogOpened () {
      this.$emit('handleDialogOpened')
    },
    /*关闭dialog回调*/
    handleDialogClose (v) {
      if (v) {
        this.clear()
      }
      this.$emit('handleDialogClose')
    },
    clear () {
      this.$nextTick(function () {
        this.selectedData = []
        this.handleChooseTag()
      })
      this.$emit('handleChooseTag', [])
    },
    /*关闭动画结束后回调*/
    handleDialogClosed () {
      this.$emit('handleDialogClosed')
    },
    confirm () {
      this.$emit('confirm',this.selectedData)
    },
    handleChooseTag (val = [] ) {
      if (val.length)
        this.$refs.tagSelectRef.$refs.tags.children[1].placeholder = '请选择'
      if (val.length > 7 || !val.length)
        this.$refs.tagSelectRef.$refs.tags.children[1].placeholder = ''
      if (val.length > 8) {
        this.$message.info(this.placeholder)
        val.pop()
      }

      this.tagData &&
        this.tagData.forEach((item) => {
          item.isShow = false
          val &&
            val.forEach((key) => {
              if (item.id) {
                if (key == item.id) {
                  item.isShow = true
                }
              }
            })
        })
      this.$emit('handleChooseTag', val)
      // console.log('======', this.selectedData, val)
    },
  },
  mounted () {
    this.tagData &&
      this.tagData.forEach((item) => {
        if (item.tagName.length > 4) this.optionWidth = 217
      })
  },
}
</script>

<style lang='less' scoped>
.btn{
  width:62px;
  font-size: 13px;
  font-weight: 400;
}
::v-deep .el-select__tags {
  display: none;
  input::-webkit-input-placeholder {
    color: #999;
  }
  .el-tag {
    background: #08c5ac;
    color: #fff;
    height: 22px;
    line-height: 22px;
    .el-tag__close.el-icon-close {
      background: #08c5ac;
    }
  }
  input::-moz-placeholder {
    /* Firefox 18- */
    color: #999;
  }
  input::-moz-placeholder {
    /* Firefox 19+ */
    color: #999;
  }
  input::-ms-input-placeholder {
    color: #999;
  }
}
.common-dialog /deep/.el-dialog__body{
    padding: 18px 10px 0px 8px;
}
/deep/.el-select-dropdown__item {
  height: 24px;
  line-height: 24px;
  color: #666;
}
/deep/.el-select-dropdown__item.hover {
  background: #fff;
  border: 1px solid #08c5ac;
  color: #08c5ac;
}
/deep/.el-select-dropdown__item.selected {
  font-weight: 400;
}
/deep/.el-select-dropdown{
  border: 0;
  display: block !important;
  position: inherit !important;
  box-shadow:inherit;
  margin: 0;
  top:0 !important;
  left:0 !important;
}
/deep/.el-select-dropdown__wrap{
  max-height: inherit;
}
/deep/ .el-select>.el-input {
  display: none;
}
</style>
