const {EventBus} = require("striver-libs");

function postMsgToJs(key, param) {
  try {
    EventBus.excuteSub(key, param)
  } catch (e) {
    alert(e.message)
    console.log(e)
  }
}

function __postMsgToUe(key,msg) {
  try {
    blu_event(key, msg);
  } catch (e) {
    alert(e.message)
  }
}
EventBus.subcribe('__postMsgToUe',(data)=>{
  __postMsgToUe('onJsMsg',data)
})
function postMsgToUe(msg){
  EventBus.excuteSub('__postMsgToUe',msg)
}
