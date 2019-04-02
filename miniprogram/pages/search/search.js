var base64 = require("../../images/base64");
// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collegeMap:{},

    college: ['不限'],
    collegeDisp:'不限',
    collegeIndex: 0,

    majority: ['不限'],
    majorityDisp:'不限',
    majorityIndex:0,

    gander: ['不限','男', '女'],
    ganderDisp:'不限',
    ganderIndex: 0,

    entryDate: ['不限'],
    entryDateDisp: '不限',
    entryIndex: 0,

    graduationDate: ['不限'],
    graduationDateDisp: '不限',
    graduationDateIndex: 0,

    name: '',
    schoolnum: '',
    jydw:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取辅助数据
    wx.showLoading({title:'更新辅助数据'})
    let res = await wx.cloud.callFunction({
      name:'getHelperData'
    })
    this.setData({
      collegeMap:res.result.collegeMap,
      entryDate:['不限', ...res.result.entryDate],
      graduationDate:['不限', ...res.result.graduationDate],
      college:['不限', ...Object.keys(res.result.collegeMap)]
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindPickerCollege: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      collegeIndex: e.detail.value,
      collegeDisp: this.data.college[e.detail.value].slice(0, 12) + (this.data.college[e.detail.value].length>12? '...' :''),
      majority: e.detail.value != 0 ? ['不限', ...Object.keys(this.data.collegeMap[this.data.college[e.detail.value]])]:['不限'],
      majorityIndex: 0,
      majorityDisp: '不限'
    })
  },

  bindPickerMajority: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      majorityIndex: e.detail.value,
      majorityDisp: this.data.majority[e.detail.value].slice(0, 12) + (this.data.majority[e.detail.value].length>12? '...' :'')
    })
  },

  bindPickerGander: function(e){
    this.setData({
      ganderIndex:e.detail.value,
      ganderDisp: this.data.gander[e.detail.value]
    })
  },

  bindPickerEntryDate: function(e){
    this.setData({
      entryDateIndex:e.detail.value,
      entryDateDisp:this.data.entryDate[e.detail.value]
    })
  },

  bindPickerGraduationDate: function(e){
    this.setData({
      graduationDateIndex:e.detail.value,
      graduationDateDisp:this.data.graduationDate[e.detail.value]
    })
  },

  bindName: function(e){
    this.setData({
      name:e.detail.value
    })
  },

  bindSchoolnum: function(e){
    this.setData({
      schoolnum:e.detail.value
    })
  },

  bindJydw: function(e){
    this.setData({
      jydw:e.detail.value
    })
  },

})