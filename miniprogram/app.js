
// by 狼剩子 & 人型培养基
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init()
  },

  onShow(obj) {
    

    if(obj.scene === 1038){
      // 对接统一身份认证小程序
      if( obj.referrerInfo && obj.referrerInfo.extraData && obj.referrerInfo.appId === 'wxaef6d2413690047f') {
        let {cardnum, name, identity} = obj.referrerInfo.extraData;
        // authCheck = (await wx.cloud.callFunction({name:'idsAuth',data:{cardnum}})).result
        wx.login({
          success(res){
            let code = res.code
            wx.request({
              url:"http://localhost:3001/login",
              method:"POST",
              data:{
                code,
                name,
                cardnum
              },
              success(res){
                if(res.data.code == 200){
                  wx.login({
                    success(res){
                      wx.request({
                        url:"http://localhost:3001/login",
                        data:{code:res.code},
                        success(res){
                         if(res.data.success){
                            wx.setStorageSync("token", res.data.result)
                            wx.redirectTo({url:'/pages/search/search'})
                            return
                         } else {
                            wx.redirectTo({url:'/pages/forbidden/forbidden'})
                            return
                         }
                        }
                      })
                    }
                  })
                }
              }
            })
          }
        })
      } else {
        // 没有完成认证，baby one more time
        return
      }
      return
    }

    
    wx.login({
      success(res){
        wx.request({
          url:"http://localhost:3001/login",
          data:{code:res.code},
          success(loginRes){
            if(loginRes.data.success){
              wx.setStorageSync("token", loginRes.data.result)
              //wx.redirectTo({url:'/pages/search/search'})
              return
           } else {
              wx.redirectTo({url:'/pages/forbidden/forbidden'})
              return
           }
          }
        })
      }
    })
    // wx.redirectTo({url:'/pages/search/search'})
  },
  globalData: {
    userInfo: null
  }
})