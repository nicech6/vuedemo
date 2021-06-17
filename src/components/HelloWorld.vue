<template>
  <div class="hello">
    <div>
      <ul class="ul">
        <li class="tab_item" @click="onBtnDialogBottom()">
          <img class="item_icon" src="../assets/logo.png" alt="" />
          <div class="text">底部弹窗</div>
        </li>
        <li class="tab_item" @click="onBtnDialogTop()">
          <img class="item_icon" src="../assets/logo.png" alt="" />
          <div class="text">顶部弹窗</div>
        </li>
        <li class="tab_item" @click="onBtnDialogCenter()">
          <img class="item_icon" src="../assets/logo.png" alt="" />
          <div class="text">中间弹窗</div>
        </li>
        <li class="tab_item">
          <img class="item_icon" src="../assets/logo.png" alt="" />
          <div class="text">列表</div>
        </li>
        <li class="tab_item" @click="onGotoH5()">
          <img class="item_icon" src="../assets/logo.png" alt="" />
          <div class="text">路由跳转</div>
        </li>
        <li class="tab_item">
          <img class="item_icon" src="../assets/logo.png" alt="" />
          <div class="text">TAB</div>
        </li>
      </ul>
    </div>

    <div
      class="mask"
      v-show="maskFlag1 || maskFlag2"
      @click="onDismiss()"
    ></div>
    <div
      class="dialog_bottom"
      :class="[maskFlag1 ? 'mask_content_transition_bottom' : '']"
    ></div>
    <div
      class="dialog_top"
      :class="[maskFlag2 ? 'mask_content_transition_top' : '']"
    ></div>

    <!-- <div
      class="dialog_center"
      :class="[maskFlag3 ? 'mask_content_transition_center' : '']"
    ></div> -->
    <common-center-dialog
      ref="centerPop"
      title="主标题"
      message="副标题"
      @child-event-cancel="onCancel"
      @child-event-confirm="onConfirm"
    >
    </common-center-dialog>
  </div>
</template>

<script>
import commonCenterDialog from "../components/CommonCenterDialog.vue";
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      maskFlag1: false,
      maskFlag2: false,
      showCenterDialog: false,
    };
  },
  components: {
    [commonCenterDialog.name]: commonCenterDialog,
  },
  created() {},
  methods: {
    onBtnDialogBottom() {
      this.maskFlag1 = true;
    },
    onBtnDialogTop() {
      this.maskFlag2 = true;
    },
    onBtnDialogCenter() {
      this.$refs.centerPop.parentHandleclick("嘿嘿嘿");
      // this.showCenterDialog = true;
    },
    onGotoH5() {
      // this.$router.push({
      //   path: "/Demo1",
      //   query: { id: 100 },
      // });
      this.$router.push({
        path: "/Demo1",
        params: { id: 100 },
      });
      // this.$router.go(-1)
    },
    onCancel() {
      alert("取消");
    },
    onConfirm() {
      alert("确认");
    },

    onDismiss() {
      this.maskFlag1 = false;
      this.maskFlag2 = false;
      this.showCenterDialog = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.hello {
  position: fixed;
  width: 100%;
  height: auto;
}
.ul {
  width: 100%;
  padding: 0;
  display: grid;
  margin: 0;
  grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
  background: #fff;
}

.item_icon {
  width: 42px;
  height: 42px;
  margin: 24px 0 0;
}
.tab_item {
  // display: grid;
  width: 100%;
  height: 125px;
  text-align: center;
  border-bottom: 2px solid #f2f2f6;
  border-right: 2px solid #f2f2f6;
  list-style: none;
}
.text {
  margin: 4px 0 0;
  font-size: 28px;
  color: #333333;
  line-height: 40px;
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

.dialog_bottom {
  width: 100%;
  z-index: 9;
  position: fixed;
  bottom: -375px;
  border-radius: 20px 20px 0px 0px;
  height: 375px;
  background: white;
  transition: all 0.5s;
  visibility: hidden;

  opacity: 0;
}
.dialog_top {
  width: 100%;
  z-index: 9;
  position: fixed;
  top: -375px;
  border-radius: 0px 0px 0px 0px;
  height: 375px;
  background: white;
  transition: all 0.5s;
  visibility: hidden;
  opacity: 0;
}

.mask_content_transition_bottom {
  visibility: visible;
  bottom: 0;
  opacity: 1;
}
.mask_content_transition_top {
  visibility: visible;
  top: 0;
  opacity: 1;
}
</style>
