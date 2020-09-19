// pages/teacher/history/history.js
const util=require('../../../utils/dataUtil.js')
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
      url: '/pages/teacher/detail/detail?info=' + JSON.stringify(e.currentTarget.dataset.info)+'&target='+e.currentTarget.dataset.target
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db=wx.cloud.database()
    const that=this
    const dbName=util.getDBById(app.globalData.id, app.globalData.type)
    const _=db.command
    db.collection(dbName)
      .where({
        status:_.in([-1,1])
      }).get()
      .then(res=>{
        that.setData({
          applys:res.data.reverse()
        })
      })
  }
})