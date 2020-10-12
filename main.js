import Vue from 'vue'
import App from './App'
// 引入
import uView from "uview-ui";
Vue.use(uView);
// 引入字体图标
import "./static/iconfont/iconfont.css"
Vue.config.productionTip = false
import {
  myFilter,
  myToast
} from "@/utils/common";
Vue.prototype.myFilter = myFilter // 自定义筛选filter
Vue.prototype.myToast = myToast // 自定义筛选filter

// 引入mock.js拦截axios请求 打包上线时需要注释掉
// require("@/utils/mock.js") 

// =====阿里qiankun微前端搭载======
let instance = null;
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  // console.log(props);
  // console.log("搭载");
  // ReactDOM.render(<App />, document.getElementById('react15Root'));
  // instance=new Vue({
  //   router,
  //   store,
  //   render: h => h(App)
  // }).$mount('#app')
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  instance.$destroy();
  instance = null;
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  // console.log('update props', props);
}
// =====阿里qiankun微前端结束======

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
