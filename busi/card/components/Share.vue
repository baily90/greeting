<template>
  <van-overlay :show="show" class-name="overLay" :lock-scroll="false" @click="overlayAutoClose">
    <div class="shareImg">
      <img v-if="imgUrl" :src="imgUrl" width="100%" height="100%" alt="">
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
    wishType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      imgUrl: ''
    }
  },
  created() {
    this.show =  this.isShow
  },
  watch: {
    isShow (val) {
      this.show = val
      this.$emit('update:isShow', val)
      if(val) {
        this.$nextTick(() => {
          this.EmployeeCareUploadFile()
        })
      }else {
        this.imgUrl = ''
      }
    }
  },
  methods: {
    posterHandler(type) {
      console.log(type)
    },
    async EmployeeCareUploadFile() {
      const canvas = await html2canvas(document.getElementById('share-poster'), {allowTaint: true,useCORS: true,backgroundColor: "transparent" })
      let base64Url = canvas.toDataURL('image/png')
      base64Url = base64Url.substring(base64Url.indexOf('base64,')+7,base64Url.length)
      const requestData = {file:base64Url,file_name:`poster_${this.wishType}.png`}
      const {data} = await EmployeeCareUploadFile(requestData)
      if(data && data.ResultCode == 0) {
        this.imgUrl = data.Data
        console.log(this.imgUrl)
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
  .shareImg {
    position: absolute;
    top: 68px;
    left: 80px;
    width: 590px;
    height: 890px;
    // background: #efefef;
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
