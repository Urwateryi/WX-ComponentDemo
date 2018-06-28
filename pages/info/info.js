var menuData = require('../../datas/menu-data.js')

Page({
  onLoad: function () {
    this.setData({
      menu_list: menuData.menu_list,
    })
  }
})