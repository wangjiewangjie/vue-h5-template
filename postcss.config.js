module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 7"]
    },
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"],
      unitPrecision: 3,
      minPixelValue: 2,
      selectorBlackList: ["van-"]
    }
  }
};
