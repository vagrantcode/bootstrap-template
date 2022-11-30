/*series转化为group*/
/**
 *xData
 * data=[
 *{group:'',y:'',x:'',type:'bar'}
 * ]
 */
import * as echarts from 'echarts'
class Message{
  constructor(type,message) {
    this.type=type
    this.message=message
  }
  static fromJson(json){
    return new Message(json.type,json.message)
  }
}
const eventBus = require("mw-libs/MessageBus/MsgBus").default;
window.setChart = (data, option, dataOption) => {

  if (data) {
    option = dataFormat(data, option, dataOption)
  }
  eventBus.executeSub('setChart', {option: option})
}
eventBus.subscribe('pageReady', pageReady)

function dataFormat(apiData, option, dataOption) {
  option = option || {
    xAxis: {},
    series: []
  }
  option.xAxis = option.xAxis || {}
  option.xAxis.data = []
  option.series = option.series || []
  option.legend = option.legend || {}
  let legend = []
  let xAxisData = []
  let xAxisDataDic = {}
  let groupData = []
  let groupDataDic = {}
  apiData.forEach(item => {
    if (!xAxisDataDic[item.x]) {
      xAxisData.push(item.x)
      xAxisDataDic[item.x] = xAxisData.length
    }
    if (!groupDataDic[item.group]) {
      legend.push(item.group)
      item.type = item.type || 'bar'
      let nDataItem = {
        name: item.group,
        type: item.type,
        data: [],
      }
      if (dataOption && dataOption[item.type]) {
        let tp=JSON.parse(JSON.stringify(dataOption[item.type]))
        nDataItem = Object.assign(tp, nDataItem)
      }
      groupData.push(nDataItem)
      groupDataDic[item.group] = groupData.length
    }
    groupData[groupDataDic[item.group] - 1].data[xAxisDataDic[item.x] - 1] = item.y
  })
  option.xAxis.data = xAxisData
  option.series = groupData
  option.legend.data = legend
  return option
}

function getUnityBus(){
  if(!window.vuplex){
    return
  }
  return window.vuplex
}
if (window.vuplex) {
  addMessageListener();
} else {
  window.addEventListener('vuplexready', addMessageListener);
}
function sendMessage(msg){
  getUnityBus().postMessage(new Message('debug',msg));
}
function addMessageListener() {
  sendMessage('启动监听')
  window.vuplex.addEventListener('message', function(event) {
    try{
      let json = Message.fromJson(JSON.parse(event.data));
      eventBus.executeSub(json.type,json.message)
    }catch (e){
      sendMessage(e.message)
    }

    // > JSON received: { "type": "greeting", "message": "Hello from C#!" }


  });
}
function pageReady() {
  try {
    getUnityBus().postMessage(new Message('pageReady','页面准备好了'));
    addMessageListener()
  } catch (e) {
    sendMessage(e.message)
  }
}

let a = 0
export default a
