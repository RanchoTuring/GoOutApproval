// pages/home/stu/stu.js
Page({
	navToApply(){
		wx.navigateTo({
			url: '/pages/student/apply/apply',
		})
  },
  navToHistory(){
		wx.navigateTo({
			url: '/pages/student/history/history',
		})
  },
  navToAccess(){
		wx.navigateTo({
			url: '/pages/student/access/access',
		})
	},
  /**
   * 页面的初始数据
   */
  data: {

  }

})