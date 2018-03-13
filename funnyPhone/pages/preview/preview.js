// pages/preview/preview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    workInfo:"",
    tempFilePath:"",
    audioUrl:"",
    accept:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var workInfo = JSON.parse(options.workInfo);
    var tempFilePath = options.tempFilePath;
    console.log(workInfo)
    console.log(options)
    this.setData({
      workInfo:workInfo,
      tempFilePath:tempFilePath
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
  },

   onShow: function (options) {
    console.log("options")
    console.log(options)
  },
  receptCall(){
    var that = this;
    that.setData({
      accept:true
    })
    this.audioCtx.pause()
    console.log("audioUrlaudioUrl")
    console.log(that.data.tempFilePath)
    this.audioCtx.setSrc(that.data.tempFilePath)
    this.audioCtx.play()
  },
  rejectCall(){
    wx.navigateBack();
  }
})