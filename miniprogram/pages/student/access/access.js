// pages/student/access/access.js
const util = require('../../../utils/dataUtil.js')
const app=getApp()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
  },
  //根据学生提交的外出日期与当前日期
  //判断是否允许学生外出
  checkAccess(){
    let startDate=new Date(this.data.info.ans[3])
    let endDate=new Date(startDate.setDate(startDate.getDate()+1))
    startDate=new Date(this.data.info.ans[3])
    let now =new Date()
    if(now>startDate && now<endDate){
      this.setData({
        canAccess:true
      })
    }else{
      this.setData({
        canAccess:false
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //拉取最新一次的审批通过的申请，并校验是否有效
    const db=wx.cloud.database()
    const that=this
    const dbName=util.getDBById(app.globalData.id, app.globalData.type)
    db.collection(dbName)
      .where({
        _openid:app.globalData.openid,
        status:1
      }).get()
      .then(res=>{
        console.log(res)
        that.setData({
          info:res.data.reverse()[0]
        })

        if(that.data.info){
          that.checkAccess()
        }
      })
  },
})