import { rewriteRouter } from "./rewrite-router";
import { handleRouter } from "./handle-router";
let _apps = [];

//子应用数据 设置为全局变量
export const getapps = () => _apps;
//  注册子应用
export const registerMicroApps = (apps) => {
    _apps = apps;
};

export const start = (apps) => {
    //微前端的运作原理

    //1.监视路由变化 -> 匹配子应用 -> 加载子应用 -> 渲染子应用)
    rewriteRouter();

    //初始化执行匹配
    handleRouter();
};
