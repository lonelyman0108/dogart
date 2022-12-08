# 🐶 舔狗的艺术

### 重构版说明
采用 element-Plus 2.x 版本，打包工具从 vue-cli 更换为 vite ，优化项目结构，去掉冗余代码  
重新整合 axios 实现请求前后拦截器，有利于后面开发后台管理的验证  
采用 element-Plus 的按需自动加载，不再手动引包  
更换成 ve3 的 <script setup> 语法糖用法，不用去写 setup() 函数和 return 一堆属性了

### 注意
使用 element-Plus 的按需自动加载，首先你需要安装unplugin-vue-components 和 unplugin-auto-import这两款插件
```
npm install -D unplugin-vue-components unplugin-auto-import
```

### 后端配合

后端项目地址：https://github.com/lonelyman0108/dogart-api
