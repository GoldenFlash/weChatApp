// pages/flower/flower.js
var api = require('../../api.js');
var Zan = require('../../zanui/index');
var isPet = 0;
Page(Object.assign({}, Zan.Toast,{

  /**
   * 页面的初始数据
   */
  data: {
    imageName:'花草识别',
    imageContent:'地球上的花草植物我都认得了，发我一张试试吧',
    imageUrl:'http://pics.maiyizhi.cn/tupianshibie_flower.png',
    isShow: false,
    url: '',
    rate:'',
    name:'',
    color:'#5dc981',
    originData:"",
    data:"",
    flowerBoxTop:"700rpx",
    buttonName:"全部图片",
    imgNumber:5,
    scrollTop:-70,
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options",options)
    var that = this
    if (options.cart == 1) {
      isPet = 1;
      wx.setNavigationBarTitle({
        title:'宠物识别'
      })
      wx.setNavigationBarColor({
        frontColor:'#ffffff',
        backgroundColor:'#f09636'
      });
      this.setData(
        {
          imageName:'宠物识别',
          imageContent:'地球上的纯种宠物我都认得了，发我一张试试吧',
          imageUrl:'http://pics.maiyizhi.cn/tupianshibie_pet.png',
          color:'#f09636',
        }
      )
    }
    if (options.src !== undefined ) {
      this.setData(
        {
          isShow:true,
          url:options.src,
        }
      )
      //console.log(options)
      wx.showNavigationBarLoading();
      wx.showToast({
        title: '处理中……',
        duration:20000,
        icon: 'loading'
      })
      if (options.cart == 1) {
        api.pet(options.src,1,function (res) {

          wx.hideNavigationBarLoading();
          wx.hideToast();
          var r = res.object_list[0].label_confd * 100;

          r = r.toFixed(2)
          that.setData(
            {
              name:res.object_list[0].name,
              rate:r
            }
          )
        },function (res) {
          wx.hideNavigationBarLoading();
          wx.hideToast();
          that.showZanToast(res);
          setTimeout(function () {
            that.setData({
              isShow:false
            })
          },2000);
        })
      } else {

        api.flower(options.src,1,function (res) {
          console.log("options.src",options.src)
          console.log("res",res);
          wx.hideNavigationBarLoading();
          wx.hideToast();
          var data = res.detail

          // var newData = data;
          // newData.forEach((item)=>{
          //   var imgs = item.imgs.slice(0,6);
          //   item.imgs = imgs;
          // })
          that.setData(
            {
              data:data,
              // data:newData 
            }
          )

        },function (res) {
          wx.hideNavigationBarLoading();
          wx.hideToast();
          that.showZanToast(res);
          setTimeout(function () {
            that.setData({
              isShow:false
            })
          },2000);
        })
      }


    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
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
    // console.log(123123)
    wx.redirectTo({
      url:"/pages/flower/flower",
    })
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
    return {
      title:'快来看看你不知道的',
      path: "/pages/flower/flower?cart="+isPet
    }
  },
  uploadOriginalImage: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count:1,
      success: function (res) {
        console.log(res.tempFilePaths[0])
        that.afterAvatarChoose(res.tempFilePaths[0])
      }
    })
  },

  afterAvatarChoose: function (localPic) {
    var cart = 0;
    if (isPet == 1) {
      cart = 1;
    }
    wx.navigateTo({
      url: '/pages/cutInside/cutInside?src='+localPic+'&source='+7+'&cart='+cart
    })
  },

  cancel: function () {
    this.setData(
      {
        isShow: false
      }
    )
  },

currentChange(detail){
  console.log("detil",detail)
  this.setData({
    scrollTop:-70,
    imgNumber:5,
    buttonName:"全部图片"
  })
 },

toggleImage(){
  
  if(this.data.buttonName==="收起图片"){
    this.setData({
      imgNumber:5,
      buttonName:"全部图片"
    })
   
  }else if(this.data.buttonName==="全部图片"){
    this.setData({
      imgNumber:20,
       buttonName:"收起图片"
    })
  }
 
}

}))