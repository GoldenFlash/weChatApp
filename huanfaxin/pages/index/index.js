// pages/index2/index2.js
const app = getApp()
// const api = require('../../api.js');
const util = require('../../utils/util.js');
const upload = require('../../utils/upload.js');
var data = require('../../utils/data.js');
// const config = require('../../utils/config.js').config;
const { extend, Tab } = require('../../zanui-weapp/dist/index');
Page(extend({}, Tab,{



  handleZanTabChange({ componentId, selectedId }) {
    // componentId 即为在模板中传入的 componentId
    // 用于在一个页面上使用多个 tab 时，进行区分
    // selectId 表示被选中 tab 项的 id

    console.log(data.data[selectedId])
    
    this.setData({
      datas:data.data[selectedId],
      hairImage:data.hair[selectedId]
    })
    console.log(this.data.datas[0])
  },
  /**
   * 页面的初始数据
   */
  data: {
    fontSize: '44.8418',
    imageUrl: '../statics/bizhi_0.jpg',
    imgIndex:0,
    tapImage: "../../styles/hair/dongwu/dongwu_1.png",
    textShow: true,
    lockShow:'',
    scrollHeight: '100vh',
    buttonShow: true,
    isSure: false, /*false*/
    datas: [],
    hairImage:[],
    trueIndex:0,
    buttonName: '换发型',
    image: '../statics/bizhi_0.jpg',
    coverSwitchStart:0,
    coverSwitchEnd:0,
    changeHair:false,

  },
  onShareAppMessage: function () {
    return {
      title: '给你的手机换个发型吧',
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log()
    // console.log(data.data.bodian)
    this.setData({
      datas: data.data.dongwu,
      hairImage:data.hair.dongwu
      // tapImage:data.data[0]
    });
    // console.log(this.datas)
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
        tapImage: that.data.hairImage[e.currentTarget.dataset.index],
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
  },
  showHair(){
    var that =this;
    that.setData({
      changeHair:!that.data.changeHair
    })
  },
  stop(){}
}));