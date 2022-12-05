import eventBus from "mw-libs/MessageBus/MsgBus";

export default class RouterControl {
    router = {}
    mode = 'html'

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
        console.log(route)
        switch (this.mode) {
            case "hash":
                let type = typeof route
                switch (type) {
                    case "string":
                        route = route || ''
                        window.location.href = '/#/' + route
                        break
                    case "object":
                        window.location.href = '/#/' + route.path
                        break
                }
                break
            case "html":
                let url = `${this.router['#/' + route.path] || './index.html'}`
                location.href = url
                break
        }


    }

    toPage(curPath) {
        switch (this.mode) {
            case "hash":
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
                break
            case "html":
                let curHtml = location.pathname
                if (curHtml === '/') {
                    location.pathname = '/index.html'
                }
                break
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
