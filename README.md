## 前言
之前看七月老师的视频，介绍到template的时候，七月老师说，这个template有一个缺点，大概意思就是封装度不够，只模板化了页面和样式，逻辑那些写不了。我也很困惑这件事，今天了解到`自定义组件`这个概念，就试了试，感觉好像弥补了template的那个缺点，于是写了个小demo，也算做个笔记

## 效果
做的就是个菜单组件，数据由外部灌入。

但如今还有两个问题还没解决：

- 事件怎么由组件内传到外面页面来
- 怎么样才能实现菜单弹出的阻尼动画效果

![image](https://raw.githubusercontent.com/Urwateryi/MarkDownPic/master/WX-ComponentDemo/%E5%BC%B9%E5%87%BAgif.gif)

## 实现

代码结构如下：

![image](https://raw.githubusercontent.com/Urwateryi/MarkDownPic/master/WX-ComponentDemo/demo%E7%BB%93%E6%9E%84.png)

新建组件menu:

![image](https://raw.githubusercontent.com/Urwateryi/MarkDownPic/master/WX-ComponentDemo/%E6%96%B0%E5%BB%BAComponent.png)

menu.js
```
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
```

参考文档中Component的[生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)：

![image](https://raw.githubusercontent.com/Urwateryi/MarkDownPic/master/WX-ComponentDemo/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

设置数据选择在`attached`方法内。

还有个关键的地方：（其实最开始创建component的时候就自动生成了）全手打的话，要记得在menu.json里添加自定义组件的声明：

```
{
  "component": true,
  "usingComponents": {}
}
```

menu.wxml

菜单个数根据传入的`menu_list`来，菜单显隐由`showMenu`控制
```
<view class='container'>
  <view hidden="{{showMenu?false:true}}" class='sub-btn-container'>
    <block wx:for='{{menu_list}}' wx:key='index'>
      <view class='sub-btns' catchtap='onItemTap' data-item='{{item}}'>
        <image class='btn' src='{{item.src}}' />
        <text class='sub-btn__name'>{{item.name}}</text>
      </view>
    </block>
  </view>
  <image catchtap='onCreateTap' class='btn' src='/resources/imgs/ic_create.png' />
</view>
```

菜单的显示内容，由外部datas/menu-data.js控制


```
var menu_list = [{
  id: 1,
  name: '帖子',
  src: '/resources/imgs/ic_create_1.png'
}, {
  id: 2,
  name: '资讯',
  src: '/resources/imgs/ic_create_2.png'
}, {
  id: 3,
  name: '照片',
  src: '/resources/imgs/ic_create_3.png'
}]

module.exports = {
  menu_list: menu_list
}
```
数据在使用的地方引入

home.js


```
var menuData = require('../../datas/menu-data.js')

Page({
  onLoad: function() {
    this.setData({
      menu_list: menuData.menu_list,
    })
  }
})
```

home.wxml

```
<view>
  <menu class='menu' menu_list='{{menu_list}}' />
  <text class='text' >
    HOME
  </text>
</view>
```

还有个关键的地方：使用的地方，这里是home，要记得在home.json中使用该组件（引号前面的相当于别名，起啥名，wxml里就用啥名）

home.json

```
{
  "usingComponents": {
    "menu": "/components/menu"
  }
}
```
