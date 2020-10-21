<template>
  <van-overlay :show="isShow" class-name="overLay">
    <div class="img-area">
      <!-- <img src="./assets/icon.png" width="100%" height="100%" alt=""> -->
    </div>
    <div class="btn-area">
      <div class="saveImg" @click="save">
        <img class="icon icon-saveImg" src="./assets/icon-saveImg.png" alt="">
        <span class="label">保存图片</span>
      </div>
      <div class="wechat" @click="share">
        <img class="icon icon-wechat" src="./assets/icon-wechat.png" alt="">
        <span class="label">分享微信</span>
      </div>
    </div>
  </van-overlay>
</template>
<script>
import { Overlay } from 'vant'
export default {
  name: 'loading',
  components: {
    [Overlay.name]: Overlay
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    save() {
      alert('save')
    },
    share() {
      alert('share')
    }
  }
}
</script>
<style lang="scss" scoped>
.overLay {
  .img-area {
    position: absolute;
    top: 68px;
    left: 80px;
    width: 590px;
    height: 990px;
    background: #ffffff;
    border-radius: 20px;
  }
  .btn-area {
    position: absolute;
    display: flex;
    left: 0;
    bottom: 68px;
    align-items: center;
    justify-content: center;
    width: 100%;
    .saveImg, .wechat {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon {
        margin-bottom: 20px;
        width: 90px;
        height: 90px;
      }
      .label {
        font-size: 24px;
        color: #fff;
      }
    }
    .wechat {
      margin-left: 112px;
    }
    
  }
}
</style>
