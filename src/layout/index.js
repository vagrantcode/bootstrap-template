import '../../src/api/api'
import {EventBus} from "striver-libs";
document.addEventListener('DOMContentLoaded',()=>{
EventBus.excuteSub('pageReady')
})