//app.js
const api = require("./api.js")
App({
  globalData: {
    userInfo: null,
    code:"",
    user:'',
    sessionKey:'',
    system_info:'',
  },
  onLaunch: function (opts) {
    var that = this;
    api.login(function(res) {
      var userInfo = res;
        console.log("login",userInfo)
        console.log("scene",opts)

        if(opts.scene == 1044){
          console.log(opts.shareTicket)
           wx.getShareInfo({
            shareTicket: opts.shareTicket,
              complete(res){
                console.log("getTicket",res)
                console.log(res.iv)
                var share_info_encryptedData = res.encryptedData;
                var share_info_iv = res.iv;
                wx.getWeRunData({
                  success(res){
                    console.log("getWeRunData",res)
                    var run_data_encryptedData=res.encryptedData;
                    var run_data_iv=res.iv;
                     wx.request({
                        url:"https://ai.maiyizhi.cn/producter/php/frontend/web/index.php?r=steps/default/index",
                        method:"POST",
                        data:{
                          share_info_encryptedData:share_info_encryptedData,
                          share_info_iv:share_info_iv,
                          openid:userInfo.openid,
                          name:userInfo.user_name,
                          avatar:userInfo.avatar,
                          run_data_encryptedData:run_data_encryptedData,
                          run_data_iv:run_data_iv,
                          
                        },
                        header: {
                            'content-type': 'application/json' // 默认值
                        },  
                        success: function(res) {
                            console.log("qun",res)
                        },
                        fail(res){
                            console.log("fail")
                        }
                      })

                  }
                })

               



              }
          })
        }
      }
    );


    
   
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({

      success: res => {
        // console.log("setting")
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log("userif",res)
              that.globalData.userInfo = res.userInfo
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.getUserInfo({
            success: res => {
              that.globalData.userInfo = res.userInfo
              console.log("res.userInfo")
              console.log(res)
              console.log("res.userInfo")
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    wx.getSystemInfo({

      success: function(res) {
      
          // that.globalData.system_info = res
        }
      })

  },
  
})