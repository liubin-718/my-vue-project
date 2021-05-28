<template>
  <div class="dialog-container">
    <div
      class="container"
      :class="{ fadeIn: fadeIn ? true : false }"
      :style="!maxHeight ? 'max-height:none' : ''"
    >
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="close el-icon-close" @click="close"></div>
      </div>
      <el-main class="content" :style="!maxHeight ? 'max-height:none' : ''">
        <template v-if="custom">
          <slot></slot>
        </template>
        <template v-else>
          <div :style="{ textAlign: optionInit.align }">{{ content }}</div>
        </template>
      </el-main>
      <div class="footer">
        <el-button
          class="bn-button cancel"
          :class="optionInit.delete ? 'cancel-delete' : ''"
          :style="{ width: optionInit.width, height: optionInit.height }"
          @click="close"
          >{{ optionInit.cancel }}</el-button
        >
        <el-button
          class="bn-button is-active"
          :class="{'delete':optionInit.delete, 'confirmDisabled': confirmDisabled}"
          @click="confirm"
          :disabled="confirmDisabled"
          >{{ optionInit.confirm }}</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonDialog',
  props: {
    title: {
      type: String,
      default: '提示',
    },
    content: {
      type: String,
      default: '内容',
    },
    custom: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: Boolean,
      default: true,
    },
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
    confirmDisabled: {
      type: Boolean,
      default: false,
    }
  },
  created () {
    this.optionInit = Object.assign(
      {
        align: 'left',
        cancel: '取消',
        confirm: '确定',
        delete: false,
      },
      this.option,
    );
  },
  data () {
    return {
      fadeIn: false,
    };
  },
  methods: {
    close () {
      this.$emit('close');
    },
    confirm () {
      this.$emit('bind', this.option['emitName']);
    },
  },
  mounted () {
    setTimeout(() => {
      this.fadeIn = true;
    }, 100);
  },
};
</script>
<style lang="less" scoped>
@themeColor: #08c5ac;
.dialog-container {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  .container {
    min-width: 480px;
    position: relative;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03);
    overflow: hidden;
    opacity: 0;
    transform: scale(0.5);
    .header {
      width: 100%;
      height: 56px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        height: 24px;
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        color: #000000;
        line-height: 24px;
        font-weight: 500;
      }
      .close {
        font-size: 18px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        z-index: 30;
        &:hover {
          color: @themeColor;
        }
      }
    }
    .content {
      width: 100%;
      border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      flex: none;
      padding: 18px 24px;
      overflow-x: hidden;
    }
    .footer {
      width: 100%;
      height: 52px;
      padding: 0 16px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .fadeIn {
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    transform: scale(1);
    opacity: 1;
  }
}

.bn-button {
  width: 64px;
  height: 32px;
  background: #fff;
  border: 1px solid #e1e1e1;
  color: #666;
  border-radius: 6px;
  height: 32px;
  &:hover {
    background: @themeColor;
    color: #fff;
    border: 1px solid @themeColor;
    opacity: 0.8;
  }
}
.cancel {
  &:hover {
    background: #fff;
    color: @themeColor;
    border: 1px solid @themeColor;
    opacity: 0.8;
  }
}
.cancel-delete {
  &:hover {
    background: #fff;
    color: #f2445b;
    border: 1px solid #f2445b;
    opacity: 0.8;
  }
}

.is-active {
  background: @themeColor;
  color: #fff;
  opacity: 1;
  border: 1px solid @themeColor;
}
.delete {
  background: #f2445b;
  color: #fff;
  opacity: 1;
  border: 1px solid #f2445b;
  &:hover {
    background: #f2445b;
    color: #fff;
    border: 1px solid #f2445b;
    opacity: 0.8;
  }
}
.confirmDisabled{
  background: @themeColor;
  opacity: 0.3;
  &:hover{
    opacity: 0.3;
  }
}
</style>
