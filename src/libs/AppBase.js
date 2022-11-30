import {MwEventBus, Subscribe} from "mw-libs";
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.css"
import Vue from "vue";
import $Router from "../router";

@MwEventBus
class AppBase {
    router = null
    path = ''
    usrRouter = true

    constructor() {
        if (this.usrRouter) {
            this.router = $Router
            Vue.prototype.$router = this.router
        }
    }

    @Subscribe('pageLoad')
    pageLoad() {
        if (!this.usrRouter) {
            this.onPageReady()
        } else {
            if (this.router.toPage(this.path)) {
                this.onPageReady()
            }
        }

    }

    @Subscribe('pageReady')
    onPageReady() {
        let app = document.createElement('div')
        app.id = 'vimi-app'
        document.getElementsByTagName('body')[0].appendChild(app)

    }
}


export default AppBase
