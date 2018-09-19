// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// proto
import awesome from './assets/proto/awesome_pb.js'

Vue.use(ElementUI, {
  size: 'small', // set element-ui default size
})

// 挂载为全局 也可以按需引用 import awesome from './assets/proto/awesome_pb.js'
Vue.prototype.awesome = awesome

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
