import '../../src/api/api'
import eventBus from "mw-libs/MessageBus/MsgBus";
document.addEventListener('DOMContentLoaded',()=>{
eventBus.executeSub('pageLoad','')
})
