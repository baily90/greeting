<template>
  <div class="city-container">
    <div class="city-left">
      <div class="city-localCity" v-show="currentCityName">当前定位城市</div>
      <div class="city-local city-item" v-show="currentCityName">
        <span class="city-local-cityName" @click="handleLocal">{{
          currentCityName
        }}</span>
        <span class="city-reverse" @click="getLocation">重新定位</span>
      </div>
      <div v-for="(city, index) in citys" :key="'city' + index">
        <div class="city-item" :id="city.letter">{{ city.letter }}</div>
        <div
          class="city-item city-white"
          v-for="(item, index1) in city.letterArr"
          :key="'item' + index1"
          @click="handleSelectCity(item)"
        >
          {{ item.cityName }}
        </div>
      </div>
    </div>
    <div class="city-right">
      <div>
        <div
          class="city-right-item"
          v-for="(city, index) in citys"
          :key="'cityright' + index"
          @click="handleShowleft(city)"
        >
          {{ city.letter }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axiosWrap from "../../common/axiosWrap";
import apis from "../../common/apis";
export default {
  name: "App",
  data() {
    return {
      citys: [],
      currentCityName: "",
    };
  },
  props: {
    // isFrom: Boolean,
  },
  components: {},
  created() {
    this.getCity();
    this.getLocation();
  },
  methods: {
    getLocation() {
      const self = this;
      axiosWrap
        .get(
          apis.getUrls().getLoccalPosition +
            "?weixinUrl=http://air.nongnet.net/fontEnd/city/index/"
        )
        .then(({ data }) => {
          if (data.code == 200) {
            wx.config({
              debug: false,
              appId: "wxda895d77d257c917",
              timestamp: data.data.timestamp,
              nonceStr: data.data.nonceStr,
              signature: data.data.signature,
              jsApiList: [
                "checkJsApi",
                // 所有要调用的 API 都要加到这个列表中
                "getLocation",
              ],
            });
            wx.ready(function () {
              wx.getLocation({
                success: function (res) {
                  var geocoder = new qq.maps.Geocoder({
                    complete: function (result) {
                      self.currentCityName =
                        result.detail.addressComponents.city;
                    },
                  });
                  var coord = new qq.maps.LatLng(res.latitude, res.longitude);
                  geocoder.getAddress(coord);
                },
                cancel: function (res) {
                  // alert("用户拒绝授权获取地理位置");
                },
              });
            });
          }
        });
    },
    getCity() {
      axiosWrap.get(apis.getUrls().getCity).then((data) => {
        console.log(data);
        if (data.data.code == 200) {
          var list = data.data.data,
            newList = [];
          this.list = list;
          list.forEach((item) => {
            if (newList.length == 0) {
              newList.push({
                letter: item.initial,
                letterArr: [item],
              });
            } else {
              if (item.initial == newList[newList.length - 1].letter) {
                newList[newList.length - 1].letterArr.push(item);
              } else {
                newList.push({
                  letter: item.initial,
                  letterArr: [item],
                });
              }
            }
          });
          this.citys = newList;
          console.log(newList);
        }
      });
    },
    handleSelectCity(city) {
      console.log("选择的信息", city);
      this.$emit("city-info", city);
    },
    handleShowleft(city) {
      console.log(city);
      document.getElementById(city.letter).scrollIntoView();
    },
    handleLocal() {
      console.log(this.list);
      this.list.forEach((item) => {
        if (item.cityName == this.currentCityName) {
          this.$emit("city-info", item);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.city-container {
  background: f8f8f8;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.city-left {
  height: 100%;
  width: 100%;
  margin-left: 30px;
  overflow-y: scroll;
}
.city-right {
  height: 100%;
  display: flex;
  align-items: center;
}
.city-right-item {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  width: 50px;
  color: #aaaaaa;
}
.city-localCity {
  height: 87px;
  line-height: 87px;
  font-size: 28px;
  color: #aaaaaa;
}
.city-local {
  padding: 0 20px;
  display: flex;
  background: #ffffff;
  justify-content: space-between;
}
.city-local-cityName {
  font-size: 30px;
  font-weight: bold;
}
.city-reverse {
  font-size: 24px;
  color: #fec200;
}
.city-item {
  height: 88px;
  line-height: 88px;
  padding: 0 20px;
  font-size: 30px;
}
.city-white {
  background: #ffffff;
}
</style>