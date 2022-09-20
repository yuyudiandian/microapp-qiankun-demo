import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let instance = null;
// 封装的一个自定义函数，new一个vue实例，和单独new一个vue是一样的，这里只是单独的封装一个函数方便微前端应用进行渲染
function render(props = {}) {
  const { container } = props;
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}