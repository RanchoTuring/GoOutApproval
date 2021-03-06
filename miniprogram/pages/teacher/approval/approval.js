// pages/teacher/approval/approval.js
const util=require('../../../utils/dataUtil.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //ans 0 姓名 1 性别  2 专业班级  3 外出日期  4 外出时段  5 外出原因 6 证明材料URL
  },
  navToDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/teacher/detail/detail?info=' + JSON.stringify(e.currentTarget.dataset.info)+'&target='+e.currentTarget.dataset.target
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db=wx.cloud.database()
    const that=this

    db.collection(util.getDBById(app.globalData.id, app.globalData.type))
      .where({
        status:0
      }).get()
      .then(res=>{
        that.setData({
          applys:res.data
        })
      })
  }
})