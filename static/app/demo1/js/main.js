import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex';

new Vue({
  el: '#app',
  router,
  store,
  template: '<app/>',
  components: { App }
});
