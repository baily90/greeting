<template>
  <van-overlay :show="show" class-name="overLay" :lock-scroll="false" @click="overlayAutoClose">>
    <div class="img-area" @click.stop>
      <!-- <img src="./assets/icon.png" width="100%" height="100%" alt=""> -->
    </div>
    <div class="btn-area" @click.stop>
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
      show: false
    }
  },
  created() {
    this.show =  this.isShow
  },
  watch: {
    isShow (val) {
      this.show = val
      this.$emit('update:isShow', val)
    }
  },
  methods: {
    save() {
      alert('save')
    },
    share() {
      alert('share')
    },
    overlayAutoClose () {
      this.$emit('update:isShow', false)
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
