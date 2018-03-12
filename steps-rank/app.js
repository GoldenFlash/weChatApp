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
      // console.log(opts.shareTicket)
       wx.getShareInfo({
        shareTicket: opts.shareTicket,
          complete(res){
            // console.log("getTicket")
            // console.log(res)
          }
      })
    }
   
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录

    // wx.login({
    //   success: res => {
    //     var code = res.code;
    //     console.log("code")
    //     console.log(res)
        
    //     var rawData,signature,encryptedData,iv;
    //     wx.getUserInfo({
    //       success(res){
    //         console.log(res)
    //         rawData = encodeURIComponent(res.rawData);
    //         signature = res.signature || '';
    //         encryptedData = res.encryptedData;
    //         iv = res.iv;
    //       }
    //     })

    //      wx.request({
           
    //       url:"https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/login",

    //        data:{
    //           jscode: code,
    //           rawData:rawData,
    //           signature,signature,
    //           encryptedData:encryptedData,
    //           iv:iv
    //        },
    //       header:{
    //          'Content-Type': 'application/json'
    //       },
    //       success:function(res){
    //          console.log("session_key");
    //          console.log(res);
             
    //        }
    //      })
    //   }
    // })
  
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