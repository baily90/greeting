<template>
  <div class="container-birthdayCard">
    <div class="bg-page"></div>
    <van-swipe class="my-swipe" ref="swipe" :vertical="true" :show-indicators="false" :loop="false" @change="change">
      <van-swipe-item v-for="(item, index) in list" :key="index" :class="{'year':wishType=='YEAR', 'birthday':wishType=='BIRTHDAY'}">
        <!-- 贺卡当前页背景图片 -->
        <div class="backgroundImg" v-lazy:background-image="item.backgroundImg"></div>
        <!-- 贺卡底部下滑动画 -->
        <div class="btn-arrow" v-if="index != list.length-1" @click="next">
          滑动解锁更多精彩
          <div class="icon-arrow"></div>
        </div>
        <!-- 贺卡祝福文案 -->
        <div class="copy-content" v-if="item.type == 'card' && item.copy" v-html="item.copy"></div>
        <!-- 同事祝福 -->
        <div class="wishes-content" v-if="item.type=='wish' && item.copy">
          <div class="name"><span>{{item.copy.EMPLOYEE_NAME}}</span>送上祝福:</div>
          <div class="wish" v-html="item.copy.BLESSING_CONTENT"></div>
          <div class="gift">
            <img :src="item.copy.GIFT" alt="">
          </div>
          <div class="btn-share" v-if="item.isLastPage" @click="toggleShowShareDialog">炫耀一下</div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 合成分享图片 -->
    <div id="share-poster" :class="{'year':wishType=='YEAR', 'birthday':wishType=='BIRTHDAY'}" ref="poster" @click.stop>
      <img :src="shareInfo.URL" width="100%" height="100%" alt="">
      <div class="content-wrap">
        <div class="content" v-html="shareInfo.COPY">
        </div>
      </div>
    </div>
    <!-- 分享弹窗 -->
    <Share :isShow.sync="isShowShareDialog" :share="shareInfo" :wishType="wishType" @save="save" @share="share"></Share>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Toast } from 'vant'
import Share from './components/Share'
import { EmployeeWishByCompany, shareParam } from './service'
import utils from './../../common/util'
export default {
  components: {
    Share,
    [Swipe.name]:  Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      id: utils.getPara('id'),
      wishType: '',
      shareInfo: {},
      list: [],
      isShowShareDialog: false,
      RECEIVER_NAME: ''
    }
  },
  computed:  {
    host() {
      return utils.hostRefect()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.EmployeeWishByCompany()
      this.initShareParam()
    },
    async initShareParam() {
      const { data } = await shareParam({url: location.href})
      if(data && data.ResultCode == 0) {
        const { appId, timestamp, nonceStr, signature } = data.Data
        wx.config({
          beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，企业微信的corpID
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature,// 必填，签名，见附录1
          jsApiList: ['shareWechatMessage', 'saveImageToPhotosAlbum'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
      }
    },
    async EmployeeWishByCompany () {
      try {
        const {data} = await EmployeeWishByCompany({id:this.id})
        if(data && data.ResultCode == 0) {
          const resData = data.Data
          const COPY_LIST = resData.COPY_LIST // 祝福语
          const CARD_BACKGROUND = resData.CARD_BACKGROUND // 贺卡背景
          const COLLEAGUES_BLESSING_LIST = resData.COLLEAGUES_BLESSING_LIST // 同事祝福
          const MEDAL_LIST = resData.MEDAL_LIST // 勋章
          const YEAR_COUNT = resData.YEAR_COUNT // 工龄-年
          const DAY_COUNT = resData.DAY_COUNT // 工龄-日
          const INDATE = resData.INDATE // 入职日期
          this.RECEIVER_NAME = resData.RECEIVER_NAME // 接受者姓名
          const shareInfo = resData.shareInfo // 分享信息
          this.wishType = resData.WISH_TYPE  //贺卡类别

          // 分享信息处理
          if(shareInfo && shareInfo.COPY) {
            shareInfo.COPY = shareInfo.COPY.replaceAll('|', '<br/>').replaceAll('[NAME]', this.RECEIVER_NAME)
            shareInfo.shareDesc = shareInfo.COPY.replaceAll('|', '').replaceAll('[NAME]', this.RECEIVER_NAME)
          }
          this.shareInfo = shareInfo

          // 勋章处理
          let medal = '<div style="display:flex;flex-wrap:wrap;width:100%">'
          MEDAL_LIST && MEDAL_LIST.forEach((item, index) => {
            medal += `<img style="margin-top:0.16rem;margin-right:0.16rem;width:1.33rem;height:1.33rem" src="${item.medal_url}">`
          })
          medal += `</div>`

          // 祝福处理
          COPY_LIST && COPY_LIST.map(item => {
            // 处理 | [YEAR] [DAY] [INDATE] [MEDALLIST]
            item.COPY = item.COPY.replaceAll('|', '<br/>')
              .replaceAll('[YEAR]', YEAR_COUNT)
              .replaceAll('[DAY]', DAY_COUNT)
              .replaceAll('[INDATE]', INDATE)
              .replaceAll('[MEDALLIST]', medal)
            return item
          })
          CARD_BACKGROUND  && CARD_BACKGROUND.forEach((blessing, index) =>  {
            this.list.push({
              type: 'card',
              copy: COPY_LIST && COPY_LIST[index] && COPY_LIST[index].COPY,
              backgroundImg: blessing.URL
            })
          })
          COLLEAGUES_BLESSING_LIST  && COLLEAGUES_BLESSING_LIST.forEach((blessing, index) =>  {
            blessing.BLESSING_CONTENT = blessing.BLESSING_CONTENT.replaceAll('|', '<br/>')
            this.list.push({
              type: 'wish',
              copy: blessing,
              backgroundImg: blessing.CARD_BACKGROUND,
              isLastPage: index === COLLEAGUES_BLESSING_LIST.length-1
            })
          })
        }
      } catch (error) {
        console.log('FocusList接口异常'+error)
      }
    },
    toggleShowShareDialog() {
      this.isShowShareDialog = !this.isShowShareDialog
    },
    next() {
      this.$refs.swipe.next()
    },
    /**
     * 保存图片
     */
    save(imgUrl) {
      alert(JSON.stringify(wx.saveImageToPhotosAlbum))
    },
    /**
     * 分享图片
     */
    share(imgUrl) {
      // 企业微信不支持仅分享图片，以下为分享图文链接
      wx.invoke('shareWechatMessage', 
      {
        title: `${this.RECEIVER_NAME}-${this.wishType == 'BIRTHDAY' ? '生日' : '周年'}贺卡`, // 分享标题
        desc: this.shareInfo.shareDesc, // 分享描述
        link: location.href, // 分享链接
        imgUrl, // 分享封面
      }, res => {
        if (res.err_msg == "shareWechatMessage:ok") {
          Toast('分享成功')
        }else if(res.err_msg == "shareWechatMessage:cancel") {
          Toast('取消分享')
        }else {
          Toast('分享失败')
        }
      }
);
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
.container-birthdayCard {
  .bg-page {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: -1;
    background-color: #F6F6F6;
  }
  .my-swipe {
    height: 100vh;
    .backgroundImg {
      width: 100%;
      height: 100%;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .btn-arrow {
      position: absolute;
      bottom: 84px;
      left: 50%;
      margin-left: -116px;
      width: 232px;
      font-size: 28px;
      text-align: center;
      line-height: 50px;
      .icon-arrow {
        position: absolute;
        bottom: -10px;
        left: 50%;
        width: 20px;
        height: 20px;
        transform: rotate(-45deg) translateX(-50%);
        animation: arrow .6s ease-in-out infinite alternate;
      }
    }
    .copy-content {
      position: absolute;
      top: 42px;
      left: 36px;
      width: 420px;
      padding: 26px 32px 24px 26px;
      font-size: 24px;
      line-height: 48px;
      background: rgba(255,255,255,.9);
      box-shadow: 0px 4px 12px rgba(191, 107, 107, 0.16);
    }
    .wishes-content {
      position: absolute;
      top: 48px;
      left: 56px;
      width: 640px;
      height: 1130px;
      padding: 38px 58px;
      background: rgba(255,255,255,.7);
      border: 10px;
      .name {
        display: flex;
        align-items: flex-end;
        width: 100%;
        font-size: 28px;
        span {
          font-size: 48px;
          font-weight: bolder;
        }
      }
      .wish {
        margin-top: 24px;
        font-size: 28px;
      }
      .gift {
        display: flex;
        justify-content: center;
        margin-top: 102px;
        width: 100%;
        height: 100%;
        img {
          width: 440px;
          height: 440px;
        }
      }
      .btn-share {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 58px;
        left: 152px;
        width: 336px;
        height: 88px;
        background: #FF8A41;
        font-size: 36px;
        color: #fff;
      }
    }
  }

  #share-poster {
    position: absolute;
    top: 68px;
    left: 80px;
    width: 590px;
    height: 890px;
    background: #efefef;
    border-radius: 20px;
    z-index: -2;
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

  .year {
    .btn-arrow {
      color: #fff;
      .icon-arrow {
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
      }
    }
    .copy-content {
      color: #005683;
    }
    .wishes-content {
      color: #005683;
    }
  }
  .birthday {
    .btn-arrow {
      color: #5e678b;
      .icon-arrow {
        border-left: 1px solid #5e678b;
        border-bottom: 1px solid #5e678b;
      }
    }
    .copy-content {
      color: #762400;
    }
    .wishes-content {
      color: #E29C55;
    }
  }
}
@keyframes arrow {
  100% {
    bottom: -30px;
  }
}
</style>