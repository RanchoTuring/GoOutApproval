// pages/teacher/detail/detail.js
const util=require('../../../utils/dataUtil.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info:JSON.parse(options.info),
      target:options.target
    })
    //console.log(this.data)
  },
  confirm(e){
    const db = wx.cloud.database()
    const that = this
    dueApply(db,that,1,util.getNowTime())
  },
  refuse(e){
    const db = wx.cloud.database()
    const that = this
    dueApply(db,that,-1,util.getNowTime())
  }
})

//审批
function dueApply(db,that,status,time){
  db.collection(util.getDBById(app.globalData.id, app.globalData.type))
  .doc(that.data.info._id)
  .update({
    data:{
      status:status,
      dTime:time
    }
  })
  .then(res => {
    wx.showToast({
      title: '审批完成！',
      icon: 'success',
      complete(e) {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      }
    })
  })
  .catch(res => {
    wx.showToast({
      title: '失败，请重试！',
      icon: 'none',
      complete(e) {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      }
    })
  })
}