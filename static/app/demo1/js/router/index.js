import Vue from 'vue';
import Router from 'vue-router';
import msg_cc_cr_list from '../views/msg_cc_cr_list.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/msg_cc_cr_list/:msg_type',
      name: 'msg_cc_cr_list',
      component: msg_cc_cr_list
    }
  ]
});
export default router;
