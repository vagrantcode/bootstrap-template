import eventBus from "mw-libs/MessageBus/MsgBus";
export class RouterControl {
    router = {}

    constructor(router) {
        this.router = router
        //监听路由变化
        window.addEventListener('hashchange', () => {/* 通过监听页面的hash值变更,调用jq的load方法,把指定路径的html加载到节点上 */
            // $('#box').load(router[location.hash])/* jquery中实现在指定容器中加载页面,通过中括号语法取到对应页面的路径,加载到id为box的节点上 */
            //window.location.href = `${router[location.hash]}`; //js中实现跳转
            this.toPage()
        })
        window.addEventListener('popstate', () => {
            //this.toPage()
        })
    }

    push(route) {
        window.location.href = '/#/' + route.path
    }

    toPage(curPath) {
        if (location.hash == '') {
            location.hash = '#/'
        }
        let url = `${this.router[location.hash] || './index.html'}`
        if (location.hash != curPath) {
            this.onChange()
            window.fetch(url).then(res => {
                res.text().then(html => {
                    eventBus.reset()
                    document.write(html)
                    document.close()
                })
            }).catch(err => {
                console.log(err)
            })
            return false
        }
        return true

    }

    onChange() {
        localStorage.setItem('router', JSON.stringify(this))
    }

    static fromJson(json) {
        let res = new RouterControl(router)
        return res
    }
}

const router = { /* 创建一个路由,是一个对象,对象里面kv存放hash值和路径页面 */
    "#/page1": './page1.html',
    "#/page2": './page2.html'
}

const $Router = new RouterControl(router)
export default $Router
