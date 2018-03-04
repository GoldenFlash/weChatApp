//app.js

App({
  globalData: {
    userInfo: null,
    code:"",
    user:'',
    sessionKey:''
  },
  onLaunch: function (opts) {
    var that = this;
    if(opts.scene == 1044){
      console.log(opts.shareTicket)
       wx.getShareInfo({
        shareTicket: opts.shareTicket,
          complete(res){
            console.log("getTicket")
            console.log(res)
          }
      })
    }
   
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        console.log("code")
        console.log(res)
         wx.request({
           
          url:"https://api.weixin.qq.com/sns/jscode2session",

           data:{
             js_code:code, //用于拿到sessionKey
             appid: "wx896b0398c56fa7e3",
             secret:"a756088fee969b15df75c7179442cebf",
             grant_type:"authorization_code"
           },
          header:{
             'Content-Type': 'application/json'
          },
          success:function(res){
             console.log("session_key");
             console.log(res);
             that.globalData.sessionKey = res.sessionKey;
           }
         })
      }
    })
  
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              console.log("res.userInfo")
              console.log(res)
              console.log("res.userInfo")
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  
})