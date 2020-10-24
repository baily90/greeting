
const { NODE_ENV } = process.env
const hostname = NODE_ENV === 'production' ? 'http://moa.qa.17u.cn/moahr' : '/moahr'

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
      // 我的关注
      FocusList: `${hostname}/MocApiGeneralV2/FocusList`,
      // 关注、取消关注
      UpdateStatus: `${hostname}/MocApiGeneralV2/UpdateStatus`,
      // 历史收到的祝福
      EmployeeWishHistoryList: `${hostname}/MocApiGeneralV2/EmployeeWishHistoryList`,
      // 贺卡
      EmployeeWishByCompany: `${hostname}/MocApiGeneralV2/EmployeeWishByCompany`,
      // 祝福详情
      EmployeeWish: `${hostname}/MocApiGeneralV2/EmployeeWish`,
      // 上传图片
      EmployeeCareUploadFile: `${hostname}/MocApiGeneralV2/EmployeeCareUploadFile`,
    }
  },

};

