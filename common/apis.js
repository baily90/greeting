// let hostname = `http://hr.qa.tcent.cn`;
let hostname = ``;

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
      FocusList: `${hostname}/hrapi/api/MocApiGeneralV2/FocusList`,
      // 关注、取消关注
      UpdateStatus: `${hostname}/hrapi/api/MocApiGeneralV2/UpdateStatus`,
      // 历史收到的祝福
      EmployeeWishHistoryList: `${hostname}/hrapi/api/MocApiGeneralV2/EmployeeWishHistoryList`,
      // 贺卡
      EmployeeWishByCompany: `${hostname}/hrapi/api/MocApiGeneralV2/EmployeeWishByCompany`,
      // 祝福详情
      EmployeeWish: `${hostname}/hrapi/api/MocApiGeneralV2/EmployeeWish`,
      // 上传图片
      EmployeeCareUploadFile: `${hostname}/hrapi/api/MocApiGeneralV2/EmployeeCareUploadFile`,
      // 发送祝福
      SavaEmployeeWish: `${hostname}/hrapi/api/MocApiGeneralV2/SavaEmployeeWish`
    }
  },

};

