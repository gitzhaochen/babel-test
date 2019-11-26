const config = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          // edge: '17',
          // firefox: '60',
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
        corejs: false, //是否使用core-js; babel-runtime自带core-js
        helpers: true,
        regenerator: false
      }
    ]
  ]
};
module.exports = config;
