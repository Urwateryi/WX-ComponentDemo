var menuData = require('../../datas/menu-data.js')
var Logger = require('../../utils/Logger.js')

Page({
  onLoad: function() {
    this.setData({
      menu_list: menuData.menu_list,
    })
  },
  onReady: function() {
    this.menu = this.selectComponent("#menu");
  },
  handleMenu: function(event) {
    //这里的detail就是在自定义组件中定义的menuEventDetail
    var item = event.detail.item;
    Logger.v("item", item);
    wx.showToast({
      title: '新建' + item.name,
    })
  }
})