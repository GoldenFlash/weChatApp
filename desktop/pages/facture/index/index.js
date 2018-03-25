var api = require('../../../api.js')
// var weCropper = require('../../../utils/weCropper')
var Zan = require('../../../zanui/index')
var util = require('../../../utils/util.js')
var app = getApp()
var upload = require('../../../utils/upload.js')
import { $wuxNotification } from '../../../wux/wux'
var tips_name = 'has_show_avatar_tiaozhuan_tip'

var deviceWidth = app.globalData.system_info.windowWidth
var radio = deviceWidth / 375 * 0.5; //相对于iPhone 屏幕宽度的比例
var size = { width: 0.9 * deviceWidth / radio, height: 0.9 * deviceWidth / radio };
var contentItem = []
var imageUrls = []
var toucheAction

var iconData = []
var iconCat = []

import data from "../../../data/data.js"

Page(Object.assign({}, Zan.Toast, {
    data: {
        
        showDialog: false,
        avatarCanvasWidth: 0.9 * deviceWidth,
        // urls:iconCat,
        backgroundSrc: '',
        isClip: !true,
        showAvatars: !false,
        isCircle: false,
        animationData: {},
        // cropperOpt: {
        //   id: 'clip',
        //   width: deviceWidth,
        //   height: deviceWidth,
        //   scale: 2.5,
        //   zoom: 8,
        //   cut: {
        //       x: (deviceWidth - 300) / 2,
        //       y: (deviceWidth - 300) / 2,
        //       width: 300,
        //       height: 300
        //   }
        // },
        trangleUp: 0,
        avatarBoxChild: false,
        backgroundImages: "",
        urls: ['http://icons.maiyizhi.cn/nvshengjie_feng.jpg', 'http://icons.maiyizhi.cn/nvshengjie_feng.jpg', 'http://icons.maiyizhi.cn/nvshengjie_feng.jpg', 'http://icons.maiyizhi.cn/nvshengjie_feng.jpg', 'http://icons.maiyizhi.cn/nvshengjie_feng.jpg'],
        iconList: ['/styles/mingxin1.png', '/styles/mingxin2.png', '/styles/mingxin3.png']
    },
    onShareAppMessage: function() {
        console.log(this.data)
        return {
            title: '新年头像、头像加V，快来做个头像吧',
            path: "/pages/index/index"
        }
    },
    showNotification: function() {
        var that = this
        api.tiaozhuan('zhizuoqi_avatar', function(res) {
            util.tiaozhuan($wuxNotification, that, res, tips_name);
        }, function(re) {});

    },
    toggleDialog: function() {
        var that = this;
        this.setData({
            showDialog: !this.data.showDialog
        });
    },

    itemClick: function(e) {
        console.log(e.target.dataset.list)
        this.setData({
            avatarBoxChild: true,
            decoreate:e.target.dataset.list
            // iconList: iconData[e.target.dataset.index].list
        })

        this.toggleDialog()
    },
    avatarBtn: function(e) {
        this.setData({
            avatarBoxChild: false
        })
    },
    onShow: function() {
        var animation = wx.createAnimation({
            duration: 500,
            timingFunction: "linear",
            transformOrigin: "50% 50%",
        })

        this.animation = animation
    },

    onLoad: function(option) {
        //初始化画布
        toucheAction = new util.toucheAction({
            canvasId: "avatar",
            contentItem: contentItem,
            size: size,
            radio: radio,
            imageUrls: imageUrls,
        });

        // var $instance = new weCropper();
        // $instance.cut.width = deviceWidth;
        // $instance.cut.height = deviceWidth;
        // $instance.cut.x = 0;
        // $instance.cut.y = 0;
        // const {cropperOpt} = this.data;

        const that = this;

        // if (!that.data.backgroundSrc) {
        //     var defaultbg = that.data.bgImage[0].list[0]
        //     this.setData({
        //         backgroundSrc: defaultbg
        //     })
        //     if (imageUrls.length) {
        //         imageUrls[imageUrls.length - 1] = defaultbg;
        //     } else {
        //         imageUrls.push(defaultbg);
        //     }
        // }

        that.setData({
          deskList:data.desk,
          listTitle:data.decoreate,
        })
        if (option.src !== undefined) {
            const src = option.src;
            if (option.from == 'koutu') {
                that.setData({
                    hasChooseBackground: true,
                    backgroundSrc: imageUrls[imageUrls.length - 1]
                })
                that.koutu(src);
            } else {
                that.setData({
                    backgroundSrc: src
                })
                if (imageUrls.length) {
                    imageUrls[imageUrls.length - 1] = src;
                } else {
                    imageUrls.push(src);
                }
                console.log("imageUrls", imageUrls);
            }
            // that.wecropper.pushOrign(util.replaceQiniuHttps(src));
        } else {
            // api.login(function (user) {
            //   console.log("avatart",util.replaceQiniuHttps(user.avatar))
            //   wx.downloadFile({
            //     url: util.replaceQiniuHttps(user.avatar),
            //     success: function (res) {
            //       that.setData({
            //         backgroundSrc: res.tempFilePath
            //       })
            //       imageUrls.push(res.tempFilePath);
            //       // that.wecropper.pushOrign(res)
            //     }
            //   })
            // }, function () {
            //   that.uploadBackgroundImage();
            // }, '必须授权登录之后才能操作呢，是否重新授权登录？')




            // new weCropper(cropperOpt)
            // .on('ready', (ctx) => {
            //   console.log(`wecropper is ready for work!`)
            // })
            // .on('beforeImageLoad', (ctx) => {
            //   wx.showToast({
            //     title: '加载中',
            //     icon: 'loading',
            //     duration: 20000
            //   })
            // })
            // .on('imageLoad', (ctx) => {
            //   wx.hideToast()
            // })
            // .on('beforeDraw', (ctx, instance) => {
            // })
            // .updateCanvas()
        }
        console.log(toucheAction)

        if (wx.getStorageSync(tips_name) < 4) {
            console.log('show tiaozhuan')
            //that.showNotification()
        }

        // api.getIcons(function (icons) {
        //   // console.log("icons",icons);
        //   iconData = icons;
        //   iconCat = [];
        //   for (var o in iconData) {
        //     iconCat.push('http://icons.maiyizhi.cn/' + iconData[o].avatar)
        //   }
        //   that.setData({
        //     urls: iconCat,
        //     iconList: iconData[0].list
        //   })
        // })
    },
    bgAnimation(value) {
        var that = this;

        this.animation.translateY(value).step({
            duration: 100
        })
        this.setData({
            animationData: that.animation.export()
        })
    },
    cancel() {
        var that = this;
        this.bgAnimation(0)
        that.setData({
            avatarHidden: false
        })

    },
    chooseBackground: function(event) {
        const src = event.currentTarget.dataset.src;
        this.setData({
            backgroundImages: src,
            avatarHidden: true
        })
        this.bgAnimation(-25)
    },

    // onHide: function () {
    //   contentItem = [];
    //   if (this.data.backgroundSrc) {
    //     imageUrls.splice(0, imageUrls.length - 1);
    //   } else {
    //     imageUrls = [];
    //   }
    //   toucheAction = new util.toucheAction({
    //     canvasId: "avatar",
    //     contentItem: contentItem,
    //     size: size,
    //     radio: radio,
    //     imageUrls: imageUrls
    //   });
    //   toucheAction.drawElements();
    // },

    onUnload: function() {
        contentItem = [];
        imageUrls = [];
        toucheAction = new util.toucheAction({
            canvasId: "avatar",
            contentItem: contentItem,
            size: size,
            radio: radio,
            imageUrls: imageUrls
        });
        toucheAction.drawElements();
    },

    // clipTouchStart: function (e) {
    //   this.wecropper.touchStart(e)
    // },
    //
    // clipTouchMove: function (e) {
    //   this.wecropper.touchMove(e)
    // },
    //
    // clipTouchEnd: function (e) {
    //   this.wecropper.touchEnd(e)
    // },

    selectDesk: function(event) {
        const src = event.currentTarget.dataset.url;
        this.setData({
            backgroundSrc: src
        })
        if (imageUrls.length) {
            imageUrls[imageUrls.length - 1] = src;
        } else {
            imageUrls.push(src);
        }
    },
    chooseOthers(){
      this.setData({
        hasChooseDesk:true
      })
    },

    uploadBackgroundImage: function() {
        const that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            count: 1,
            success: function(res) {
                console.log(res.tempFilePaths[0]);
                that.afterAvatarChoose(res.tempFilePaths[0], 'background');
            }
        })
    },

    afterAvatarChoose: function(localPic, from) {
        wx.navigateTo({
            url: '/pages/cutInside/cutInside?src=' + localPic + '&source=6' + '&from=' + from
        })
    },

    // 选择照片,并初始化drawAvatar画布参数
    selectAvatar: function(event) {
        const that = this;
        that.toggleDialog();
        // wx.showNavigationBarLoading();
        // wx.showToast({
        //   title: 'Loading……',
        //   duration: 20000,
        //   icon: 'loading'
        // })
        wx.getImageInfo({
            src: event.currentTarget.dataset.avatarpath,
            success: function(res) {
                let item = {
                    type: "image",
                    dx: 0.9 * deviceWidth,
                    dy: 0.9 * deviceWidth,
                    width: 500,
                    height: res.height / res.width * 500,
                    value: event.currentTarget.dataset.avatarpath,
                    cancel: 1,
                    isShowSymbol: true,
                }
                console.log('imageUrls', imageUrls);
                console.log('contentItem', contentItem);
                imageUrls.unshift(event.currentTarget.dataset.avatarpath);
                contentItem.unshift(item);
                console.log("toucheAction", toucheAction);
                let elementSize = toucheAction.calculateW_H(contentItem[0]);
                toucheAction.setParams(elementSize.w, elementSize.h, 0);
                toucheAction.drawElements();
            }
        })
        // wx.downloadFile({
        //   url: util.replaceQiniuHttps(event.currentTarget.dataset.avatarpath),
        //   success: function (res) {
        //     console.log(res)
        //     wx.hideToast()
        //     wx.hideNavigationBarLoading();
        //
        //   }
        // })
    },

    avatarTouchStart: function(event) {
        toucheAction.touchStart(event);
    },

    avatarTouchMove: function(event) {
        toucheAction.touchMove(event);
    },

    avatarTouchEnd: function() {
        toucheAction.touchEnd();
    },

    // 关闭头像
    closeAvatar: function(event) {
        toucheAction.touchStart(event);
    },

    // changeSqu: function (e) {
    //   this.setData({
    //     isCircle: false
    //   })
    // },

    // changeCircle: function (e) {
    //   this.setData({
    //     isCircle: true
    //   })
    // },

    changeBackground: function() {
        this.setData({
            hasChooseBackground: false
        })
    },

    // 浏览图片
    scanImage: function(e) {
        // console.log(toucheAction);
        const that = this;
        contentItem.forEach(function(element, index, array) {
            contentItem[index].isShowSymbol = false;
        })

        if (!this.data.isCircle) {
            toucheAction.drawElements({ rectangle: true, src: that.data.backgroundSrc });
        } else if (this.data.isCircle) {
            toucheAction.drawElements({
                circle: {
                    x: 0.5 * deviceWidth * 0.9,
                    y: 0.5 * deviceWidth * 0.9,
                    R: 0.5 * deviceWidth * 0.9
                },
                src: that.data.backgroundSrc
            });
        }

        setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: 'avatar',
                success: function(file) {
                    console.log(file.tempFilePath);
                    wx.navigateTo({
                        url: '/pages/preview/preview?pic=' + encodeURIComponent(file.tempFilePath) + '&title=' + '做个头像、趣味换脸、大头贴、变妆、美妆、圣诞帽、圣诞头像' + '&path=' + encodeURIComponent('/pages/index/index')
                    })
                    contentItem = [];
                    if (that.data.backgroundSrc) {
                        imageUrls.splice(0, imageUrls.length - 1);
                    } else {
                        imageUrls = [];
                    }
                    toucheAction = new util.toucheAction({
                        canvasId: "avatar",
                        contentItem: contentItem,
                        size: size,
                        radio: radio,
                        imageUrls: imageUrls,
                    });
                    toucheAction.drawElements();
                }
            })
        }, 50);

        // wx.canvasToTempFilePath({
        //   canvasId: 'avatar',
        //   success: function (file) {
        //     wx.showActionSheet({
        //       itemList: ['方形头像', '圆形头像'],
        //       success: function(res) {
        //         contentItem = [];
        //         imageUrls.splice(0, imageUrls.length - 1);
        //         toucheAction = new util.toucheAction({
        //           canvasId: "avatar",
        //           contentItem: contentItem,
        //           size: size,
        //           radio: radio,
        //           imageUrls: imageUrls
        //         });
        //         toucheAction.drawElements(false);
        //         if(res.tapIndex==0){
        //
        //           util.showPreviewTip(tips_name,'长按保存头像哦',file.tempFilePath)
        //
        //           /*wx.saveImageToPhotosAlbum({
        //             filePath: file.tempFilePath,
        //             success: function () {
        //               wx.showToast({
        //                 title: '头像已经保存到您的相册了',
        //                 icon: 'success',
        //                 duration: 2000
        //               })
        //               contentItem = [];
        //               imageUrls.splice(0, imageUrls.length - 1);
        //               toucheAction = new util.toucheAction({
        //                 canvasId: "avatar",
        //                 contentItem: contentItem,
        //                 size: size,
        //                 radio: radio,
        //                 imageUrls: imageUrls
        //               });
        //               toucheAction.drawElements();
        //
        //             }
        //           })*/
        //         }else if(res.tapIndex==1){
        //           wx.showNavigationBarLoading()
        //           wx.showToast({
        //             title: 'Loading……',
        //             duration:2000,
        //             icon: 'loading'
        //           })
        //           upload.uploadSingleB({path: file.tempFilePath, state: 1}, function (pic) {
        //             if(pic){
        //               console.log(pic.url+'?roundPic/radius/'+pic.width)
        //               util.showPreviewTip(tips_name,'长按保存头像哦',pic.url+'?roundPic/radius/'+pic.width);
        //
        //               //that.data.files[that.data.files.length-localPics.length] = {"url":pic.url,"width":pic.width,"height":pic.height}
        //               /*wx.saveImageToPhotosAlbum({
        //                 filePath: util.replaceQiniuHttps(pic.url)+'?roundPic/radius/50',
        //                 success: function (dd) {
        //                   console.log(dd)
        //                   wx.showToast({
        //                     title: '头像已经保存到您的相册了',
        //                     icon: 'success',
        //                     duration: 2000
        //                   })
        //                   contentItem = [];
        //                   imageUrls.splice(0, imageUrls.length - 1);
        //                   toucheAction = new util.toucheAction({
        //                     canvasId: "avatar",
        //                     contentItem: contentItem,
        //                     size: size,
        //                     radio: radio,
        //                     imageUrls: imageUrls
        //                   });
        //                   toucheAction.drawElements();
        //                   wx.hideToast()
        //                   wx.hideNavigationBarLoading();
        //                 }
        //               })*/
        //
        //             }else{
        //               that.showZanToast('上传失败，请稍后再试呢');
        //             }
        //           });
        //         }
        //       },
        //       fail: function(res) {
        //       }
        //     })
        //   }
        // })
        // if(wx.saveImageToPhotosAlbum) {
        //   wx.saveImageToPhotosAlbum({
        //     filePath: file.tempFilePath,
        //     success: function (res) {
        //       wx.showToast({
        //         title: '保存到相册啦',
        //         icon: 'success',
        //         duration: 2000
        //       })
        //       //that.showZanToast('保存到相册啦');
        //     },
        //     fail: function (res) {
        //       console.log(res)
        //       wx.authorize({
        //         scope: 'scope.writePhotosAlbum',
        //         success: function (res) {
        //           console.log(res)
        //         },
        //         error: function (res) {
        //           util.previewSingalPic(file.tempFilePath)
        //           console.log(res)
        //         },
        //         fail: function (res) {
        //           util.previewSingalPic(file.tempFilePath)
        //           console.log(res)
        //         }
        //       })
        //     }
        //   })
        // }else{
        //   util.previewSingalPic(file.tempFilePath)
        // }
    },

    nextStep: function() {
        this.setData({
            hasChooseBackground: true
        })
    },

    chooseSelf: function() {
        const that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            count: 1,
            success: function(res) {
                that.afterAvatarChoose(res.tempFilePaths[0], 'koutu');
            }
        })
    },

    koutu: function(src) {
        wx.showToast({
            title: '处理中……',
            duration: 20000,
            icon: 'loading'
        })
        upload.uploadSingleB({ path: src }, function(pic) {
            api.koutu(pic.url, function(koutu) {
                console.log('koutu', koutu.url);
                wx.downloadFile({
                    url: util.replaceQiniuHttps(koutu.url),
                    success: function(res) {
                        wx.getImageInfo({
                            src: res.tempFilePath,
                            success: function(result) {
                                wx.hideToast();
                                let item = {
                                    type: "image",
                                    dx: 0.9 * deviceWidth,
                                    dy: 0.9 * deviceWidth,
                                    width: 500,
                                    height: result.height / result.width * 500,
                                    value: res.tempFilePath,
                                    cancel: 1,
                                    isShowSymbol: true,
                                }
                                // console.log('imageUrls',imageUrls);
                                // console.log('contentItem',contentItem);
                                imageUrls.unshift(res.tempFilePath);
                                contentItem.unshift(item);
                                // console.log("toucheAction",toucheAction);
                                let elementSize = toucheAction.calculateW_H(contentItem[0]);
                                toucheAction.setParams(elementSize.w, elementSize.h, 0);
                                toucheAction.drawElements();
                            }
                        })
                    }
                })
            })
        })
    },
}));