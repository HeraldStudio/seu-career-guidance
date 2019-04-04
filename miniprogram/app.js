
// by 狼剩子 & 人型培养基
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.cloud.init()
  },

  async onShow(obj) {
    let db = wx.cloud.database()
    let authCheck = null

    if(obj.scene === 1038){
      // 对接统一身份认证小程序
      if( obj.referrerInfo && obj.referrerInfo.extraData && obj.referrerInfo.appId === 'wxaef6d2413690047f') {
        let {cardnum, name, identity} = obj.referrerInfo.extraData;
        authCheck = (await wx.cloud.callFunction({name:'idsAuth',data:{cardnum}})).result
        if(authCheck === 'ids-error'){
          wx.redirectTo({url:'/pages/welcome/welcome'})
          return
        } else if (authCheck === 'forbidden') {
          wx.redirectTo({url:'/pages/forbidden/forbidden'})
          return
        }
      } else {
        // 没有完成认证，baby one more time
        return
      }
    }

    authCheck = (await wx.cloud.callFunction({name:'idsAuth'})).result
    console.log(authCheck)
    if(authCheck === 'ids-error'){
      wx.redirectTo({url:'/pages/welcome/welcome'})
      return
    } else if (authCheck === 'forbidden') {
      wx.redirectTo({url:'/pages/forbidden/forbidden'})
      return
    }
    
    wx.redirectTo({url:'/pages/search/search'})
  },
  globalData: {
    userInfo: null
  }
})