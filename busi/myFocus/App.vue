<template>
  <div class="container-myFocus">
    <div class="bg-page"></div>
    <van-list
      v-if="firstRenderComplete && list && list.length"
      v-model="isLoading"
      :finished="isFinished"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="list-focus">
        <div class="item-focus" v-for="(item, index) in list" :key="index">
          <div class="info-focus">
            <div class="user-info">
              <div class="name">{{ item.EMPLOYEE_NAME }}</div>
              <div class="base">关注时间：{{ item.FOCUS_TIME }}</div>
            </div>
            <div class="time-focus">
              <span>{{ item.EMPLOYEE_CODE }}</span>
              <span class="departmentName">{{ item.DEPARTMENT_NAME }}</span>
            </div>
          </div>
          <div
            class="btn-focus"
            :class="{ act: item.IS_CARE != 1 }"
            @click="UpdateStatus(item)"
          >
            {{ item.IS_CARE == 1 ? "已关注" : "关注" }}
          </div>
        </div>
      </div>
    </van-list>
    <div class="empty" v-if="firstRenderComplete && (!list || !list.length)">
      <img class="icon-empty" src="./assets/icon-empty.png" alt="" />
      暂无关注
    </div>
    <div class="btn-bottom">
      <div class="btn" @click="go2SearchFocus">
        <img class="icon-add" src="./assets/icon-add.png" alt="" />
        搜索关注
      </div>
    </div>
  </div>
</template>

<script>
import utils from "./../../common/util";
import { FocusList, UpdateStatus } from "./service";
import { List } from "vant";
export default {
  components: {
    [List.name]: List,
  },
  data() {
    return {
      loginUserId: utils.getPara("loginUserId"),
      isLoading: false,
      isFinished: false,
      firstRenderComplete: false,
      pageNum: 1,
      list: [],
    };
  },
  computed: {
    host() {
      return utils.hostRefect();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.FocusList();
    },
    onLoad() {
      this.FocusList();
    },
    async FocusList() {
      try {
        const { data } = await FocusList({
          loginUserId: this.loginUserId,
          focusName: "",
          page: this.pageNum,
        });
        if (data && data.ResultCode == 0) {
          if (this.pageNum == 1) {
            this.list = data.Data;
          } else {
            this.list = this.list.concat(data.Data);
          }
          this.isFinished = data.TOTALCOUNT - this.pageNum * 30 <= 0;
          this.firstRenderComplete = true;
          this.isLoading = false;
          if (!this.isFinished) {
            this.pageNum++;
          }
        }
      } catch (error) {
        this.firstRenderComplete = true;
        this.isLoading = false;
        console.log("FocusList接口异常" + error);
      }
    },
    async UpdateStatus(emp) {
      try {
        const isCare = emp.IS_CARE == 1;
        const { data } = await UpdateStatus({
          loginUserId: this.loginUserId,
          careCode: emp.EMPLOYEE_CODE,
          careStatus: isCare ? "0" : "1",
        });
        if (data && data.ResultCode == 0) {
          this.list.map((item) => {
            if (item.EMPLOYEE_CODE == emp.EMPLOYEE_CODE) {
              item.IS_CARE = isCare ? "0" : "1";
            }
            return item;
          });
        }
      } catch (error) {
        console.log("UpdateStatus接口异常:" + error);
      }
    },
    go2SearchFocus() {
      location.href = `${this.host}/searchFocus?loginUserId=${this.loginUserId}`;
    },
  },
};
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
    background-color: #f6f6f6;
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
      border-bottom: 1px solid #ededed;
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
            color: #999;
            line-height: 34px;
            margin-left: 12px;
          }
        }
        .time-focus {
          margin-top: 14px;
          font-size: 24px;
          color: #333333;
          line-height: 34px;
        }
        .departmentName {
          margin-left: 20px;
        }
      }
      .btn-focus {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 46px;
        font-size: 24px;
        color: #b7b7b7;
        border: 1px solid #dadad9;
        &.act {
          border: 1px solid #ffc844;
          background: #ffc844;
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
    color: #bdc7d3;
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
    background: #f6f6f6;
    z-index: 1;
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 702px;
      height: 90px;
      background: #ff592f;
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