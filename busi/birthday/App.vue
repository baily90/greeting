<template>
  <div id="app">
    <div class="container">
      <div class="birth-background">
        <img src="" alt="" />
        <div class="name">周兴明 1200191 研发组</div>
        <div class="date">9月18日生日</div>
      </div>

      <div class="birth-select">选择礼物</div>
      <div class="birth-gift">
        <img class="selected" src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img class="upload" src="" alt="" />
      </div>
      <div class="birth-fill">
        <span>填写祝福</span>
        <span class="exchange">换一换</span>
      </div>
      <div class="birth-content">
        <textarea :value="birthContent"></textarea>
      </div>
      <div class="birth-send">发送祝福</div>
      <div class="birth-refrom">祝福会在同事生日当天发给TA</div>
    </div>
  </div>
</template>

<script>
import { PullRefresh } from "vant";
import util from "../../../common/util";
import axiosWrap from "../../../common/axiosWrap";
import apis from "../common/apis";
import CToast from "../../../components/Toast/Toast";
export default {
  name: "App",
  data() {
    return {
      isLoading: false,
      birthContent: "啦啦啦啦啦",
    };
  },
  components: {
    CToast,
    [PullRefresh.name]: PullRefresh,
  },
  created() {
    this.test();
  },
  methods: {
    //test
    test() {
      const url = apis.getUrls().test;
      axiosWrap
        .post(url, {})
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/mixins";

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
.birth-background {
  background: url("../common/birthday.png") no-repeat;
  background-size: 100%;
  height: 390px;
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
  background: url("../common/selected.png") no-repeat;
  background-position-x: 63px;
  background-position-y: -8px;
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