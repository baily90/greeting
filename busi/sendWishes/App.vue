<template>
  <div id="app">
    <div class="sendWishes-first">
      <div class="sendWishes-first-title">
        <span
          :class="type == 'BIRTHDAY' ? 'selected' : ''"
          @click="handleType('BIRTHDAY')"
          >生日祝福</span
        >
        <span
          :class="type == 'YEAR' ? 'selected' : ''"
          @click="handleType('YEAR')"
          >周年祝福</span
        >
      </div>
    </div>
    <div class="sendWishes-second">
      <van-list
        v-if="firstRenderComplete && historyList && historyList.length"
        v-model="isLoading"
        :finished="isFinished"
        @load="getList"
        :immediate-check="false"
      >
        <div
          class="item"
          v-for="(item, index) in historyList"
          :key="index"
          @click="gotoDetail(item)"
        >
          <div class="name">
            <span>{{ item.EMPLOYEE_NAME }}</span>
            <span
              >（{{ item.EMPLOYEE_CODE }} &nbsp;&nbsp;
              {{ item.DEPARTMENT_NAME }}）</span
            >
          </div>
          <div>{{ item.SEND_TIME | dateFormat }}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import utils from "../../common/util";
import axiosWrap from "../../common/axiosWrap";
import apis from "../../common/apis";
import CToast from "../../components/Toast/Toast";
import { List } from "vant";
export default {
  name: "App",
  data() {
    return {
      isLoading: false,
      firstRenderComplete: false,
      isFinished: false,
      historyList: [],
      pageNum: 1,
      type: "BIRTHDAY",
      loginUserId: utils.getPara("loginUserId"),
    };
  },
  filters: {
    dateFormat(value) {
      return value.split("T")[0];
    },
  },
  components: {
    CToast,
    [List.name]: List,
  },
  created() {
    this.getList();
  },
  methods: {
    handleType(type) {
      console.log(type);
      this.type = type;
      this.pageNum = 1;
      this.getList();
    },
    gotoDetail(item) {
      location.href = `/birthday?loginUserId=${this.loginUserId}&UserId=${item.EMPLOYEE_ID}&id=${item.ROW_ID}&year=${item.YEAR_COUNT}&wishType=${this.type}&isHistory=true`;
    },
    // 历史送出的祝福
    getList() {
      console.log(this.loginUserId);
      console.log(333);
      const url = apis.getUrls().EmployeeWishHistoryList;
      const params = {
        loginUserId: this.loginUserId,
        wishType: this.type,
        sendType: 1,
      };
      axiosWrap
        .get(url, { params })
        .then(({ data }) => {
          console.log(data);
          if (data && data.ResultCode == 0) {
            if (this.pageNum == 1) {
              this.historyList = data.Data;
            } else {
              this.historyList = this.historyList.concat(data.Data);
            }

            this.isFinished = data.TOTALCOUNT - this.pageNum * 30 <= 0;
            this.firstRenderComplete = true;
            this.isLoading = false;
            console.log(11);
            console.log(this.historyList);
            console.log(this.firstRenderComplete);
            if (!this.isFinished) {
              this.pageNum++;
            }
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.firstRenderComplete = true;
          console.error(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./mixins";

#app {
  background: #f6f6f6;
  height: 100%;
}
.sendWishes-first {
  padding: 20px 130px;
}
.sendWishes-first-title {
  border-radius: 30px;
  height: 60px;
  line-height: 60px;
  background: #ffffff;
  font-size: 28px;
  color: #666666;
}
.sendWishes-first-title span:first-child {
  width: 49%;
  text-align: center;
  display: inline-block;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.sendWishes-first-title span:last-child {
  width: 49%;
  text-align: center;
  display: inline-block;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.sendWishes-first-title .selected {
  background: #ff592f;
  color: #ffffff;
}
.sendWishes-second {
  padding: 0 30px;
  background: #ffffff;
}
.sendWishes-second .item {
  height: 100px;
  line-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  color: #333333;
  border-bottom: 1px solid #ededed;
}
.sendWishes-second .name span:first-child {
  font-size: 30px;
  font-weight: bold;
}
</style>