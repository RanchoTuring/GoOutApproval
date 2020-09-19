// pages/home/tec/tec.js
const app=getApp()
Page({
	navToApproval(){
		wx.navigateTo({
			url: '/pages/teacher/approval/approval',
		})
  },
  navToHistory(){
		wx.navigateTo({
			url: '/pages/teacher/history/history',
		})
  },
  /**
   * 页面的初始数据
   */
  data: {
    collegeMap:{
      '01':'资源',
      '02':'地测',
      '03':'化环',
      '04':'机电',
      '05':'管理',
      '06':'力建',
      '07':'理',
      '08':'文法'
    }
  },
  
  onLoad: function (options) {
    this.setData({
      college:this.data.collegeMap[app.globalData.id.substr(4,2)],
      grade:app.globalData.id.substr(6)
    })
  }
})