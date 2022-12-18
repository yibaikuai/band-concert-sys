# vue-template

## 代码结构

项目src目录树如下：

``` plain

├─assets				# 存放静态资源文件
│  ├─css				# 全局样式文件
│  ├─font				# 矢量图和字体等文件
│  └─image				# 图片
│    
├─components			# 公共组件
├─router				# 路由配置
├─utils					# 工具类
├─views					# 页面文件
│    └─AsideViews
├─App.vue				# 根组件文件
└─main.js   			# 入口文件
```

## 安装

### 前置条件

- Node.js >= 16.0

- 操作系统: Linux, Windows, Mac OSX

### 安装依赖

进入目录后，运行如下命令即可安装Web前端的所有依赖。

```bash
npm install
```

### 启动Web前端

运行`npm run serve`，即可启动Web前端。启动后，可在浏览器中输入`http://127.0.0.1:3000`访问系统。