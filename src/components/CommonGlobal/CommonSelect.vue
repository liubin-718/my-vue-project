<template>
  <div class="common-select">
    <el-select
      v-model="selectedData"
      :multiple="multiple"
      :placeholder="placeholder"
      :filterable="filterable"
      @change="handleChooseTag"
      ref="tagSelectRef"
    >
      <div :style="{width:`${width}px`,padding:`${padding}px`}">
        <el-option
          v-for="item in tagData"
          :key="item.id"
          :label="item.tagName"
          :value="item.id"
          style="float:left;min-width:100px;height:38px;line-heigth:38px;
                padding:1px 10px;text-align:center;margin-bottom:5px;margin-left:5px;border-radius: 8px;
                position:relative;border:1px solid green;"
        >
          <p style="display:float; border-radius:4px;margin:0">
            {{item.tagName}}
            <img
              v-show="item.isShow"
              :src="checkbox1"
              alt=""
              style="position:absolute;right:0;bottom:0"
            >
          </p>
        </el-option>
        <div style="clear:both"></div>
      </div>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'CommonSelect',
  props:{
    width:{
      type: Number,
      default: 540
    },
    padding: {
      type: Number,
      default: 5
    },
    multiple: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '最多选择8个标签'
    },
    filterable:{
      type: Boolean,
      default: true
    },
    tagData: {
      type: Array,
      default: () => []
    },
    // selectedData: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data () {
    return {
      checkbox1: require('@/assets/images/checkbox.png'),
      selectedData:[]
    }
  },
  methods: {
    handleChooseTag (val) {
      if (val.length) this.$refs.tagSelectRef.$refs.tags.children[1].placeholder = '请选择'
      if (val.length > 7 || !val.length)
        this.$refs.tagSelectRef.$refs.tags.children[1].placeholder = ''
      if (val.length > 8) {
        this.$message.info(this.placeholder)
        val.pop()
      }

      this.tagData && this.tagData.forEach(item => {
        item.isShow = false
        val && val.forEach(key => {
          if (item.id) {
            if (key == item.id) {
              item.isShow = true
            }
          }
        })
      })
      this.$emit('handleChooseTag',val)
      console.log('======',this.selectedData)
    },
  },
  mounted () {

  }
}
</script>

<style lang='scss' scoped>
.common-select{
 ::v-deep .el-select__tags {
    input::-webkit-input-placeholder {
      color: #999;
    }
    // .el-tag{
    //   background: #08c5ac;
    //   color:#fff;
    // }
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
}
</style>