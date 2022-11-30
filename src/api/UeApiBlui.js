const eventBus = require("mw-libs/MessageBus/MsgBus").default;
try {
    "object" != typeof ue && (ue = {}), uuidv4 = function () {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, function (t) {
            return (t ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> t / 4).toString(16)
        })
    }, ue4 = function (r) {
        return "object" != typeof ue.interface || "function" != typeof ue.interface.broadcast ? (ue.interface = {}, function (t, e, n, o) {
            var u, i;
            "string" == typeof t && ("function" == typeof e && (o = n, n = e, e = null), u = [t, "", r(n, o)], void 0 !== e && (u[1] = e), i = encodeURIComponent(JSON.stringify(u)), "object" == typeof history && "function" == typeof history.pushState ? (history.pushState({}, "", "#" + i), history.pushState({}, "", "#" + encodeURIComponent("[]"))) : (document.location.hash = i, document.location.hash = encodeURIComponent("[]")))
        }) : (i = ue.interface, ue.interface = {}, function (t, e, n, o) {
            var u;
            "string" == typeof t && ("function" == typeof e && (o = n, n = e, e = null), u = r(n, o), void 0 !== e ? i.broadcast(t, JSON.stringify(e), u) : i.broadcast(t, "", u))
        });
        var i
    }(function (t, e) {
        if ("function" != typeof t) return "";
        var n = uuidv4();
        return ue.interface[n] = t, setTimeout(function () {
            delete ue.interface[n]
        }, 1e3 * Math.max(1, parseInt(e) || 0)), n
    });
} catch (e) {
    console.log(e)
}

/*---------------------------------ue接口调用-------------------*/
/**
 * ue调用js
 * */
function postMsgToJs(param) {
    try {
        eventBus.executeSub('msgToJs', param)
    } catch (e) {
        alert(e.message)
        alert('请检查数据是否是json')
        console.log(e)
    }
}

try {
    ue.interface.postMsgToJs = postMsgToJs
} catch (e) {
    console.log(e)
}
window.postMsgToJs = postMsgToJs

/**
 * js调用ue
 * */
function __postMsgToUe(key, msg) {
    try {
        // blu_event(key, msg);//blui的调用方法
        ue4(key, msg)
        //本地服务测试
        eventBus.executeSub(key, msg)
    } catch (e) {
        alert(e.message)
    }
}

eventBus.subscribe('__postMsgToUe', (data) => {
    __postMsgToUe('onJsMsg', data)
})

function postMsgToUe(msg) {
    eventBus.executeSub('__postMsgToUe', msg)
}

window.postMsgToUe = postMsgToUe
