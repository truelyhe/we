const app = getApp();
const TmplId ='zskXwIP3LzMdHucIKIYWvjj88q2onMThnJXlM0fomUg';
//这里的lessonTpId是自己从微信公众平台模板库申请的ID
//登录公众平台，选择模板消息就行
//选择适合自己类型的模板即可
Page({
  data: {
    jiaoyi: [
      {
        id:0,
        //这里的变量名字一定要和从平台申请的模板所给的变量对应
        thing1: { value: '昵称' },
        thing2:{value:'书籍预约'},
        date3:{value:'2020-02-08'},
        thing4: { value:'等你抢购'},
        phrase5:{value:'预约成功了'},
      },
    ],
  },
  Subscribe: function(e) {
    const item = e.currentTarget.dataset.item;
    wx.requestSubscribeMessage({
      tmplIds: [TmplId],
      success(res) {
        //开发文档文档详细对的说明，接口调用返回的结果是什么
//https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          wx.cloud.callFunction({
              //通过调用云函数，实现用户点击允许我们发送订阅消息，
              //将该数据订阅保存到数据库，以便在满足条件的时候发送给用户
              name: 'yunrouter',
              data: {
                $url: "subscribeMessage",
                data: item,
                templateId: TmplId,
                //这个是给用户发送订阅消息后，用户点击订阅消息进入小程序的相关页面，一定要是在线的才可以
                page:'pages/index/index',
              },
            success(res){
            wx.showToast({
              title: '订阅成功',
              icon: 'success',
              duration: 2000,
            });
            console.log(res)
              },
             fail(re){
            wx.showToast({
              title: '订阅失败',
              icon: 'fail',
              duration: 2000,
            });
            console.log(re)
            }
      })}
      },
      fail(re){
        console.log(re)
      }
    })
  },

  //实现在满足条件的时候给用户发送模板消息
  //像二手物品交易中，将用户的物品信息存储起来，等到其他人购买，提醒用户发货
  //就可以在别人下单的函数中，给卖家发送模板消息。
  send: function (e){
    const item = e.currentTarget.dataset.item;
    wx.cloud.callFunction({
      name: 'yunrouter',
      data: {
        $url: "subscribeMessagesend",
        id:item.id
      },
      success(res){
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000,
        });
        console.log(res)
      },
      fail(re){
        wx.showToast({
          title: '发送失败',
          icon: 'fail',
          duration: 2000,
        });
        console.log(re)
      }
    })

  },
  
});
