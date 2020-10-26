<template>
  <div class="container-receivedWishes">
    <div class="bg-page"></div>
    <div class="list-wishes" v-if="list && list.length">
      <div class="item-wishes" v-for="(item, index) in list" :key="index" @click="go2Card(item)">
        <div class="date">{{item.SEND_TIME}}</div>
        <div class="content-wishes">
          <div class="img-wrap">
            <img :src="item.URL" alt="">
          </div>
          <div class="first-title">{{item.TWEET_TITLE}}</div>
          <div class="second-title">{{item.TWEET_CONTENT}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from './../../common/util'
import { EmployeeWishHistoryList } from './service'
export default {
  components: {},
  data() {
    return {
      loginUserId: utils.getPara('loginUserId'),
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
      this.EmployeeWishHistoryList()
    },
    async EmployeeWishHistoryList() {
      try {
        const {data} = await EmployeeWishHistoryList({loginUserId:this.loginUserId,wishType:'YEAR',sendType:2})
        if(data && data.ResultCode == 0) {
          this.list = data.Data
        }
      } catch (error) {
        console.log('EmployeeWishHistoryList接口异常'+error)
      }
    },
    go2Card(obj) {
      location.href = `${this.host}/card?id=${obj.ROW_ID}`
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
.container-receivedWishes {
  padding: 0 36px 48px;
  .bg-page {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: -1;
    background-color: #F6F6F6;
  }
  .list-wishes {
    .item-wishes {
      margin-top: 20px;
      &:first-child {
        margin: 0;
      }
      .date {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 114px;
        font-size: 24px;
        color: #9A9A9A;
        line-height: 34px;
      }
      .content-wishes {
          width: 100%;
          padding-bottom: 36px;
          background: #FFFFFF;
          border-radius: 10px;
          overflow: hidden;
          &:first-child {
            margin: 0;
          }
          .img-wrap {
            width: 100%;
            height: 290px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .first-title {
            margin-top: 16px;
            padding: 0 40px;
            font-size: 32px;
            color: #1F1F1F;
            line-height: 44px;
            font-weight: bolder;
          }
          .second-title {
            margin-top: 25px;
            padding: 0 40px;
            font-size: 28px;
            color: #888888;
            line-height: 40px;
          }
        }
    }
  }
}
</style>