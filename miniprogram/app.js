//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.cloud.init()
  },

  onShow(obj) {
    console.log(obj)
    if(obj.scene === 1038){
      // 对接统一身份认证小程序
      if( obj.referrerInfo && obj.referrerInfo.extraData && obj.referrerInfo.appId === 'wxaef6d2413690047f') {
        let {cardnum, name, identity} = obj.referrerInfo.extraData;
        (async() => {
          console.log(cardnum, name, identity)
        })()
      } else {
        // 没有完成认证，baby one more time
      }
    }
  },
  globalData: {
    userInfo: null
  }
})