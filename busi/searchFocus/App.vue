<template>
  <div class="container-searchFocus">
    <div class="bg-page"></div>
    <div class="search-box">
      <div class="search">
        <div class="input-area">
          <img class="icon-search" src="./assets/icon-search.png" alt="" />
          <van-field
            ref="input"
            v-model="keywords"
            placeholder="输入同事姓名/工号"
            :center="true"
            :autofocus="true"
            @focus="focusHandler"
          />
        </div>
        <div class="btn-area">
          <span class="btn-search" @click="search" v-if="!isSearched"
            >搜索</span
          >
          <img
            class="btn-clear"
            v-if="isSearched"
            src="./assets/icon-clear.png"
            @click="clearKeywords"
          />
        </div>
      </div>
    </div>
    <van-list
      v-if="firstRenderComplete && list && list.length"
      v-model="isLoading"
      :finished="isFinished"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="list-search">
        <div class="item-search" v-for="(item, index) in list" :key="index">
          <div class="info-focus">
            <div class="name">{{ item.EMPLOYEE_NAME }}</div>
            <div class="base">
              <span>{{ item.EMPLOYEE_CODE }}</span>
              <span class="departmentName">{{ item.DEPARTMENT_NAME }}</span>
            </div>
          </div>
          <div
            class="btn-focus"
            :class="{ act: item.IS_CARE != 1 }"
            @click="UpdateStatus(item)"
          >
            {{ item.IS_CARE == 1 ? "取消关注" : "关注" }}
          </div>
        </div>
      </div>
    </van-list>
    <div class="empty" v-if="firstRenderComplete && (!list || !list.length)">
      <img class="icon-empty" src="./assets/icon-empty.png" alt="" />
      暂无搜索记录
    </div>
  </div>
</template>

<script>
import utils from "./../../common/util";
import { Field, Toast } from "vant";
import { FocusList, UpdateStatus } from "./service";
import { List } from "vant";
export default {
  components: {
    [Field.name]: Field,
    [List.name]: List,
  },
  data() {
    return {
      loginUserId: utils.getPara("loginUserId"),
      keywords: "",
      isSearched: false,
      isLoading: false,
      isFinished: false,
      firstRenderComplete: false,
      pageNum: 1,
      list: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {},
    search() {
      if (!this.keywords || !this.keywords.trim()) {
        Toast("请输入同事姓名/工号");
        this.list = [];
        return;
      }
      this.pageNum = 1;
      this.list = [];
      this.firstRenderComplete = false;
      this.isSearched = true;
      this.FocusList();
    },
    onLoad() {
      this.FocusList();
    },
    async FocusList() {
      try {
        const { data } = await FocusList({
          loginUserId: this.loginUserId,
          focusName: this.keywords,
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
    clearKeywords() {
      this.keywords = "";
      this.$refs.input.focus();
    },
    focusHandler() {
      this.isSearched = false;
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
input {
  border: none;
  font-size: 28px;
  color: #333333;
}
::-webkit-input-placeholder {
  color: #dddddd;
}

:-ms-input-placeholder {
  color: #dddddd;
}

::-moz-placeholder {
  color: #dddddd;
}

:-moz-placeholder {
  color: #dddddd;
}
.container-searchFocus {
  padding: 128px 0 48px;
  .bg-page {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: -1;
    background-color: #f6f6f6;
  }
  .search-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 128px;
    padding: 24px;
    background-color: #f6f6f6;
    .search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 80px;
      padding: 0 30px 0 20px;
      background: #ffffff;
      border-radius: 10px;
      .input-area {
        display: flex;
        align-items: center;
        width: 500px;
        .icon-search {
          margin-right: 6px;
          width: 36px;
          height: 36px;
        }
      }
      .btn-area {
        display: flex;
        align-items: center;
        .btn-search {
          font-size: 28px;
          color: #284b7e;
        }
        .btn-clear {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
  .list-search {
    margin: 0 auto;
    width: 702px;
    padding: 0 24px;
    background: #ffffff;
    border-radius: 10px;
    .item-search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 20px 0;
      // height: 98px;
      border-bottom: 1px solid #ededed;
      &:last-child {
        border: 0;
      }
      .info-focus {
        // display: flex;
        // align-items: center;
        .name {
          font-size: 30px;
          color: #333333;
          line-height: 42px;
          font-weight: bolder;
          padding-bottom: 10px;
        }
        .base {
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
        color: #999;
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
}
</style>