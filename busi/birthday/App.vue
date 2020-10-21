<template>
  <div id="app">
    <div class="container">
      <div class="birth-background">
        <img src="" alt="" />
        <div class="name">
          {{ birthDetail.EMPLOYEE_NAME }} {{ birthDetail.EMPLOYEE_CODE }}
          {{ birthDetail.DEPARTMENT_NAME }}
        </div>
        <div class="date">
          {{ birthDetail.BIRTHDAY | monthFilter }}月{{
            birthDetail.BIRTHDAY | dateFilter
          }}日生日
        </div>
      </div>

      <div class="birth-select">选择礼物</div>
      <div class="birth-gift">
        <img
          :class="item.IS_CHIOSE ? 'selected' : ''"
          :src="item.URL"
          v-for="(item, index) in birthDetail.GIFT"
          @click="handleSlectGift(item, index)"
          :key="index"
        />
        <img class="upload" src="" alt="" />
      </div>
      <div class="birth-fill">
        <span>填写祝福</span>
        <span
          :class="isHistory == 'true' ? 'exchange greyFont' : 'exchange'"
          @click="handleExchange"
          >换一换</span
        >
      </div>
      <div class="birth-content">
        <textarea
          :value="birthContent.COPY"
          readonly="isHistory == 'true'"
        ></textarea>
      </div>
      <div :class="isHistory == 'true' ? 'birth-send grey' : 'birth-send'">
        发送祝福
      </div>
      <div class="birth-refrom">祝福会在同事生日当天发给TA</div>
    </div>
  </div>
</template>

<script>
import utils from "../../common/util";
import axiosWrap from "../../common/axiosWrap";
import apis from "../../common/apis";
import CToast from "../../components/Toast/Toast";
export default {
  name: "App",
  data() {
    return {
      isLoading: false,
      birthDetail: {},
      birthContent: {
        COPY: "",
      },
      //选择的礼物id
      giftId: "",
      // 当前选择的祝福内容index
      birthIndex: -1,
      loginUserId: utils.getPara("loginUserId"),
      // 是否是从历史送出的祝福列表进入 是为true否则不是
      isHistory: utils.getPara("isHistory"),
      // 祝福id
      id: utils.getPara("id"),
      // 祝福类型 YEAR周年，BIRTHDAY生日
      wishType: utils.getPara("wishType"),
      UserId: utils.getPara("UserId"),
      year: utils.getPara("year"),
    };
  },
  components: {
    CToast,
  },
  filters: {
    monthFilter(value) {
      if (value && value.split(" ")) {
        return value.split(" ")[0].split("-")[1];
      }
    },
    dateFilter(value) {
      if (value && value.split(" ")) {
        return value.split(" ")[0].split("-")[2];
      }
    },
  },
  created() {
    this.getList();
  },
  methods: {
    // 选择礼物
    handleSlectGift(item, index) {
      if (this.isHistory) {
        return;
      }
      console.log(index, this.giftId);
      if (!item.IS_CHIOSE) {
        this.giftId = item.ROW_ID;
        this.birthDetail.GIFT.forEach((item) => {
          item.IS_CHIOSE = false;
        });
        this.birthDetail.GIFT[index].IS_CHIOSE = true;
      } else {
        this.giftId = "";
        this.birthDetail.GIFT[index].IS_CHIOSE = false;
      }
    },
    // 换一换
    handleExchange() {
      if (this.isHistory) {
        return;
      }
      if (this.birthIndex != -1) {
        if (this.birthIndex + 1 == this.birthDetail.COPY_LIST.length) {
          this.birthIndex = 0;
        } else {
          this.birthIndex++;
        }
        this.birthContent = this.birthDetail.COPY_LIST[this.birthIndex];
      }
    },
    //getList
    getList() {
      const url = apis.getUrls().EmployeeWish;
      const params = {
        id: this.id,
        wishType: this.wishType,
        UserId: this.UserId,
        year: this.year,
      };
      axiosWrap
        .get(url, { params })
        .then(({ data }) => {
          if (data && data.ResultCode == 0) {
            this.birthDetail = data.Data;
            this.birthIndex = 0;
            this.birthContent = this.birthDetail.COPY_LIST[this.birthIndex];
            console.log(this.birthDetail);
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
  background: #fdf5ee;
  height: 100%;
  padding: 40px;
}
.container {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
}
.grey {
  background: #d2d2d2 !important;
}
.greyFont {
  color: #d2d2d2 !important;
}
.birth-background {
  height: 390px;
  background: url("./assets/birthday.png") no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.birth-background img {
  width: 130px;
  height: 130px;
  border-radius: 130px;
  background: orange;
  margin-top: 70px;
}
.birth-background .name {
  font-size: 30px;
  color: #a9792a;
  margin-top: 20px;
  margin-bottom: 10px;
}
.birth-background .date {
  font-size: 36px;
  color: #a9792a;
}
.birth-select {
  font-size: 28px;
  color: #bfbfbf;
  margin: 30px 20px;
}
.birth-gift {
  margin: 0px 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.birth-gift img {
  width: calc(25% - 42px);
  height: 112px;
  background: #f9f6f4;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  position: relative;
}
.birth-gift .selected {
  width: calc(25% - 42px);
  border: 4px solid #ff592f;
  background: url("./assets/selected.png") no-repeat;
  background-position-x: 54px;
  background-position-y: -4px;
  box-sizing: border-box;
}
.birth-gift img:nth-child(5n) {
  margin-right: 0px !important;
}
.birth-gift .upload {
  border: 2px dashed #d9d1c7;
  background: #ffffff;
  position: relative;
  box-sizing: border-box;
}
.birth-gift .upload::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 48px;
  margin-left: -24px;
  margin-top: -2px;
  border-top: 4px solid #efefef;
}
.birth-gift .upload::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  height: 48px;
  margin-left: -2px;
  margin-top: -24px;
  border-left: 4px solid #efefef;
}
.birth-fill {
  font-size: 28px;
  color: #bfbfbf;
  margin: 14px 20px;
  display: flex;
  justify-content: space-between;
}
.birth-fill .exchange {
  font-size: 24px;
  color: #f58a56;
}
.birth-content {
  margin: 0 20px;
}
.birth-content textarea {
  margin: 20px 0;
  width: calc(100% - 40px);
  height: 210px;
  background: #f8f8f8;
  padding: 20px;
  border: none;
  font-size: 28px;
  color: #333333;
  border-radius: 10px;
}
.birth-send {
  margin: 50px 60px 20px 60px;
  width: calc(100% - 120px);
  height: 80px;
  line-height: 80px;
  background: #ff592f;
  font-size: 36px;
  color: #ffffff;
  text-align: center;
}
.birth-refrom {
  font-size: 28px;
  color: #ae8958;
  text-align: center;
  width: 100%;
}
</style>