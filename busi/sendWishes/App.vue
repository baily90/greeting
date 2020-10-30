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
            <span class="time">{{ item.SEND_TIME | dateFormat }}</span>
          </div>
          <div>
            <span>{{ item.EMPLOYEE_CODE }}</span>
            <span class="departmentNamne">{{ item.DEPARTMENT_NAME }}</span>
          </div>
        </div>
      </van-list>
    </div>

    <div
      class="empty"
      v-if="firstRenderComplete && (!historyList || !historyList.length)"
    >
      <img class="icon-empty" src="./assets/icon-empty.png" alt="" />
      暂无发送的祝福
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
  computed: {
    host() {
      return utils.hostRefect();
    },
  },
  filters: {
    dateFormat(value) {
      return value.split(" ")[0];
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
      location.href = `${this.host}/birthday?&id=${item.ROW_ID}&wishType=${this.type}&isHistory=true`;
      // location.href = `${this.host}/birthday?loginUserId=${this.loginUserId}&UserId=${item.EMPLOYEE_ID}&id=${item.ROW_ID}&year=${item.YEAR_COUNT}&wishType=${this.type}&isHistory=true`;
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
  padding: 20px 0;

  font-size: 24px;
  color: #333333;
  border-bottom: 1px solid #ededed;
}
.departmentNamne {
  margin-left: 20px;
}
.sendWishes-second .name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}
.sendWishes-second .name .time {
  color: #999999;
}
.sendWishes-second .name span:first-child {
  font-size: 40px;
  font-weight: bold;
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
</style>