// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store/store'
import BScroll from 'better-scroll'
Vue.prototype.BScroll = BScroll
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.config.devtools = true
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
