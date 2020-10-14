let hostname = ``;
if (location.host.indexOf('localhost') > -1) {
  // hostname = `https://www.baidu.com`;
  hostname = `http://localhost:3009`;
}
export default {
  /**
   * 获取对象的指定属性
   * 属性可以是一个用点号连接的多层级路径
   * @param {object} object 对象
   * @param {string} path 属性值，可以是路径，如：'a.b.c[0].d'
   * @param {any} [defaultVal=''] 取不到属性时的默认值
   * @returns {any} 获取到的属性值
   */
  getUrls() {
    return {
    test: `${hostname}/bullet/index.php?s=/Api2/getO2OInfo&channelCode=NSY&lvversion=7.9.2&firstChannel=TOUCH&secondChannel=LVMM&stationCode=SH&cityName=%E4%B8%8A%E6%B5%B7&globalLatitude=31.238032669517935&globalLongitude=121.38725332252167`, //获取token
    }
  },
 
};

