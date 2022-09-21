import { registerMicroApps, start } from "./micro-fe";

const loader = (loading) => {
    console.log("loading=", loading);
};

// 注册子应用
// 其实微前端的运行原理和SPA非常相似
registerMicroApps(
  	// 当匹配到activeRule的时候，请求获取entry资源，渲染到container中
    [
        {
            name: "m-vue", // 自定义名称
            entry: "//localhost:20000", // 子应用的HTML入口
            container: "#container", // 渲染到哪里
            activeRule: "/vue", // 路由匹配规则
            loader,
        },
        {
            name: "m-react",
            entry: "//localhost:30000",
            container: "#container",
            activeRule: "/react",
            loader,
        },
    ],
    {
        beforeLoad: () => {
            console.log('加载前')
        },
        beforeMount: () => {
            console.log('挂载前')
        },
        afterMount: () => {
            console.log('挂载后')
        },
        beforeUnmount: () => {
            console.log('卸载前')
        },
        afterUnmount: () => {
            console.log('卸载后')
        },
    }
);

start({
  sandbox:{
        // css隔离
        // experimentalStyleIsolation:true
        strictStyleIsolation:true
    }
})