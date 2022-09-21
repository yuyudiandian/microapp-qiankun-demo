import { handleRouter } from "./handle-router";

let prevRoute = " "; //上一个路由
let nextRoute = window.location.pathname; //下一个路由

export const getPrevRoute = () => prevRoute;
export const getNextRoute = () => nextRoute;

window.getNextRoute = getNextRoute;
window.getPrevRoute = getPrevRoute;

export const rewriteRouter = () => {
    //hash 路由  window.onhashchange
    window.addEventListener("hashchange", () => {
        console.log('hashchange')
        prevRoute = nextRoute; //之前的路由
        nextRoute = window.location.hash.slice(1); //最新的路由
        handleRouter();
    });

    //history 路由 有分两种模式
    //一、history.go  history.back  history.forward 使用popstate 事件 :window.onpopstate
    window.addEventListener("popstate", () => {
        console.log('popstate')
        //popstate 触发的时候 路由已经完成导航
        prevRoute = nextRoute; //之前的路由
        nextRoute = window.location.pathname; //最新的路由
        handleRouter();
    });

    //pushState  replaceState 需要通过函数重写的方式进行劫持
    const rawPushState = window.history.pushState;
    window.history.pushState = (...args) => {
        console.log('监听到pushState事件')
        //导航前记录
        prevRoute = window.location.pathname;

        rawPushState.apply(window.history, args); //改变路由历史记录

        //导航后记录
        nextRoute = window.location.pathname;

        handleRouter();
    };
    const rawReplaceState = window.history.replaceState;
    window.history.replaceState = (...args) => {
        console.log('监听到replaceState事件')
        //导航前记录
        prevRoute = window.location.pathname;

        rawReplaceState.apply(window.history, args);

        //导航后记录
        nextRoute = window.location.pathname;

        handleRouter();
    };
};
