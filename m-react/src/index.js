import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

function render(props) {
  const { container } = props;
  const Container = container ? container.querySelector('#root') : document.querySelector('#root')
  const root = createRoot(Container);
  root.render(<App/>)
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

// qiankun处理样式 
// 默认情况下切换应用 他会采用动态样式表 加载的时候添加样式 删除的时候卸载样式

// 主应用和子应用 如何隔离？（BEM规范 -> css-modules动态生成一个前缀 -> shadowDOM video标签中的快进和放大功能 增加全局样式就会有问题）