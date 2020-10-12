module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
      ]
    },
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 默认值`px`，需要转换的单位
      viewportWidth: 750, // 视窗的宽度,对应设计稿宽度
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
      propList: ['*'], // 转化为vw的属性列表
      viewportUnit: 'vw', // 指定需要转换成视窗单位
      fontViewportUnit: 'vw', // 字体使用的视窗单位
      selectorBlackList: [/^.van-/], // 指定不需要转换为视窗单位的类
      minPixelValue: 1, // 小于或等于`1px`时不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换`px`
      replace: true, // 是否直接更换属性值而不添加备用属性
      exclude: [], // 忽略某些文件夹下的文件或特定文件
      include: [],
      landscape: false, // 是否添加根据landscapeWidth生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw', // 横屏时使用的单位
      landscapeWidth: 568 // 横屏时使用的视窗宽度
    }
  }
}
