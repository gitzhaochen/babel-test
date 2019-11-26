#### babel：

- Babel 默认只转换新的 JavaScript 句法（syntax）
- 不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。
- 不转换实例方法（例如 Array.prototype.includes 等）
- 如果想让这个方法运行，必须使用 Polyfill 或 Babel-runtime，为当前环境提供一个垫片。

#### @babel/preset-env

一系列同类插件组合，配合 useBuiltIns 参数、自动引入 polyfill 垫片处理新的 API 以及实例方法

> 缺点：我们使用 polyfill 的方式引入了内置函数、比如 Promise，会污染全局。

```js
//默认配置
{
  targets:{},//需要支持的目标浏览器，不配置默认全部转成 ES5
  spec:false,
  loose:false,
  modules:'auto',//webpack 会将 es6 转成 commonjs 规范，babel 就不要转了,一般配置成 false
  debug:false,
  include:[],
  exclude:[],
  useBuiltIns:false,// false:不使用垫片| entry:一股脑引入所有垫片，体积太大 | usage:按需导入
  corejs:2,//polyfill 垫片，3 是最新的版本
  forceAllTransforms:false,
  configPath:process.cwd(),//当前目录
  ignoreBrowserslistConfig:false,
  shippedProposals:false
}
```

#### @babel/runtime

- 开发类库/工具（生成不污染全局空间和内置对象原型的代码）
- 借助 @babel/runtime 中帮助函数（helper function）移除冗余工具函数

```js
//默认配置
{
  absoluteRuntime: false,//配置 @babel/runtime模块路径，默认从node_modules读取
  corejs: false,//是否使用core-js; babel-runtime自带core-js,设置2/3会覆盖preset-env的corejs
  helpers: true,//开启帮助函数,移除冗余工具函数
  regenerator: true,//是否用 辅助函数来代替 async / generator 函数
  useESModules: false
}
```

#### 总结

1. 项目开发中使用

```js
@babel/preset-env:{corejs:3,useBuiltIns:'usage',modules:false,target:{}}
@babel/runtime:{helpers: true,regenerator: false}
```

2. 开发工具类库使用

````js
@babel/preset-env:{corejs:3,useBuiltIns:'usage',target:{}}
@babel/runtime:{corejs: 3,helpers: true,regenerator: true}```
````

#### DEMO

```sh
npm run webpack
npm run babel
```
