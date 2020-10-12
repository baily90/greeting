<template>
  <div class="loading">
    <van-overlay :show="isShow" class-name="overLay">
      <div class="loading-content">
        <van-loading color="#fff" />
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { Overlay, Loading } from 'vant'
export default {
  name: 'loading',
  components: {
    [Overlay.name]: Overlay,
    [Loading.name]: Loading
  },
  data () {
    return {
      isShow: false
    }
  }
}
</script>
<style lang="scss" scoped>
.overLay {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  .loading-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }
}
</style>
