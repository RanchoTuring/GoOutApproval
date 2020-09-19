// pages/login/login.js
/*
页面逻辑：
1. 用户登录：展示登录按钮和提示信息
2. 判断用户是否为首次登录
    首次登录：显示用户微信头像和昵称，显示身份绑定页面
    已绑定过身份：直接进入Home页面
*/
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userType: ['学生', '辅导员']
  },
  //信息完整性校验
  verify(e) {
    if (e.detail.value.id == "" || e.detail.value.type == "") {
      wx.showToast({
        title: '请完整填写信息',
        icon: 'none'
      })
    } else {
      this.submit(e)
    }
  },
  //提交信息到数据库
  submit(e) {
   // console.log("提交信息：", e.detail.value)
    let that = this
    this.setData({
      id: e.detail.value.id,
      type: e.detail.value.type
    })
    const db = wx.cloud.database()
    db.collection('user').add({
      data: {
        //以学号或授权号作为数据库主键
        //后期考虑对id数据进行过滤，防止有人恶意使用错误id进行绑定
        _id: e.detail.value.id,
        type: e.detail.value.type
      }
    }).then(res => {
     // console.log(res)
      //绑定成功，根据用户类型跳转
      app.globalData.id = that.data.id
      app.globalData.type = that.data.type
      that.navigateToHome()
    }).catch(res => {
      //因为以学号作为了主键，因此，每个学号只能绑定一个微信
      //再次绑定时会有错误
      console.error(res)
      wx.showToast({
        title: '学号已被注册，请确认输入无误',
        icon: 'none'
      })
    })
  },
  //登录按钮点击事件函数
  doUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //跳转至home页面
  navigateToHome() {
    let targetUrl;
    if (app.globalData.type == 0) {
      targetUrl = '../home/stu/stu'
    } else {
      targetUrl = '../home/tec/tec'
    }
    wx.redirectTo({
      url: targetUrl,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      console.log('全局启动时获取到了信息')
     // console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log('页面启动时获取')
      //  console.log(res)
      }

    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.checkOpenID()
  },
  checkOpenID: function () {
    // 在第一步，需检查是否有 openid，如无需获取
    let that = this
    if (!app.globalData.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          const db = wx.cloud.database()
          //查询当前微信号绑定的用户类型
          db.collection('user').where({
            _openid: app.globalData.openid
          }).get({
            success: res => {
              console.log('该用户数据', res)
              if (res.data.length != 0) {
                app.globalData.id = res.data[0]._id
                app.globalData.type = res.data[0].type
                app.globalData.isFirstLogin = false
                that.navigateToHome()
              } else {
                app.globalData.isFirstLogin = true
                that.setData({
                  isFirstLogin: app.globalData.isFirstLogin
                })
              }
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '查询记录失败'
              })
              console.error('[数据库] [查询记录] 失败：', err)
            }
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isFirstLogin: app.globalData.isFirstLogin
    })
  }
})