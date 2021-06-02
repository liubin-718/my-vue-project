<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      v-bind="$attrs"
      v-on="$listeners"
      :before-close="dialogBeforeClose">
      <!-- <div v-slot="dialogContent"></div> -->
      <slot name="dialogContent"></slot>
      <slot name="dialogSubContent"></slot>
      <div slot="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CommonDialog2',
  props:{
    dialogVisible:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /* 
      默认情况下父作用域的不被认作props的attribute绑定，将回退且作为普通的
      html attribute应用在子组件的跟元素上。通过设置inheritAttrs:false，这些
      默认行为将被去掉
      */
      inheritAttrs: false,
    };
  },
  mounted() {
    
  },
  methods: {
    dialogBeforeClose(){
      this.$emit('dialogBeforeClose');
    },
    close(){
      this.$emit('close');
    },
    confirm(){
      this.$emit('confirmDialog');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>