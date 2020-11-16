<template>
  <div id="app">
    <div class="container">
      <div
        :class="
          wishType == 'YEAR'
            ? 'birth-background year-background whiteColor'
            : 'birth-background'
        "
      >
        <img :src="birthDetail.ICON ? birthDetail.ICON : noPerson" alt="" />
        <div class="name">
          {{ birthDetail.EMPLOYEE_NAME }} {{ birthDetail.EMPLOYEE_CODE }}
          {{ birthDetail.DEPARTMENT_NAME }}
        </div>
        <div class="date" v-if="wishType == 'YEAR'">
          入职{{ birthDetail.YEAR_COUNT }}周年
        </div>
        <div class="date" v-else>
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
        <div class="img-box" v-show="isHistory && birthDetail.UPLOAD_GIFT">
          <img :src="birthDetail.UPLOAD_GIFT" />
        </div>
        <img
          v-show="!isHistory && selectUpload"
          class="selected"
          :src="uploadImg"
        />
        <div class="uploadContain" v-if="!isHistory && !selectUpload">
          <div class="icon-plus" v-if="!uploadImg"></div>
          <img
            class="upload"
            :src="uploadImg"
            alt=""
            :style="{
              background: uploadImg ? '#f9f6f4' : '#ffffff',
              border: uploadImg ? 'none' : '',
            }"
          />
          <input type="file" @change="handleUpload($event)" />
        </div>
      </div>
      <div class="birth-fill">
        <span>填写祝福</span>
        <span
          :class="isHistory ? 'exchange greyFont' : 'exchange'"
          @click="handleExchange"
          >换一换</span
        >
      </div>
      <div class="birth-content">
        <textarea v-model="birthContent.COPY" :readonly="isHistory"></textarea>
      </div>
      <div
        :class="isHistory ? 'birth-send grey' : 'birth-send'"
        @click="sendWishes()"
      >
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
import { Field, Toast } from "vant";
import noPerson from "./assets/noPerson.png";
export default {
  name: "App",
  data() {
    return {
      isLoading: false,
      birthDetail: {},
      birthContent: {
        COPY: "",
      },
      noPerson: noPerson,
      //上传的图片
      uploadGift: "",
      //上传后接口返回的url
      uploadImg: "",
      //选择的礼物id
      giftId: "",
      // 当前选择的祝福内容index
      birthIndex: -1,
      loginUserId: utils.getPara("loginUserId"),
      // 是否是从历史送出的祝福列表进入 是为true否则不是
      isHistory: utils.getPara("isHistory") == "true",
      // 祝福id
      id: utils.getPara("id"),
      // 祝福类型 YEAR周年，BIRTHDAY生日
      wishType: utils.getPara("wishType"),
      UserId: utils.getPara("UserId"),
      year: utils.getPara("year"),
      selectUpload: false,
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
    if (this.wishType == "BIRTHDAY") {
      document.querySelector("title").innerText = "生日祝福";
    } else {
      document.querySelector("title").innerText = "周年祝福";
    }

    this.getList();
  },
  methods: {
    sendWishes() {
      if (this.isHistory) {
        return;
      }
      const url = apis.getUrls().SavaEmployeeWish;
      const params = {
        newModel: {
          // loginUserId: this.loginUserId,
          // userId: this.UserId,
          gift: this.giftId,
          blessingContent: this.birthContent.COPY,
          // tweetImg: "",
          cardBackground: this.birthDetail.CARD_BACKGROUND[0].ROW_ID,
          // careSetupId: this.birthDetail.CARE_SETUP_ID,
          icon: this.birthDetail.ICON,
          uploadGift: this.uploadImg,
          sendRecordId: this.id,
        },
      };
      axiosWrap
        .post(url, params)
        .then(({ data }) => {
          if (data && data.ResultCode == 0) {
            Toast("发送成功");
          } else {
            Toast(data.ResultMessage);
          }
        })
        .catch((err) => {
          Toast("发送失败");
          this.isLoading = false;
          console.error(err);
        });
    },
    // 上传礼物
    handleUpload(e) {
      if (this.isHistory) {
        return;
      }
      if (!window.FileReader) return;
      var files = e.target.files;
      for (var i = 0, f; (f = files[i]); i++) {
        var reader = new FileReader();
        reader.onload = (() => {
          return (e) => {
            console.log(e, files[0]);
            this.uploadGift = e.target.result;
            this.requertUpload(
              this.uploadGift.substring(
                this.uploadGift.indexOf("base64,") + 7,
                this.uploadGift.length
              ),
              files[0].name
            );
          };
        })(f);
        reader.readAsDataURL(f);
      }
    },
    requertUpload(file, file_name) {
      const self = this;
      try {
        self.$loading.show();
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("file_name", file_name);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", apis.getUrls().EmployeeCareUploadFile, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            self.$loading.hide();
            const data = JSON.parse(xhr.responseText);
            if (data && data.ResultCode == 0) {
              self.uploadImg = data.Data;
              self.giftId = "";
              self.selectUpload = true;
              self.birthDetail.GIFT.forEach((item) => {
                item.IS_CHIOSE = false;
              });
              Toast("上传成功");
            } else {
              Toast("上传失败");
              self.isLoading = false;
              self.$loading.hide();
            }
          }
        };
        xhr.send(formdata);
      } catch (error) {
        Toast("上传失败");
        self.isLoading = false;
        console.error(error);
        self.$loading.hide();
      }

      // const url = apis.getUrls().EmployeeCareUploadFile;
      // const params = {
      //   file,
      //   file_name,
      // };
      // axiosWrap
      //   .post(url, params)
      //   .then(({ data }) => {
      //     if (data && data.ResultCode == 0) {
      //       this.uploadImg = data.Data;
      //       this.giftId = "";
      //       this.selectUpload = true;
      //       this.birthDetail.GIFT.forEach((item) => {
      //         item.IS_CHIOSE = false;
      //       });
      //       console.log(data);
      //     } else {
      //       Toast("上传失败");
      //     }
      //   })
      //   .catch((err) => {
      //     Toast("上传失败");
      //     this.isLoading = false;
      //     console.error(err);
      //   });
    },
    // 选择礼物
    handleSlectGift(item, index) {
      if (this.isHistory) {
        return;
      }
      this.selectUpload = false;
      if (!item.IS_CHIOSE) {
        this.giftId = item.ROW_ID;
        this.birthDetail.GIFT.forEach((item) => {
          item.IS_CHIOSE = false;
        });
        this.birthDetail.GIFT[index].IS_CHIOSE = true;
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
      let params = {};
      if (this.isHistory) {
        params.id = this.id;
      } else {
        params.wishId = this.id;
      }
      axiosWrap
        .get(url, { params })
        .then(({ data }) => {
          if (data && data.ResultCode == 0) {
            if(data.IsSend) {
              this.isHistory = true
            }
            this.birthDetail = data.Data;
            this.birthIndex = 0;
            this.birthContent = this.birthDetail.COPY_LIST[this.birthIndex];
            if (!this.isHistory) {
              this.giftId = this.birthDetail.GIFT[0].ROW_ID;
              this.birthDetail.GIFT[0].IS_CHIOSE = true;
            } else {
              this.birthContent.COPY = this.birthDetail.BLESSING_CONTENT
            }
            console.log(this.birthDetail);
          }
        })
        .catch((err) => {
          this.isLoading = false;
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
.whiteColor {
  color: #ffffff !important;
}
.year-background {
  background: url("./assets/year.png") no-repeat !important;
}
.birth-background {
  height: 400px;
  background: url("./assets/birthday.png") no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a9792a;
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
  margin-top: 20px;
  margin-bottom: 10px;
}
.birth-background .date {
  font-size: 36px;
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
.uploadContain {
  width: calc(25% - 42px);
  height: 112px;
  background: #f9f6f4;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  position: relative;
}
.birth-gift input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
}
.img-box {
  position: relative;
  width: calc(25% - 42px);
  height: 112px;
  border: 4px solid #ff592f;
  box-sizing: border-box;
  border-radius: 10px;
  
  &:after {
    position: absolute;
    top: -4px;
    right: -4px;
    content: '';
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    background: url("./assets/selected.png") no-repeat;
    background-position-x: 54px;
    background-position-y: -4px;
    z-index: 1;
  }
  img {
    width: 100%;
    height: 100%;
  }
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
  position: absolute;
  width: 100%;
}
.icon-plus {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 48px;
    margin-left: -24px;
    margin-top: -2px;
    border-top: 4px solid #efefef;
    z-index: 1;
  }
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    height: 48px;
    margin-left: -2px;
    margin-top: -24px;
    border-left: 4px solid #efefef;
    z-index: 1;
  }
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
  position: relative;
  width: 18%;
  text-align: right;
}

.greyFont {
  color: #d2d2d2 !important;
}
.greyFont::before {
  content: "";
  position: absolute;
  background: url("./assets/refresh-grey.png") no-repeat !important;
  width: 28px;
  height: 28px;
  left: 0;
  top: 2px;
}
.birth-fill .exchange::before {
  content: "";
  position: absolute;
  background: url("./assets/refresh.png") no-repeat;
  width: 28px;
  height: 28px;
  left: 0;
  top: 2px;
}
.birth-content {
  margin: 0 20px;
}
.birth-content textarea {
  margin: 20px 0;
  font-size: 28px;
  width: calc(100% - 40px);
  height: 210px;
  background: #f8f8f8;
  padding: 20px;
  line-height: 1;
  border: none;
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