<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onReqData">
    <msg_cc_cr_item v-for="item in list" :renderData="item" :key="item.qingqing_notification_id" :msg_type="$route.params.msg_type"></msg_cc_cr_item>
    <template v-slot:finished>
      {{ list.length > 0 ? '没有更多了' : '' }}
      <div class="notFind" v-show="list.length == 0 && finished">
        <img class="nothing_image" src="../images/list_empty.png" />
        <span class="nothingtext">暂无消息</span>
      </div>
    </template>
    <div class="mask" v-if="maskFlag" @touchmove.prevent></div>
    <div class="mask_content" v-if="maskFlag" @touchmove.prevent>
      <div class="text_box">
        <div class="tips">确定将全部消息变为已读吗？</div>
        <div class="btn_box">
          <div class="btn_text" @click="cancel()">取消</div>
          <div class="btn_text nextStep" @click="goToNext()">确定</div>
        </div>
      </div>
    </div>
  </van-list>
</template>

<script>
import base from 'common/base';
import { query_msg_for_cc_cr_list } from '../api';
import { read_all_msg_for_cc_cr } from '../api';
import { reqImageFromServer, changeTitle, getUrlParams, sendPageLog, sendClickLog } from 'common_utils/app';
import ShowToast from 'common_components/toast';
import appJSBridge from 'common_modules/appJSBridge';
import store from '~/common/util/store/store';
import { List } from 'vant';
import msg_cc_cr_item from '../components/msg_cc_cr_item';
// import VConsole from 'vconsole/dist/vconsole.min.js';
// let vConsole = new VConsole(); // 初始化
export default {
  components: {
    [List.name]: List,
    [msg_cc_cr_item.name]: msg_cc_cr_item
  },
  data() {
    return {
      user_type: 'ta_user',
      iconName: 'warning',
      tag: null,
      list: [],
      loading: false,
      finished: false,
      pagesize: 10,
      not_read_count: 0,
      maskFlag: false
    };
  },
  created() {
    //打开硬件加速开关
    if (base.isApp()) {
      base.ready(function() {
        base.transferAppEasyJs({ enable: '1' }, 'set_hardware');
      });
    }
    if (!this.isLogin()) {
      this.forceLogin();
    }
    window.click_callbacks_success = (res) => {
      this.pushReadAllTypeNotification();
    };
    base.remove_loading_page();
  },

  methods: {
    onReqData() {
      let msg_type = Number(this.$route.params.msg_type);
      let _this = this;
      query_msg_for_cc_cr_list(msg_type, this.tag, this.pagesize)
        .then((res) => {
          let data = JSON.parse(res);
          this.isReady = true;
          if (data.response.error_code === 0) {
            if (data.next_tag) {
              _this.tag = data.next_tag;
            }
            if (data.notifications) {
              _this.list.push(...data.notifications);
            } else {
              _this.finished = true;
            }
            this.loading = false;
            this.not_read_count = data.not_read_count;
            this.onRefresRightItem(data.not_read_count);
            changeTitle(document, _this.getTitleType());
          }
        })
        .catch((e) => {
          console.log('changeprice info error', e);
        });
    },
    cancel() {
      this.maskFlag = false;
    },
    goToNext() {
      let msg_type = Number(this.$route.params.msg_type);
      let _this = this;
      this.maskFlag = false;
      read_all_msg_for_cc_cr(msg_type)
        .then((res) => {
          let data = JSON.parse(res);
          this.isReady = true;
          if (data.response.error_code === 0) {
            if (this.list) {
              this.list.forEach((item) => {
                item.read_status = true;
              });
            }
            const config_obj = [
              {
                type: 3,
                paramDict: {
                  btnname: '全部已读',
                  fontColor: '#CCCCCC',
                  callbacks: {
                    success: 'click_callbacks_success',
                    fail: 'click_callbacks_fail',
                    cancel: 'click_callbacks_cancel',
                    id: 'syb_options'
                  }
                }
              }
            ];
            base.transferAppEasyJs(config_obj, 'registRightItems');
            _this.not_read_count = 0;
          }
        })
        .catch((e) => {
          console.log(e);
          console.log('changeprice info error');
        });
    },
    onRefresRightItem(not_read_count) {
      if (not_read_count > 0) {
        const config_obj = [
          {
            type: 3,
            paramDict: {
              btnname: '全部已读',
              fontColor: '#333333',
              callbacks: {
                success: 'click_callbacks_success',
                fail: 'click_callbacks_fail',
                cancel: 'click_callbacks_cancel',
                id: 'syb_options'
              }
            }
          }
        ];
        base.transferAppEasyJs(config_obj, 'registRightItems');
      } else {
        const config_obj = [
          {
            type: 3,
            paramDict: {
              btnname: '全部已读',
              fontColor: '#CCCCCC',
              callbacks: {
                success: 'click_callbacks_success',
                fail: 'click_callbacks_fail',
                cancel: 'click_callbacks_cancel',
                id: 'syb_options'
              }
            }
          }
        ];
        base.transferAppEasyJs(config_obj, 'registRightItems');
      }
    },
    pushReadAllTypeNotification() {
      if (this.not_read_count > 0) {
        this.maskFlag = true;
      }
    },

    onRefreshData(qingqing_notification_id) {
      if (this.list) {
        this.list.forEach((item) => {
          if (item.qingqing_notification_id === qingqing_notification_id) {
            item.read_status = true;
          }
        });
      }
    },
    goToDetail(item) {},

    toast(message) {
      ShowToast({
        iconName: this.iconName,
        message: message || '服务器错误'
      });
    },
    isLogin() {
      var user = store.get('user'); // App 内的也是存 cookies 里的
      return user && (user.session_id || user.sessionid) && user.token;
    },
    forceLogin() {
      var self = this;
      var userInfo = store.get(this.user_type);
      if (base.isApp()) {
        if (!!userInfo) {
          if (!this.isLoggedin) {
            this.isLoggedin = true;
          }
        } else {
          base.ready(self.checkAppReady);
        }
      } else {
        if (!!userInfo) {
          this.isLoggedin = true;
        } else {
          base.direct_to_login_page(self.user_type);
        }
      }
    },
    getTitleType() {
      let msg_type = Number(this.$route.params.msg_type);
      switch (msg_type) {
        case 1:
          return 'leads跟进';
        case 2:
          return '审核通知';
        case 3:
          return '课程信息';
        case 4:
          return '订单信息';
        case 5:
          return '退课退款';
        case 6:
          return '活动信息';
        default:
          return '其他信息';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.nothing_image {
  width: 320px;
  height: 320px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 9;
}
.nothingtext {
  top: calc(30% + 180px);
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 9;
  width: 330px;
  height: 42px;
  margin-top: 20px;
  font-size: 30px;
  font-weight: 400;
  color: #666666;
  line-height: 42px;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.mask_content {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  z-index: 11;
  width: 540px;

  .text_box {
    width: 100%;
    height: 226px;
    background: #fff;
    border-radius: 16px;
    text-align: center;

    .tips {
      box-sizing: border-box;
      padding: 58px 36px 36px 36px;
      margin: 0 auto;
      height: 140px;
      text-align: center;
      font-size: 34px;
      color: #333333;
      line-height: 48px;
    }

    .btn_box {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 86px;
      border-top: 1px solid #e6e6e6;
      border-radius: 0 0 16px 16px;

      /* no */
      .btn_text {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 34px;
        color: #666666;
        line-height: 34px;
      }

      .nextStep {
        color: #ff7b35;
        border-left: 1px solid #e6e6e6;
      }
    }
  }
}
</style>
