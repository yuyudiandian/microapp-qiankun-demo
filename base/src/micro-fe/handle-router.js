//处理路由变化
import { importHTML } from "./import-html";
import { getapps } from ".";
import { getPrevRoute, getNextRoute } from "./rewrite-router";
export const handleRouter = async () => {
    const apps = getapps();
    //获取上一个路由应用
    const prevApp = apps.find((item) => {
        return getPrevRoute().startsWith(item.activeRule);
    });

    //获取下一个路由应用
    //find  匹配第一个 startsWith 匹配以什么开头的路径
    const app = apps.find((item) => getNextRoute().startsWith(item.activeRule));

    //如果有上一个路由应用，则销毁
    if (prevApp) {
        await unmount(prevApp);
    }

    //2.匹配子应用
    //2.1 获取到当前的路由路径
    //2.2 到apps里查找

    //3.加载子应用
    // 请求获取子应用的资源：html，css，js。。。
    if (!app) {
        return;
    }
    const { template, getExternalScripts, execScript } = await importHTML(
        app.entry
    );
    const container = document.querySelector(app.container);
    container.appendChild(template);

    //配置全局环境变量（是子应用运作在qiankun状态）
    window.__POWERED_BY_QIANKUN__ = true;

    //子应用的域名赋值给 主应用的变量
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + "/";

    //通过子应用导出的模块 获取
    const appExports = await execScript();
    console.log(appExports);

    //手动加载渲染函数
    app.bootstarp = appExports.bootstarp;
    app.mount = appExports.mount;
    app.unmount = appExports.unmount;
    await bootstarp(app);
    await mount(app);
    getExternalScripts().then(script=>{
      console.log(script);
    })
    // 请求获取子应用的资源：html、js、css
    // const html = await fetch(app.entry).then(res => res.text());
    // const container = document.querySelector(app.container);
    // container.innerHTML = html;
    //需要注意的是 客户端渲染需要通过执行 javascript 来生成内容，浏览器出去安全考虑
    //innerHTML 中的script 不会加载执行，因此需要手动加载 script
    //eval 或 new function

    //4.渲染子应用
};

async function bootstarp(app) {
    app.bootstarp && (await app.bootstarp());
}

async function mount(app) {
    app.mount &&
        (await app.mount({
            container: document.querySelector(app.container),
        }));
}

async function unmount(app) {
    app.unmount &&
        (await app.unmount({
            container: document.querySelector(app.container),
        }));
}
