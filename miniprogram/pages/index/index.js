//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: '/images/user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },


  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  onGetOpenid: function() {
    wx.cloud.callFunction({
      name: 'yunrouter',
      data: {
        $url: "openid", //云函数路由参数
      },
      success: res => {
        console.log('[云函数] [login] user openid: ', res)
        app.globalData.openid = res.result
        console.log(app)
      },
      fail(e) {
        console.error('[云函数] [login] 调用失败', e)
      }
    });
  },
  chat(){
    if (!app.globalData.openid) {
      wx.showModal({
        title: '温馨提示',
        content: '该功能需要注册方可使用，是否马上去注册',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return false
    }
    wx.navigateTo({
      url : '/pages/example/chatroom_example/im'
    })
  },
  dingyeu(){
    if (!app.globalData.openid) {
      wx.showModal({
        title: '温馨提示',
        content: '该功能需要注册方可使用，是否马上去注册',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return false
    }
    wx.navigateTo({
      url: '/pages/example/subscribemessage/subscribemessage'
    })
  }
})
