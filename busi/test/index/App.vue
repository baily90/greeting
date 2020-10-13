<template>
  <div id="app">
    <div class="test">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        {{name}}
      </van-pull-refresh>
      
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
        isLoading:false,
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
      onRefresh() {
          setTimeout(() => {
              this.isLoading =  false
          }, 1000)
      },
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
  background: #fff;
}
.test {
    font-size: 30px;
}
</style>