## React Native——Play Android

### 1、概述

​	三天的清明节假期好长。没有女朋友的我闲来无事，所以就想写一个应用练练手。翻找学习资料的时候恰巧看到 [玩Android](<https://www.wanandroid.com/>)提供有[开放的API](<https://www.wanandroid.com/blog/show/2>)。于是就模仿者官方的APP开发了一个简易版的ReactNative应用。

> GitHub项目地址：[<https://github.com/bingbingshao/ReactNative_WanAndroid>](https://github.com/bingbingshao/ReactNative_WanAndroid)

### 2、环境

>react: "16.11.0",
>react-native: "0.62.0"

### 3、使用组件

>阴影组件：	react-native-shadow-cards  //弹性宽高
>
>阴影组件：	react-native-shadow   //固定宽高
>
>svg阴影组件所需：react-native-svg 
>
>轮播图组件：	react-native-swiper    
>
>字体库组件：	react-native-vector-icons
>
>简单存储：	react-native-simple-store
>
>顶部导航：react-native-scrollable-tab-view  //暂时不用
>
>导航：	react-navigation
>
>fetch:	react-native-fetch-polyfill
>
>气泡：	react-native-root-toast

>//路由和状态管理 配置可查看这篇文章[ReactNative使用Navigation、Redux和Saga](<https://blog.csdn.net/weixin_41969974/article/details/105309122>)
>
>npm install  react-navigation：路由
>
>npm install  react-navigation-stack：需要单独安装
>
>npm install  react-navigation-tabs：需要单独安装
>
>npm install  react-native-reanimated：使用navigation需要安装
>
>npm install  react-native-safe-area-context：使用navigation需要安装
>
>npm install  @react-native-community/masked-view：使用navigation需要安装
>
>npm install  react-native-gesture-handler：使用navigation需要安装
>
>npm install  react-native-screens：使用navigation需要安装
>
>npm install   react-navigation-redux-helpers：navigation与react-redux关联所需组件
>
>npm install  react-redux：状态管理工具
>
>npm install  redux：状态管理工具
>
>npm install  redux-saga：异步处理工具

### 4、目录格式

<div>
<img src="https://img-blog.csdnimg.cn/20200407212500562.png"  width="200"/>
</div>

### 5、实现功能

>当前版本：V0.1.0
>
>- 首页轮播
>- 搜索功能
>- 收藏 (API收藏部分没看太理解、收藏部分功能有问题。)
>- 网页详情查看
>- 文章发布
>- 登录
>- 查看个人积分

### 6、App样式

<div>
  <img src="https://img-blog.csdnimg.cn/20200407214653526.png"  width="200" style="margin:10px"/>
  <img src="https://img-blog.csdnimg.cn/20200407214824112.png"  width="200" style="margin:10px"/>
  <img src="https://img-blog.csdnimg.cn/20200407215429680.png"  width="200" style="margin:10px"/>
  <img src="https://img-blog.csdnimg.cn/20200407215447774.png"  width="200" style="margin:10px"/>
  <img src="https://img-blog.csdnimg.cn/20200407221434438.png"  width="200" style="margin:10px"/>
  <img src="https://img-blog.csdnimg.cn/20200407221751921.png"  width="200" style="margin:10px"/>
</div>

### 7、总结

​	这是一个简单的应用，本人也是一枚菜鸟。虽然是菜鸟，但是也不能阻挡我向往学习。后续有时间会继续更新应用。争取把这个小的应用看着丰富起来。

​	另外，若某位大神有幸看到，希望不吝赐教，指出的我的问题，不胜感激。