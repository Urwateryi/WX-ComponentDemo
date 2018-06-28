//是否显示日志
var showLog = getApp().globalData.showLog;

function v(tag, content) {
  if (showLog) {
    console.log("zoey//" + tag + ": ", content);
  }
}

function e(tag, content) {
  if (showLog) {
    console.log("zoey//" + tag + ": ", content);
  }
}

module.exports = {
  v: v,
  e: e,
}