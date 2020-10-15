<template>
  <div class="container-birthdayCard">
    <div class="bg-page"></div>
    <van-swipe class="my-swipe" :vertical="true" :show-indicators="false" :loop="false">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <div class="btn-arrow" v-if="index ==  0">
          滑动解锁更多
          <div class="icon-arrow"></div>
        </div>
        <img class="img-bg" v-lazy="item" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import utils from './../../common/util'
export default {
  components: {
    [Swipe.name]:  Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
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
      for(let i=1;i<=10;i++) {
        this.list.push('http://bpic.588ku.com/back_list_pic/19/11/26/a54f7b66f962db3d832017b600431123.jpg!/fw/320/quality/90/unsharp/true/compress/true')
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
      color: #FFEDB7;
      text-align: center;
      line-height: 50px;
      .icon-arrow {
        position: absolute;
        bottom: -28px;
        left: 50%;
        margin-left: -17px;
        width: 34px;
        height: 15px;
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