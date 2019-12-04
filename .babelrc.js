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
        helpers: true,
        regenerator: false,
        useESModules: true
      }
    ]
  ]
};
module.exports = config;
