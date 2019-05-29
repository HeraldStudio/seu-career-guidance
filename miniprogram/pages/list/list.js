const qs = require('querystring')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        page: 1,
        list: [],
        more: true,
        countHint: '检索中...',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.setData({ query: JSON.parse(options.query) })
        // 获取辅助数据
        await this.loadMore()
        if (this.data.list.length === 0) {
            wx.showToast({ title: '查询无结果', icon: 'none' })
            setTimeout(() => { wx.navigateBack() }, 1500)
        }
    },

    loadMore: function () {
        let that = this 
        return new Promise((resolve, reject) => {
            if (!this.data.more) {
                return
            }
           
            wx.showLoading({ title: '正在加载' })
            //查询数据
            wx.request({
                url: "http://localhost:3001/query",
                method: "POST",
                header: {
                    token: wx.getStorageSync("token"),
                    isIdentity: "false"
                },
                data: {
                    ...this.data.query,
                    page: this.data.page,
                    pagesize: 100
                },
                success(res) {
                    console.log(res.data.result)
                    if (res.data.code == 200) {
                        if (res.data && res.data.result["resultData"] && res.data.result["count"] > 0) {
                            that.setData({ countHint: `共 ${res.data.result["count"]} 条记录`, list: that.data.list.concat(res.data.result["resultData"]), page: that.data.page + 1 })
                            resolve()
                        } else {
                            that.setData({ more: false })
                            resolve() 
                        }
                    } else {
                        console.log(res.data.result)
                        console.log("查询有误")
                        wx.reLaunch({
                            url: '/pages/forbidden/forbidden'
                        })
                        resolve()
                    }
                }
            })
            wx.hideLoading()
        })
        
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

    bindClick: function (e) {

        wx.navigateTo({
            //url:`/pages/detail/detail?query=${JSON.stringify(e.currentTarget.dataset.item)}`
            url: `/pages/detail/detail?item=${JSON.stringify(e.currentTarget.dataset.item)}`
        })
    }

})