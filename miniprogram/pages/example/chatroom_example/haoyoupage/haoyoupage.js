// pages/about/about.js
Page({

  data: {
    des: 'qq~'
  },
  onLoad: function (options) {
    let haoyouinfo1 = JSON.parse(options.haoyouinfo);
    this.setData({
      haoyouinfo:haoyouinfo1
    })
    
    console.log(this.data.haoyouinfo)

  },
  //复制
  copy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.copy,
      success: res => {
        wx.showToast({
          title: '复制' + e.currentTarget.dataset.name + '成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
  },
  chat(){
      let that = this;
      that.setData({
        //这个id就唯一标识这个好友
        chatid: that.data.haoyouinfo.id,
        chatname: that.data.haoyouinfo.userInfo.nickName,
      })
  
      wx.navigateTo({
        url: '/pages/example/chatroom_example/room/room?id=' + that.data.chatid + '&name=' + that.data.chatname,
      })

  },
})