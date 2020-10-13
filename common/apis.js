let hostname = `http://air.nongnet.net`;
if (location.host.indexOf('air.nongnet.net') == -1) {
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
      // 获取城市
      getCity: `${hostname}/wx/reserve/city`,
      // 获取门店
      getStore: `${hostname}/wx/reserve/shop`,
      // 获取证件类型枚举
      getCardType: `${hostname}/wx/reserve/getPaperType`,
      // 获取订单详情
      getReserveOrder: `${hostname}/wx/reserve/getReserveOrder`,
      // 保存微信预约信息
      saveReserveOrder: `${hostname}/wx/reserve/saveReserveOrder`,
      //预留休息厅判断当前是否有订单
      getReserveOrderStatus: `${hostname}/wx/reserve/getReserveOrderStatus`,
      // 获取服务器时间
      getTime: `${hostname}/wx/reserve/getTime`,
      // 余额列表
      getMoneyLogList: `${hostname}/wx/money/getMoneyLogList`,
      // 会员中心 特权
      getVipList: `${hostname}/wx/my/getVipList`,
      // 获取用户信息
      getUserInfo: `${hostname}/wx/my/getUserInfo`,
      // 获取该用户的会员卡信息
      getUserVip: `${hostname}/wx/my/getUserVip`,
      // 生成购买会员卡订单
      createMemberOrder: `${hostname}/wx/my/createMemberOrder`,
      // 获取支付类型枚举
      getPayType: `${hostname}/wx/pay/getPayType`,
      // 获取微信code(微信授权)
      getCode: `${hostname}/weixin/getCode`,
      getLoccalPosition: `${hostname}/weixin/getTicketToken`,
      addUserInfo: `${hostname}/wx/my/addUserInfo`
    }
  },

};

