
const { NODE_ENV } = process.env
const hostname = NODE_ENV === 'production' ? 'http://moa.qa.17u.cn/' : ''

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
      FocusList: `${hostname}/moahr/EmployeeCareWX/FocusList`,
      // 关注、取消关注
      UpdateStatus: `${hostname}/moahr/EmployeeCareWX/UpdateStatus`,
      // 历史收到的祝福
      EmployeeWishHistoryList: `${hostname}/moahr/EmployeeCareWX/EmployeeWishHistoryList`,
      // 贺卡
      EmployeeWishByCompany: `${hostname}/moahr/EmployeeCareWX/EmployeeWishByCompany`,
      // 祝福详情
      EmployeeWish: `${hostname}/moahr/EmployeeCareWX/EmployeeWish`,
      // 上传图片
      EmployeeCareUploadFile: `${hostname}/moahr/EmployeeCareWX/EmployeeCareUploadFile`,
      // 发送祝福
      SavaEmployeeWish: `${hostname}/moahr/EmployeeCareWX/SavaEmployeeWish`,
      // 获取企业微信签名参数
      shareParam: `${hostname}/moahr/EmployeeCareWX/shareParam`
    }
  },

};

