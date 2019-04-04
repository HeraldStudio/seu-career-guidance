const qs = require('querystring')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query:{},
        page:1,
        list:[],
        more: true
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      // 获取辅助数据
      this.setData({query:JSON.parse(options.query)})
      await this.loadMore()
      if(this.data.list.length === 0){
          wx.showToast({title:'查询无结果', icon:'none'})
          setTimeout(()=>{wx.navigateBack()}, 1500)
      }
    },
    
    loadMore: async function(){
        if(!this.data.more){
            return
        }
        wx.showLoading({title:'正在加载'})
        let res = await wx.cloud.callFunction({
            name:'search',
            data:{...this.data.query, page:this.data.page}
        })
        console.log(res)
        if(res.result && res.result.list && res.result.list.length > 0){
            console.log(res.result.list)
            this.setData({list:this.data.list.concat(res.result.list), page:this.data.page+1})
        } else {
            this.setData({more:false})
        }
        wx.hideLoading()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.loadMore()
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
    
    bindClick: function(e){
        // 赵拯基在此处写跳转到详情页的逻辑
        // item中是被点击条目的所有数据
        
        wx.navigateTo({
            //url:`/pages/detail/detail?query=${JSON.stringify(e.currentTarget.dataset.item)}`
            url:`/pages/detail/detail?item=${JSON.stringify(e.currentTarget.dataset.item)}`
        })
    }
  
  })