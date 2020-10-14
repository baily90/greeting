<template>
  <div id="app">
    <div class="sendWishes-first">
      <div class="sendWishes-first-title">
        <span class="selected">生日祝福</span>
        <span>周年祝福</span>
      </div>
    </div>
    <div class="sendWishes-second">
      <div class="item">
        <div class="name">
          <span>菜丽丽</span>
          <span>（1091891 &nbsp;&nbsp; 研发组）</span>
        </div>
        <div>2020-08-12</div>
      </div>
      <div class="item">
        <div class="name">
          <span>菜丽丽</span>
          <span>（1091891 &nbsp;&nbsp;研发组）</span>
        </div>
        <div>2020-08-12</div>
      </div>
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
      name: "啦啦啦啦啦",
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
  line-height: 1000px;
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