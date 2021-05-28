<!--  -->
<template>
  <div>
    <el-select
      v-model="selectedData"
      :multiple="multiple"
      :placeholder="placeholder"
      :filterable="filterable"
      @change="handleChooseTag"
      ref="tagSelectRef"
    >
      <div :style="{width:`${width}px`,padding:`${padding}px`,}">
        <el-option
          v-for="item in tagData"
          :key="item.id"
          :label="item.tagName"
          :value="item.id"
          :style="{width: `${optionWidth}px`,height: '40px',lineHeight: '40px',float: 'left',
          padding: '8px 24px',textAlign: 'center',marginLeft:'16px',marginBottom: '16px',
          position: 'relative', border:'1px solid #e1e1e1',borderRadius: '6px'
          }"
        >
          <p style="display:float; border-radius:6px;font-size:16px;min-width:64px;height:24px;line-height:24px;margin:0">
            {{item.tagName}}
            <!-- <img
              v-show="item.isShow"
              :src="checkbox1"
              alt=""
              style="position:absolute;right:0;bottom:0"
            > -->
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
        <!-- <div style="border:1px solid #E1E1E1;height:52px;line-height:52px;width:100%;
          position: absolute; bottom:0px;
        ">
          <el-button style="float:right;margin-left:10px;margin-right:10px" type="primary">确定</el-button>
          <el-button style="float:right" type="">取消</el-button>
        </div> -->
        <div style="clear:both"></div>
      </div>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'CommonSelect',
  props: {
    width: {
      type: Number,
      default: 540,
    },
    padding: {
      type: Number,
      default: 5,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '最多选择8个标签',
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    tagData: {
      type: Array,
      default: () => [],
    },
    // selectedData: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data () {
    return {
      checkbox1: require('@/assets/images/checkbox.png'),
      selectedData: [],
      optionWidth: 112,
    }
  },
  methods: {
    handleChooseTag (val) {
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
::v-deep .el-select__tags {
  input::-webkit-input-placeholder {
    color: #999;
  }
  .el-tag{
    background: #08c5ac;
    color:#fff;
    height: 22px;
    line-height: 22px;
    .el-tag__close.el-icon-close{
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
</style>
