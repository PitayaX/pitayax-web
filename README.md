## PitayaX Web

该项目是以[react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example.git)
为模板的博客项目。

使用到的核心技术：

- react `>=0.14.0`
- redux `>=2.0.0`
- react-router `>=1.0.0`

## 如何使用

请按照git flow的流程进行开发，模板会在`starter`分支供随时参考

## 目录结构

本项目目录结构的基本说明：

```
- api // 假的api项目，用于提供假数据
- bin // 入口点
- docs // 文档统一放在这里（除了这份readme）
- src // universal app源代码
  - components // 通用react组件
  - containers // 承载页面的react组件
    - Home // 以此为例子
      Home.jsx // 组件源代码
      Home.scss // 组件样式
      logo.png // 组件牵涉到的图片
  - helpers // 必要的帮助库
  - redux // redux相关代码
    - middleware // redux中间件
    - modules // reducers
      create // 用于store初始化
  - utils // 通用工具库
    client.js // browser端入口
    config.js //
    routes.js // 路由定义，前后端统一
    server.js // web server入口
- static // 放logo，以及代码发布位置
- webpack // webpack相关配置
  .babelrc // babel配置
  .editorconfig // 编辑器通用配置
  .eslintignore // eslint忽略的目录或文件
  .eslintrc // eslint配置
  .gitignore // git忽略的目录或文件
  karma.conf.js // 测试的配置
  LICENSE
  package.json
  README.md
  server.babel.js
  tests.webpack.js // 测试用
```

## 约定

#### Redux

*actionName*: `${reducerName}/${actionType}`

  reducerName小写，actionType大写
