<template>
  <div class="container-birthdayCard">
    <div class="bg-page"></div>
    <van-swipe class="my-swipe" :vertical="true" :show-indicators="false" :loop="false">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <img class="img-bg" v-lazy="item.backgroundImg" alt="">
        <div class="btn-arrow">
          滑动解锁更多精彩
          <div class="icon-arrow"></div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import { EmployeeWishByCompany } from './service'
import utils from './../../common/util'
export default {
  components: {
    [Swipe.name]:  Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      id: utils.getPara('id'),
      UserId: utils.getPara('UserId'),
      wishType: utils.getPara('wishType'),
      list: []
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
          const TWEET_IMG = resData.TWEET_IMG // 封面
          const COPY_LIST = resData.COPY_LIST // 祝福语
          const CARD_BACKGROUND = resData.CARD_BACKGROUND // 贺卡背景
          const COLLEAGUES_BLESSING_LIST = resData.COLLEAGUES_BLESSING_LIST // 同事祝福
          TWEET_IMG && TWEET_IMG.forEach(tweet => {
            this.list.push({
              backgroundImg: tweet.URL
            })
            this.list.push({
              backgroundImg: tweet.URL
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
    .img-bg {
      width: 100%;
      height: 100%;
    }
    .btn-arrow {
      position: absolute;
      bottom: 84px;
      left: 50%;
      margin-left: -116px;
      width: 232px;
      font-size: 28px;
      color: #fff;
      text-align: center;
      line-height: 50px;
      .icon-arrow {
        position: absolute;
        bottom: -28px;
        left: 50%;
        margin-left: -17px;
        width: 34px;
        height: 15px;
        background: url(./assets/icon-arrow.png) no-repeat center center;
        background-size: cover;
        animation: arrow .6s ease-in-out infinite alternate;
      }
    }
  }
  
}
@keyframes arrow {
  100% {
    bottom: -50px;
  }
}
</style>