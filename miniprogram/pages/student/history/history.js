// pages/student/history/history.js
const util = require('../../../utils/dataUtil.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  navToDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/student/detail/detail?info=' + JSON.stringify(e.currentTarget.dataset.info)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db=wx.cloud.database()
    const that=this
    const dbName=util.getDBById(app.globalData.id, app.globalData.type)

    db.collection(dbName)
      .where({
        _openid:app.globalData.openid,
      }).get()
      .then(res=>{
        that.setData({
          applys:res.data.reverse()
        })
      })
  }
})