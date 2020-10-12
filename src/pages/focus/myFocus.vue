<template>
  <div id="app">我的关注</div>
</template>

<script>
import wx from 'weixin-js-sdk'
import tools from '@/commons/tools'
import { getSignature } from '@/service/focus'
export default {
  components: {},
  data () {
    return {}
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // eslint-disable-next-line no-undef
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        defaultCameraMode: 'batch', // 表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
        success: function (res) {
        }
      })
      this.getSignature()
      console.log(tools.getQueryString('token'))
    },
    async getSignature () {
      await getSignature({ url: location.href })
    }
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100vh;
}
body {
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
  -webkit-font-smoothing: antialiased; /*chrome、safari*/
  -moz-osx-font-smoothing: grayscale; /*firefox*/
}
#app {
  font-family: "Helvetica Neue", Tahoma, Arial, PingFangSC-Regular,
    "Hiragino Sans GB", sans-serif, "Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
img {
  display: inline-flex;
  vertical-align: top;
  width: 100%;
}
div::-webkit-scrollbar {
  display: none;
}
input {
  border: none;
  color: #28282d;
}
.van-pull-refresh__head {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
