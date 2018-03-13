//index.js
//获取应用实例
const app = getApp()
// var WXBizDataCrypt = require('../../node/WXBizDataCrypt.js')
const api = require("../../api.js")
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        // 步数排行榜
        user_avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ephM5MKRNqiaJHykaMBOpicBDZLt45lMPNEFaxFjvKxm0EwuW44c3N5OcaxjuoNcTfJuj2qkdoicwGBA/0',
        userStep: {},
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        this.inituserInfo();

        api.login(function(res){
            console.log("resres")
            console.log(res)
        })

        this.initSelfStep();
        this.getShareTicked();
        
    },
    //huoqu ShareTicked
    getShareTicked:function(){
         wx.showShareMenu({
            withShareTicket: true 
        })
    },
    
    inituserInfo: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
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
    },

    initSelfStep: function() {

        var that = this;

        // 请求步数数据
        var _getWeRunData = function() {
            wx.getWeRunData({
                success(res) {
                    // console.log("---------")
                    // console.log(res.encryptedData)
                    // console.log(res.errMsg)
                    // console.log(res.iv)
                    // console.log("-------")

                    var appId = "wx896b0398c56fa7e3";
                    var sessionKey = app.globalData.sessionKey;
                    var iv = res.iv;
                    var encryptedData = res.encryptedData;
                    // wx.requst({
                    //     url:"https://ai.maiyizhi.cn/producter/php/frontend/web/index.php?r=steps/default/index"
                    // })
                    
                   
                    
                }
            })
        };
        
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.werun']) {
                    
                    _getWeRunData();

                } else if (!res.authSetting['scope.werun']) {
                    wx.authorize({
                        scope: 'scope.werun',
                        success() {
                            
                            _getWeRunData();
                        }
                    })
                    
                }
            }
        })

    },
    getUserInfo: function(e) {
        // console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    onShareAppMessage: function() {
        return {
            path: "pages/rankingList/rankingList",
            success(res){

                // console.log("res.shareTickets[0]")
                // console.log(res.shareTickets[0])
            }
        }
    }
})