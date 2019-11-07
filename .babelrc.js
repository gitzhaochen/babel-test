const config = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          // edge: '17',
          // firefox: '60',
          // chrome: '67',
          // safari: '11.1'
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,//是否使用core-js; babel-runtime自带core-js
        helpers: true,
        regenerator: false
      }
    ]
  ]
}
module.exports = config
