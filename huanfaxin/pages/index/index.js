// pages/index2/index2.js
const app = getApp()
// const api = require('../../api.js');
const util = require('../../utils/util.js');
const upload = require('../../utils/upload.js');
var data = require('../../utils/data.js');
// const config = require('../../utils/config.js').config;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fontSize: '44.8418',
    imageUrl: '../statics/bizhi_0.jpg',
    imgIndex:0,
    tapImage: '',
    textShow: true,
    lockShow:'',
    scrollHeight: '100vh',
    buttonShow: true,
    isSure: false, /*false*/
    datas: [],
    trueIndex: '',
    buttonName: '换发型',
    image: '../statics/bizhi_0.jpg',
    coverSwitchStart:0,
    coverSwitchEnd:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      datas: data.data
    });
    // console.log(options)
    if (options.url != undefined) {
      var url = options.url;
      wx.hideToast();
      that.setData({
        // image: `url('${pic.url}?imageView2/1/w/375/h/812')`,
        image: url,
        imageUrl: url,
        textShow: false,
        buttonShow: false
      });
    }
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        // console.log(res.model);
        if (res.model === 'iPhone X') {
          that.setData({
            fontSize: '30'
          })
        } else {
          that.setData({
            fontSize: (res.windowHeight - 160) / 1454 * 100
          })
        }
      }
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
  //改变系统背景图片
  changeBgImage(){
    var that = this;
    
    var index = that.data.imgIndex;
    // console.log("imgIndex"+that.data.imgIndex)
    // console.log(index)


    if(that.data.imgIndex < 10){
      index = that.data.imgIndex + 1;
      that.setData({
        imgIndex:index, 
      });
      that.setData({

        imageUrl:"../statics/bizhi_"+index+".jpg",
        image:"../statics/bizhi_"+index+".jpg"
      })
      
      
    }else{
    index = 0;
      that.setData({
          imgIndex:index,
      });
      that.setData({
        imageUrl:"../statics/bizhi_"+index+".jpg",
        image:"../statics/bizhi_"+index+".jpg"
      })
    };
    
  },
  // 背景图片遮盖层切换
  //获取滑动起点坐标
  // coverSwitchStart(e){
  //   // console.log(e.changedTouches[0].pageX);
  //   this.setData({
  //     coverSwitchStart:e.changedTouches[0].pageX
  //   });
  // },
  // //获取滑动终点坐标
  // coverSwitchEnd(e){
  //  // console.log(e.changedTouches[0].pageX);
  //   this.setData({
  //     coverSwitchStart:e.changedTouches[0].pageX
  //   })
  //   // console.log(this.data.coverSwitchStart);
  //   this.coverSwitch();
  // },
  // // coverSwitchmove(){

  // // },
  // 实现切换
  coverPreview(){
      if(this.data.lockShow ==''){
        this.setData({
          lockShow:"shouping",
        })
      };
     if(this.data.lockShow=="shouping"){
       this.setData({
        lockShow:"suoping",
      })
     }else if(this.data.lockShow=="suoping"){
        this.setData({
          lockShow:"shouping",
        })
      }
  },

  confirm() {
    
    var that = this;

    if (that.data.imageUrl === '') {
      
    } else 
    if (that.data.imageUrl !== ''&& that.data.tapImage !=="") {
      wx.navigateTo({
        url: '../image/image?imageUrl='+that.data.imageUrl+'&tapImage='+that.data.tapImage,
      });
    } else if (that.data.textShow === false) { 
      wx.getSystemInfo({
        success: function (res) {
          if (res.model === 'iPhone X') {
            that.setData({
              fontSize: '40.8418'
            })
          }
        }
      });
      that.setData({
        isSure: true,
        // buttonName: '生成图片',
        // scrollHeight: '83vh',
        buttonShow: true
      });
    }
  },

  tapFigure(e) {
    var that = this;
    that.setData({
      tapImage: '',
      buttonShow: false
    });
    setTimeout(function () {
      that.setData({
        tapImage: that.data.datas[e.currentTarget.dataset.index].url,
        trueIndex: e.currentTarget.dataset.index
        // buttonShow:true
      })
    }, 200)
  },
  onTapImage() {
    var that = this;
    var width = 0;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: res => {
        let path = res.tempFilePaths[0];
        wx.redirectTo({
          url: '/pages/cutInside/cutInside?url='+path
        })
      }
    })
  }
});