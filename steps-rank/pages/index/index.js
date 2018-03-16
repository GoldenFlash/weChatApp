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
        var that =this;
        // this.inituserInfo();
        wx.login({
            success(res){
                console.log("jscode",res.code)
            }
        })
        api.login(function(res,code){
            // console.log("userInfo",res)
            console.log("code",code)
            that.setData({
                userInfo:res
            });
            that.initSelfStep(code);
            // console.log("userInfo3",that.data.userInfo)
        })
       
        
        wx.showShareMenu({
            withShareTicket: true 
        })
        
        
    },
    //huoqu ShareTicked
    
    
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

    initSelfStep: function(code) {

        var that = this;
        var js_code = code;
        // 请求步数数据
        var _getWeRunData = function() {
            wx.getWeRunData({
                success(res) {
                   console.log("userInfo2",that.data.userInfo);
                    var iv = res.iv;
                    var encryptedData = res.encryptedData;
                    wx.request({
                        url:"https://ai.maiyizhi.cn/producter/php/frontend/web/index.php?r=steps/default/index",
                        data:{
                            js_code:js_code,
                            openid:that.data.userInfo.openid,
                            name:that.data.userInfo.user_name,
                            avatar:that.data.userInfo.avatar,
                            run_data_encryptedData:encryptedData,
                            run_data_iv:iv
                        },
                        method:"POST",
                        header: {
                            'content-type': 'application/json' // 默认值
                        },  
                        success: function(res) {
                            console.log("werun",res)
                        },
                        fail(res){
                            console.log("fail")
                        }
                    })
                    
                   
                    
                }
            })
        };
        
        wx.getSetting({
            success(res) {
                console.log("setting",res)
                if (res.authSetting['scope.werun']) {
                    // console.log(564) 
                    _getWeRunData();

                }else if(!res.authSetting['scope.werun']) {
                    // console.log(23123)   
                    wx.authorize({
                        scope:'scope.werun',
                        success(res) { 
                            console.log("scope",res)
                            _getWeRunData();
                        },
                        fail(res){
                            console.log("fail",res)
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

                console.log("res.shareTickets[0]")
                console.log(res.shareTickets[0])
            }
        }
    }
})