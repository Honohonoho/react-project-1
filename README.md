# To-Do 小应用 with React
![](http://upload-images.jianshu.io/upload_images/5548587-2b662aba25725f31.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- ### 前言：
说起来，这个应用算是我第一个真正意义上的项目，尽管样式和功能不算强大，但对于初学React的我来说，能够从这个项目中去理解一个框架，同时不会被其中复杂的逻辑所迷惑，这才是我写这个To-Do应用的初衷。<br>
第一次使用React时，思维从JavaScript到JSX的转换，确实让我无法适应，但过了磨合期，才发现，按照 '框架' 所规定的一套准则去写代码，可以让精力集中在各个模块的逻辑，每个组件的通信通过props能够清晰地呈现在代码作者的面前，每个模块的功能高度单一化，其面向组件的编程思想简直就是加强版的OOP(请原谅我的词穷。。。)

- ### 使用的技术
1.**webpack**（create-react-app 内置了 webpack 的所有功能，所以就当我用了webpack吧，我能说我正在学webpack吗，摔。。）<br>
2.**React**框架（听说Redux最好在复杂项目才用，好想有机会参与。。）<br>
3.服务器使用**LeanCloud**（没钱买服务器。。），管理用户和数据。<br>

- ### 完成的功能
1.用户的登录、注册、注销、密码找回（前端顺便做了表单验证）。<br>
2.每个用户独立添加每日任务，可以标记完成状态，删除，登录自动同步数据。<br>
3.前期版本未使用LeanCloud时，把数据缓存在LocalStorage中。<br>
- ### 使用方法
````
# git clone git@github.com:Honohonoho/react-project-1.git
# 安装依赖
npm install
# 开发预览
npm start
# 打包
npm run build
````
- ### 预览
**在线预览：**[地址](https://honohonoho.github.io/react-project-1/build/index.html)

 **1.登录界面**
 
![](http://upload-images.jianshu.io/upload_images/5548587-217c44a538ba5c93.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 **2.任务界面**
 
![](http://upload-images.jianshu.io/upload_images/5548587-7b373f310c6b98ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- ### 后记
经过了一段时间的学习，自己从HTML，CSS，JavaScript一路走到了现在，期间踩过了无数的坑，但总算有惊无险的解决了，自己从当初看到CSS就头疼的新人，变成了遇见挑战也会欣然面对的老新人（笑~）<br>



