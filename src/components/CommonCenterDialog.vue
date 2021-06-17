<template>
  <div>
    <div class="mask" v-if="showPop" @click="onDismiss()"></div>
    <div id="dialog_center" class="dialog_center" v-if="showPop">
      <div class="title">{{ this.title }}</div>
      <div class="message">{{ this.message }}</div>
      <div class="line_horizontal"></div>
      <span class="btn">
        <span class="cancel" @click="onCancel()">{{ this.cancel }}</span>
        <span class="line_vertical"></span>
        <span class="confirm" @click="onConfirm()">{{ this.confirm }}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "commonCenterDialog",
  props: {
    cancelEnable: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "标题",
    },
    message: {
      type: String,
      default: "内容",
    },
    cancel: {
      type: String,
      default: "取消",
    },
    confirm: {
      type: String,
      default: "确认",
    },
  },
  data() {
    return {
      showPop: false,
    };
  },
  watch: {
    showPop: function (indexVal, oldVal) {},
  },

  methods: {
    onCancel() {
      this.showPop = false;
      this.$emit("child-event-cancel", "onCancel");
    },
    onConfirm() {
      this.showPop = false;
      this.$emit("child-event-confirm", "onConfirm");
    },
    parentHandleclick(e) {
      this.showPop = true;
    },
    onDismiss() {
      if (this.cancelEnable) {
        this.showPop = false;
      }
    },
  },

  mounted() {},
};
</script>

<style scoped  lang="scss">
.mask_content_transition_center {
  opacity: 1;
  visibility: visible;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  transition: all 0.5s;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
.dialog_center {
  width: 72%;
  z-index: 10;
  position: fixed;
  left: 15%;
  top: 50%;
  margin-top: -60px;
  visibility: visible;
  border-radius: 8px;
  background: white;
  //   transition: all 0.5s;
  height: auto;
  opacity: 1;
}
.title {
  width: 100%;
  height: auto;
  margin-top: 20px;
  font-size: 18px;
  color: #222630;
}
.btn {
  text-align: center;
  .cancel {
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 16px;
    color: #63676c;
    width: 50%;
    float: left;
  }
  .line_vertical {
    width: 1px;
    height: 100%;
    background-color: #f6f6f6;
  }
  .confirm {
    float: right;
    width: 50%;
    margin-top: 12px;
    margin-bottom: 12px;
    color: #00aafa;
    font-size: 16px;
  }
}
.message {
  margin-bottom: 20px;
  width: 100%;
  height: auto;
  margin-top: 8px;
  font-size: 14px;
  color: #63676c;
}
.line_horizontal {
  width: 100%;
  height: 1px;
  background-color: #f6f6f6;
}
</style>