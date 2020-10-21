<template>
  <div class="container-birthdayCard">
    <div class="bg-page"></div>
    <van-swipe class="my-swipe" ref="swipe" :vertical="true" :show-indicators="false" :loop="false" @change="change">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <!-- <div class="backgroundImg" v-lazy:background-image="item.backgroundImg"></div> -->
        <div class="btn-arrow" @click="next">
          滑动解锁更多精彩
          <div class="icon-arrow"></div>
        </div>
        <div class="copy-content" v-if="item.copy">
          {{item.copy}}
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 分享弹窗 -->
    <Share :isShow="isShowShareDialog"></Share>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import Share from './../../components/Share'
import { EmployeeWishByCompany } from './service'
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
      UserId: utils.getPara('UserId'),
      wishType: utils.getPara('wishType'),
      list: [],
      isShowShareDialog: false
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
    },
    async EmployeeWishByCompany () {
      try {
        const {data} = await EmployeeWishByCompany({id:this.id,UserId:this.UserId,wishType:this.wishType})
        if(data && data.ResultCode == 0) {
          const resData = data.Data
          const COPY_LIST = resData.COPY_LIST // 祝福语
          const CARD_BACKGROUND = resData.CARD_BACKGROUND // 贺卡背景
          const COLLEAGUES_BLESSING_LIST = resData.COLLEAGUES_BLESSING_LIST // 同事祝福
          CARD_BACKGROUND  && CARD_BACKGROUND.forEach((blessing, index) =>  {
            this.list.push({
              copy: COPY_LIST && COPY_LIST[index] && COPY_LIST[index].COPY,
              backgroundImg: blessing.URL
            })
            this.list.push({
              copy: COPY_LIST && COPY_LIST[index] && COPY_LIST[index].COPY,
              backgroundImg: blessing.URL
            })
          })
          COLLEAGUES_BLESSING_LIST  && COLLEAGUES_BLESSING_LIST.forEach(blessing =>  {
            this.list.push({
              backgroundImg: blessing.CARD_BACKGROUND
            })
          })
        }
      } catch (error) {
        console.log('FocusList接口异常'+error)
      }
    },
    change(index) {
      console.log(index)
    },
    next() {
      this.$refs.swipe.next()
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
      color: #5e678b;
      text-align: center;
      line-height: 50px;
      .icon-arrow {
        position: absolute;
        bottom: -10px;
        left: 50%;
        width: 20px;
        height: 20px;
        border-left: 1px solid #5e678b;
        border-bottom: 1px solid #5e678b;
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
      color: #762400;
      line-height: 48px;
      background: rgba(255,255,255,.9);
      box-shadow: 0px 4px 12px rgba(191, 107, 107, 0.16);
    }
  }
  
}
@keyframes arrow {
  100% {
    bottom: -30px;
  }
}
</style>