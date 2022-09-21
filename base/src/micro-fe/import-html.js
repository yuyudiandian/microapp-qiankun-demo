import { fetchResource } from "./fetch-resource";
export const importHTML = async (url) => {
    const html = await fetchResource(url);
    const template = document.createElement("div");
    template.innerHTML = html;

    const scripts = template.querySelectorAll("script");
    //获取所有Script 标签的代码 []
    function getExternalScripts() {
        return Promise.all(
            Array.from(scripts).map((script) => {
                //获取到所有的script 标签
                const src = script.getAttribute("src");
                //如果得到是外联样式js，如果没有得到则是行内样式js
                if (!src) {
                    return Promise.resolve(script.innerHTML);
                } else {
                    //P判断src链接有没有域名，没有则加上
                    return fetchResource(
                        src.startsWith("http") ? src : `${url}${src}`
                    );
                }
            })
        );
    }

    //获取并执行 所有的Script脚本代码
    async function execScript() {
        const scripts = await getExternalScripts();
        console.log(scripts);

        //手动创建一个common js模块环境
        const module = {
            exports: {},
        };
        // eslint-disable-next-line
        const exports = module.exports;

        scripts.forEach((code) => {
            //eval 执行的代码可以访问外部变量
            // eslint-disable-next-line
            eval(code);
        });
        //获取子应用导出的生命周期函数
        return module.exports;
        // console.log(window['app-vue2-app']);
    }
    return {
        template,
        getExternalScripts,
        execScript,
    };
};
