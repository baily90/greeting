<template>
  <div class="container-receivedWishes">
    <div class="bg-page"></div>
    <div class="list-data" v-if="list && list.length">
      <div class="item-data" v-for="(data, dataIndex) in list" :key="dataIndex">
        <div class="date">{{data.date}}</div>
        <div class="list-wishes" v-if="data.list && data.list.length">
          <div class="item-wishes" v-for="(item, index) in data.list" :key="index">
            <div class="img-wrap">
              <img src="https://pics.lvjs.com.cn/pics/super/2020/09/1601285985_16800.jpg" alt="">
            </div>
            <div class="first-title">在这个特别的日子，祝福您生日快乐！</div>
            <div class="second-title">您的同事生日快到了，快快送上你的祝福吧！</div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: [{
        date: '2020-09-12 12:00',
        list: [1]
      }]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {}
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
  .list-data {
    .item-data {
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
      .list-wishes {
        .item-wishes {
          margin-top: 40px;
          width: 100%;
          height: 452px;
          background: #FFFFFF;
          border-radius: 10px;
          overflow: hidden;
          text-align: center;
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
            font-size: 32px;
            color: #1F1F1F;
            line-height: 44px;
            font-weight: bolder;
          }
          .second-title {
            margin-top: 25px;
            font-size: 28px;
            color: #888888;
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>