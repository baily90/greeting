<template>
  <div class="container-myFocus">
    <div class="bg-page"></div>
    <div class="list-focus" v-if="list && list.length">
      <div class="item-focus" v-for="(item, index) in list" :key="index">
        <div class="info-focus">
          <div class="user-info">
            <div class="name">{{item.EMPLOYEE_NAME}}</div>
            <div class="base">（{{item.EMPLOYEE_CODE}} {{item.DEPARTMENT_NAME}})</div>
          </div>
          <div class="time-focus">关注时间：{{item.FOCUS_TIME | dateFormat}}</div>
        </div>
        <div class="btn-focus" :class="{'act':item.IS_CARE != 1}" @click="UpdateStatus(item)">{{item.IS_CARE == 1 ? '已关注':'关注'}}</div>
      </div>
    </div>
    <div class="empty" v-if="!list || !list.length">
      <img class="icon-empty" src="./assets/icon-empty.png" alt="">
      暂无关注
    </div>
    <div class="btn-bottom">
      <div class="btn" @click="go2SearchFocus">
        <img class="icon-add" src="./assets/icon-add.png" alt="">
        搜索关注
      </div>
    </div>
  </div>
</template>

<script>
import utils from './../../common/util'
import { FocusList, UpdateStatus } from './service'
export default {
  components: {},
  data() {
    return {
      loginUserId: utils.getPara('loginUserId'),
      list: []
    }
  },
  computed:  {
    host() {
      return utils.hostRefect()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.FocusList()
    },
    async FocusList() {
      try {
        const {data} = await FocusList({loginUserId:this.loginUserId,focusName:''})
        if(data && data.ResultCode == 0) {
          this.list = data.Data
        }
      } catch (error) {
        console.log('FocusList接口异常'+error)
      }
    },
    async UpdateStatus(emp) {
      try {
        const isCare = emp.IS_CARE == 1
        const {data} = await UpdateStatus({loginUserId:this.loginUserId, careCode: emp.EMPLOYEE_CODE, careStatus: isCare ? '0' : '1'})
        if(data && data.ResultCode == 0) {
          this.list.map(item => {
            if(item.EMPLOYEE_CODE == emp.EMPLOYEE_CODE) {
              item.IS_CARE = isCare ? '0' : '1'
            }
            return item
          })
        }
      } catch (error) {
        console.log('UpdateStatus接口异常:'+error)
      }
    },
    go2SearchFocus() {
      location.href = `${this.host}/searchFocus?loginUserId=${this.loginUserId}`
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container-myFocus {
  padding-bottom: 158px;
  .bg-page {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: -1;
    background-color: #F6F6F6;
  }
  .list-focus {
    width: 100%;
    padding: 0 24px;
    background: #fff;
    .item-focus {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 140px;
      padding: 0 8px;
      border-bottom: 1px solid #EDEDED;
      &:last-child {
        border: 0;
      }
      .info-focus {
        .user-info {
          display: flex;
          align-items: flex-end;
          .name {
            font-size: 30px;
            color: #333333;
            line-height: 42px;
            font-weight: bolder;
          }
          .base {
            font-size: 24px;
            color: #333333;
            line-height: 34px;
          }
        }
        .time-focus {
          margin-top: 14px;
          font-size: 24px;
          color: #999;
          line-height: 34px;
        }
      }
      .btn-focus {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 46px;
        font-size: 24px;
        color: #B7B7B7;
        border: 1px solid #DADAD9;
        &.act {
          border: 1px solid #FFC844;
          background: #FFC844;
          color: #fff;
        }
      }
    }
  }
  .empty {
    margin: 132px auto 0;
    width: 270px;
    text-align: center;
    font-size: 28px;
    color: #BDC7D3;
    line-height: 40px;
    .icon-empty {
      margin-bottom: 40px;
      width: 270px;
      height: 270px;
    }
  }
  .btn-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px 24px 48px;
    background: #F6F6F6;
    z-index: 1;
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 702px;
      height: 90px;
      background: #FF592F;
      border-radius: 10px;
      font-size: 30px;
      color: #fff;
      line-height: 42px;
      font-weight: bolder;
      .icon-add {
        margin-right: 12px;
        width: 26px;
        height: 26px;
      }
    }
  }
}
</style>