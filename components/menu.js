var Logger = require('../utils/Logger.js')

Component({
  properties: {
    menu_list: Array,
  },

  data: {
    showMenu: true
  },
  
  attached: function () {
    this.setData({
      menu_list: this.data.menu_list
    })
  },
  methods: {
    // 点击新建按钮
    onCreateTap: function () {
      this.setData({
        showMenu: !this.data.showMenu
      })
    },
    // 点击展开的单个按钮
    onItemTap: function (event) {
      var item = event.currentTarget.dataset.item;
      wx.showToast({
        title: "新建" + item.name,
        icon: 'none'
      })
    }
  }
})