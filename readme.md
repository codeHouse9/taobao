# 淘宝
## 项目在线地址： https://codehouse9.gitee.io/taobao
## 运行该项目
### 已下载的情况下
1. npm i / cnpm i 下载所需要的的依赖
2. gulp start / npm start 或 gulp build 执行gulp任务，生成dist文件，
3. 在浏览器中输入localhost:3000或者运行该文件夹中src的index.html文件即可

### 未下载的情况下
1. git clone https://github.com/codeHouse9/taobao.git 或 git clone git@github.com:codeHouse9/taobao.git
2.  接下来的操作和上面一样

## 具有跳转效果的模块
1. 请登录 免费注册 登录 注册
2. 有好货 和 该页面可点击的模块
3. 商品分类 购物车

## 页面
1. 首页
2. 登录
3. 注册
4. 有好货页面
5. 分类页
6. 详情页
7. 购物页
## 运用技术
1. gulp 
2. scss
3. 模块化 export import 
4. 字体图标
5. swiper 做轮播图
6. jquery
7. ajax 请求数据，渲染数据
8. 图片懒加载 热卖单品
9. 本地存储
10. 
## 目录结构
1. 源代码 src
2. 可运行文件 dist
3. src/dist 目录下:
   data 数据
   img 图片
   js js代码
   style scss/css代码
   views HTML代码
   index.html 入口
   
## 特点
1. 支持多用户注册 各用户的商品数据不会覆盖
2. 同一用户 多个页面的商品数据 不用刷新而同步(如：添加一个商品 多个页面购物车中的数量同时 + 1；多个购物页面都数据同步更新);
