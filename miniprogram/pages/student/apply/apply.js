// pages/student/apply/apply.js
const util = require('../../../utils/dataUtil.js')
const app = getApp()
Page({
  //提交申请，根据学生学号，将申请传入对应的云数据库
  submit(e) {
    const db = wx.cloud.database()
    const that = this
    db.collection(util.getDBById(app.globalData.id, app.globalData.type))
      .add({
        data: {
          stuId: app.globalData.id,
          ctime: util.getNowTime(),
          status: 0,
          ans: e.detail.value,
          dTime:""
        }
      })
      .then(res => {
        wx.showToast({
          title: '提交成功！',
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
  },
  // 上传图片
  doUpload: function () {
    let that = this
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // 上传图片,图片名称为学号加时间戳
        const cloudPath = app.globalData.id + (new Date().getTime() % 10000000).toString() + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            that.setData({
              imgUrl: res.fileID
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    questions: {
      num: 7,
      ques: [{
          title: "姓名",
          //0 单选  1 多选 2 单行   3 多行  4 日期选择  5  上传照片
          type: 2
        }, {
          title: "性别",
          type: 0,
          item: ['男', '女']
        }, {
          title: "专业班级",
          type: 2
        }, {
          title: "外出日期",
          type: 4
        }, {
          title: "外出时段",
          type: 0,
          item: ['上午', '下午', '全天']
        }, {
          title: "外出原因",
          type: 2
        }, {
          title: "证明材料拍照上传（如有必要）",
          type: 5
        }

      ]
    }
  },

  bindDateChange(e) {
    console.log(e)
    this.setData({
      date: e.detail.value
    })
  }
})