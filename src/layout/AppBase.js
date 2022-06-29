import {MwEventBus, Subcribe} from "striver-libs/JsEventBus";

@MwEventBus
class AppBase {
    @Subcribe('pageReady')
    onPageReady() {
        let app=document.createElement('div')
        app.id='vimi-app'
        document.getElementsByTagName('body')[0].appendChild(app)
    }
}
export default AppBase