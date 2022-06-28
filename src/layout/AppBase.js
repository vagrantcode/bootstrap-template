import {MwEventBus, Subcribe} from "striver-libs/JsEventBus";

@MwEventBus
class AppBase {
    @Subcribe('pageReady')
    onPageReady() {

    }
}
export default AppBase