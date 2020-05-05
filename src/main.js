/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";
import VueNativeSock from 'vue-native-websocket'
import VModal from 'vue-js-modal'
import FileUpload from 'v-file-upload'

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import './registerServiceWorker'
import moment from 'moment'

Vue.prototype.moment = moment
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(VModal)         
Vue.use(FileUpload)                                     
Vue.use(VueNativeSock, 'ws://'+window.location.hostname+':1880/ws/athos', {
                                                withCredentials: false, 
                                                format: 'json' 
                                              });

//global event bus
Vue.eventBus = new Vue () // 1.Declaring

function waitForSocketConnection(socket, callback){
  setTimeout(
      function () {
          if (socket.readyState === 1) {
              console.log("Connection is made")
              if (callback != null){
                  callback();
              }
          } else {
              console.log("wait for connection...")
              waitForSocketConnection(socket, callback);
          }

      }, 5); // wait 5 milisecond for the connection...
}



waitForSocketConnection(Vue.prototype.$socket, function() {
    console.log("websocket ready."); 
    /* eslint-disable no-new */
    new Vue({
      router,
      i18n,
      render: h => h(App)
    }).$mount("#app");

 });
