var system = require('../utils/system.js')
var utils = require('../utils/util.js')
function getLoginApi(jscode, successCB) {
    var data = {
        jscode: jscode,
        app:'xiaoqiming'
    }
    system.myRequest1('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/userLogin',data,successCB);
};

function login(sucess, fail) {
    var that = this
    // var app = getApp()
    // console.log(app)
    // if (!title) {
    //     title = '授权登录失败，部分功能将不能使用，是否重新登录？'
    // }
    // var user = this.globalData.user;
    if (true) {
        wx.login({
            success: function(code) {
                var code = code.code;
                wx.getUserInfo({
                    success: function(res) {
                        getLoginApi(code, function(info) {
                        	console.log(info)
                            var _user = {
                                'openid': info.openid,
                                'user_name': res.userInfo.nickName,
                                'avatar': res.userInfo.avatarUrl
                            }
                            wx.setStorageSync("user", _user)
                            app.globalData.user = _user
                            sucess(_user)
                        })
                    },
                    fail: function(res) {
                        wx.showModal({
                            title: '提示',
                            content: title,
                            showCancel: true,
                            cancelText: "否",
                            confirmText: "是",
                            success: function(info) {
                                if (info.confirm) {
                                    if (wx.openSetting) {
                                        wx.openSetting({
                                            success: (res) => {
                                                if (res.authSetting["scope.userInfo"]) {
                                                    wx.getUserInfo({
                                                        success: function(res) {
                                                            console.log(res)
                                                            that.getLoginApi(code, function(info) {
                                                                console.log(res)
                                                                var _user = {
                                                                    'openid': info.openid,
                                                                    'user_name': res.userInfo.nickName,
                                                                    'avatar': res.userInfo.avatarUrl
                                                                }
                                                                wx.setStorageSync("user", _user)
                                                                app.globalData.user = _user
                                                                sucess(_user)
                                                            })
                                                        }
                                                    })
                                                } else {
                                                    fail()
                                                }
                                            },
                                            fail: function() {
                                                fail()
                                            }
                                        })
                                    } else {
                                        fail()
                                    }
                                } else {
                                    fail()
                                }
                            }
                        })
                    }
                })
            },
            fail: function(res) {
                fail()
            }
        })
    } else {
        sucess(user)
    }
}
module.exports={login:login}