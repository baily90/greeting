<template>
  <div class="container-searchFocus">
    <div class="bg-page"></div>
    <div class="search-box">
      <div class="search">
        <div class="input-area">
          <img class="icon-search" src="./assets/icon-search.png" alt="">
          <input v-focus type="text" placeholder="输入同事姓名/工号">
        </div>
        <div class="btn-area">
          <!-- <span class="btn-search">搜索</span> -->
          <img class="btn-clear" src="./assets/icon-clear.png" alt="">
        </div>
      </div>
    </div>
    <div class="list-search" v-if="list && list.length">
      <div class="item-search" v-for="(item, index) in list" :key="index">
        <div class="info-focus">
            <div class="name">张三</div>
            <div class="base">（1091891 研发组）</div>
        </div>
        <div class="btn-focus">已关注</div>
      </div>
    </div>
    <div class="empty" v-if="!list || !list.length">
      <img class="icon-empty" src="./assets/icon-empty.png" alt="">
      暂无搜索记录
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {

    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      },
      update: function(el) {
        el.focus()
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
input {
  border: none;
  font-size: 28px;
  color: #333333;
}
::-webkit-input-placeholder {
  color: #dddddd;
}

:-ms-input-placeholder {
  color: #dddddd;
}

::-moz-placeholder {
  color: #dddddd;
}

:-moz-placeholder {
  color: #dddddd;
}
.container-searchFocus {
  padding: 128px 0 48px;
  .bg-page {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: -1;
    background-color: #F6F6F6;
  }
  .search-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 128px;
    padding: 24px;
    background-color: #F6F6F6;
    .search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 80px;
      padding: 0 30px 0 20px;
      background: #FFFFFF;
      border-radius: 10px;
      .input-area {
        display: flex;
        align-items: center;
        .icon-search {
          margin-right: 6px;
          width: 36px;
          height: 36px;
        }
        input {
          width: 400px;
          height: 40px;
          line-height: 40px;
        }
      }
      .btn-area {
        display: flex;
        align-items: center;
        .btn-search {
          font-size: 28px;
          color: #284B7E;
        }
        .btn-clear {
          width: 36px;
          height: 36px;
        }
      }
      
    }
  }
  .list-search {
    margin: 0 auto;
    width: 702px;
    padding: 0 24px;
    background: #FFFFFF;
    border-radius: 10px;
    .item-search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 98px;
      border-bottom: 1px solid #EDEDED;
      &:last-child {
        border: 0;
      }
      .info-focus {
        display: flex;
        align-items: center;
        .name {
          font-size: 30px;
          color: #333333;
          line-height: 42px;
          font-weight: bolder;
        }
        .base {
          font-size: 24px;
          color: #333333;
          line-height: 34px;
        }
      }
      .btn-focus {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 46px;
        font-size: 24px;
        color: #B7B7B7;
        border: 1px solid #DADAD9;
        &.act {
          border: 1px solid #FFC844;
          background: #FFC844;
          color: #fff;
        }
      }
    }
  }
  .empty {
    margin: 132px auto 0;
    width: 270px;
    text-align: center;
    font-size: 28px;
    color: #BDC7D3;
    line-height: 40px;
    .icon-empty {
      margin-bottom: 40px;
      width: 270px;
      height: 270px;
    }
  }
}
</style>