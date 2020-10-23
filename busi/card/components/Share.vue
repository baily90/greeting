<template>
  <van-overlay :show="show" class-name="overLay" :lock-scroll="false" @click="overlayAutoClose">>
    <div class="img-area" :class="{'year':wishType=='YEAR', 'birthday':wishType=='BIRTHDAY'}" ref="poster" @click.stop>
      <img :src="share.URL" width="100%" height="100%" alt="">
      <div class="content-wrap">
        <div class="content" v-html="share.COPY">
          <!-- <div class="name">亲爱的xxx</div>
          <div class="wish">生日快乐</div>
          <div class="value">框架哎开始将大幅和 挨家考了多少分</div> -->
        </div>
      </div>
    </div>
    <div class="btn-area" @click.stop>
      <div class="saveImg" @click="posterHandler('save')">
        <img class="icon icon-saveImg" src="./../assets/icon-saveImg.png" alt="">
        <span class="label">保存图片</span>
      </div>
      <div class="wechat" @click="posterHandler('share')">
        <img class="icon icon-wechat" src="./../assets/icon-wechat.png" alt="">
        <span class="label">分享微信</span>
      </div>
    </div>
  </van-overlay>
</template>
<script>
import { EmployeeCareUploadFile } from './../service'
import { Overlay } from 'vant'
import html2canvas from 'html2canvas'
export default {
  name: 'loading',
  components: {
    [Overlay.name]: Overlay
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    share: {
      type: Object,
      default() {
        return {}
      }
    },
    wishType: {
      type: String,
      default: ''
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
    posterHandler(type) {
      this.EmployeeCareUploadFile(type)
    },
    async EmployeeCareUploadFile(type) {
      const canvas = await html2canvas(this.$refs.poster, {allowTaint: true,useCORS: true,backgroundColor: "transparent" })
      let base64Url = canvas.toDataURL('image/png')
      base64Url = base64Url.substring(base64Url.indexOf('base64,')+7,base64Url.length)
      const requestData = {file:base64Url,file_name:`poster_${this.wishType}.png`}
      const {data} = await EmployeeCareUploadFile(requestData)
      if(data && data.ResultCode == 0) {
        const imgUrl = data.Data
        console.log(imgUrl)
      }
    },
    overlayAutoClose () {
      this.$emit('update:isShow', false)
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.overLay {
  .img-area {
    position: absolute;
    top: 68px;
    left: 80px;
    width: 590px;
    height: 990px;
    background: #ffffff;
    border-radius: 20px;
    .content-wrap {
      position: absolute;
      top: 0;
      left: 80px;
      width: 430px;
      padding: 0 20px 20px;
      background: rgba(255,255,255,.3);
      border-radius: 0 0 20px 20px;
      .content {
        width: 100%;
        padding: 30px;
        background: rgba(255,255,255,.8);
        border-radius: 0 0 20px 20px;
        .name {
          font-size: 24px;
          line-height: 48px;
          font-weight: bolder;
        }
        .wish {
          margin-top: 12px;
          font-size: 48px;
          line-height: 88px;
          font-weight: bolder;
        }
        .value {
          margin-top: 12px;
          font-size: 24px;
          line-height: 48px;
        }
      }
    }
    &.year {
      .content-wrap {
        .content {
          color: #762400;
        }
      }
    }
    &.birthday {
      .content-wrap {
        .content {
          color: #1E1F60;
        }
      }
    }
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
