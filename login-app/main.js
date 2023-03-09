// #ifndef VUE3
import App from './App.vue'
import Vue from 'vue'
import uView from './uni_modules/vk-uview-ui' //引入组件库
Vue.use(uView)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif


// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
import uView from './uni_modules/vk-uview-ui'; // 引入vk-uview-ui
export function createApp() {
  const app = createSSRApp(App)
  app.use(uView) // 使用vk-uview
  return {
    app
  }
}
// #endif
