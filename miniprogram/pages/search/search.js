var base64 = require("../../images/base64");
const qs = require('querystring')
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
    
    degree:['不限'],
    degreeDisp:'不限',
    degreeIndex:0,



    name: '',
    schoolnum: '',
    jydw:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取辅助数据
    //爱的魔力转圈圈 加载样式
    let that = this
    wx.showLoading({title:'更新辅助数据'})
    wx.request({
      url:"http://localhost:3001/addition",
      method:"POST",
      success(res){
        that.setData({
          college: that.data.college.concat(res.data.result["college"]),
          majority: that.data.majority.concat(res.data.result["majority"]),
          entryDate: that.data.entryDate.concat(res.data.result["entryDate"]),
          graduationDate: that.data.graduationDate.concat(res.data.result["graduationDate"]),
        })
        console.log(that.data.majority)
      }
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

  bindPickerDegree: function(e){
    this.setData({
      degreeIndex:e.detail.value,
      degreeDisp:this.data.degree[e.detail.value]
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

  bindSearch: function(e){
    let query
    
    query = {
      college: +this.data.collegeIndex ? this.data.college[this.data.collegeIndex] : undefined,
      majority: +this.data.majorityIndex ? this.data.majority[this.data.majorityIndex] : undefined,
      entryDate: +this.data.entryDateIndex ? this.data.entryDate[this.data.entryDateIndex] : undefined,
      graduationDate: +this.data.graduationDateIndex ? this.data.graduationDate[this.data.graduationDateIndex] : undefined,
      degree: +this.data.degreeIndex ? this.data.degree[this.data.degreeIndex]:undefined,
      name: this.data.name ? this.data.name : undefined,
      schoolnum: this.data.schoolnum ? this.data.schoolnum : undefined,
      sjgzdwmc: this.data.jydw ? this.data.jydw : undefined,
      pagesize: 100
    }
    if(this.data.name){
      query = {name:this.data.name}
    }
    if(this.data.schoolnum){
      query = {schoolnum:this.data.schoolnum}
    }
    //console.log(`/pages/list/list?query=${JSON.stringify(query)}`)
    
    wx.request({
      url:"http://localhost:3001/query",
      method:"POST",
      header:{
        token:wx.getStorageSync("token"),
        isIdentity:"true"
      },
      success(res){
        console.log(res.data)
        if(res.data.code==200){
          wx.navigateTo({
            url:`/pages/list/list?query=${JSON.stringify(query)}`
          })
        }else{
          console.log("fobbidden")
          wx.navigateTo({
            url:`/pages/forbidden/forbidden`
          })
        }
      }
    })
  }

})