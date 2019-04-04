const qs = require('querystring')
const moment = require('moment')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        item:{}
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let item = JSON.parse(options.item)
        if(item.birthdate){
            item.birthdate = moment(item.birthdate, 'YYYYMMDD').format('YYYY-MM-DD')
        }
        if(item.entryDate){
            item.entryDate = moment(item.entryDate, 'YYYYMM').format('YYYY-MM')
        }
        if(item.graduationDate){
            item.graduationDate= moment(item.graduationDate, 'YYYYMM').format('YYYY-MM')
        }
        this.setData({
            item
        })
        
        console.log(this.data.item)
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
        
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
    
    bindClick: function(e){
        
      
    }
  
  })