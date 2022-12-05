import RouterControl from "./MpRouter";



const router = { /* 创建一个路由,是一个对象,对象里面kv存放hash值和路径页面 */
    "#/page1": './page1.html',
    "#/page2": './page2.html'
}

const $Router = new RouterControl(router)
export default $Router
