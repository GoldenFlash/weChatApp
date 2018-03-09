// pages/produce/produce.js
const { Field, extend } = require('../../zanui-weapp/dist/index');
Page(extend({}, Field, {
  // 输入框内容更改时触发
  handleZanFieldChange({ componentId, detail }) {
    /*
     * componentId 即为在模板中传入的 componentId
     * 用于在一个页面上使用多个 tab 时，进行区分
     * detail 即输入框中的内容
     */
    /*
     * 处理函数可以直接 return 一个字符串，将替换输入框的内容。
     */
  },
  // 输入框聚焦时触发
  handleZanFieldFocus({ componentId, detail }) { },
  // 输入框失焦时触发
  handleZanFieldBlur({ componentId, detail }) { },


  /**
   * 页面的初始数据
   */
  data: {
    startTape:false,
    onTape:true,
    tapeMessage:"开始录音"
  },
 startTape(){
  var that =this;
  this.setData({
    startTape:!that.data.startTape,
    tapeMessage:"正在录音"
  })
 },
 onTape(){
  var that = this;
  if(this.data.tapeMessage==="正在录音"){
    this.setData({
      onTape:!that.data.onTape,
      tapeMessage:"暂停"
    })
  }else{
     this.setData({
      onTape:!that.data.onTape,
      tapeMessage:"正在录音"
    })
  }
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }

}));

