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
  corejs: false,//false：使用preset-env的corejs，但是会存在污染全局问题（如：Array.from），设置2/3会覆盖preset-env的corejs，且不会污染全局
  helpers: true,//开启帮助函数,移除冗余工具函数
  regenerator: true,//通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime 可以设置为false
  useESModules: false// 是否使用 es modules helpers, 减少 commonJS 语法代码，而且webpack 会将 es6 转成 commonjs 规
}
```

#### 总结

1. 项目开发中使用

```js
//.babelrc.js
const config = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "44",
          safari: "7"
        },
        useBuiltIns: "usage",
        corejs: 3,
        modules: false
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: false,
        useESModules: true
      }
    ]
  ]
};
```

2. 开发工具类库使用

```js
//.babelrc.js

const config = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "44",
          safari: "7"
        },
        useBuiltIns: "usage",
        corejs: 3,
        modules: false
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
        helpers: true,
        regenerator: true,
        useESModules: true
      }
    ]
  ]
};
module.exports = config;
```

#### DEMO

```sh
npm run webpack
npm run babel
```
