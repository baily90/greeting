<template>
  <div id="destroute_datePicker">
    <section class="m-dp-day" :class="{ 'ios-header1': source }">
      <div>日</div>
      <div>一</div>
      <div>二</div>
      <div>三</div>
      <div>四</div>
      <div>五</div>
      <div>六</div>
    </section>
    <article class="g-dp-bd" :class="{ 'ios-header2': source }">
      <section class="m-dp-date" v-for="month in monthInfo">
        <p>{{ month.yearMonth }}</p>
        <div class="m-dp-d">
          <span v-for="spaceBegin in month.startDayList"></span>
          <span
            v-for="day in month.dayList"
            :class="day.style"
            @click="selectDate(day)"
            >{{ day.day }}<i v-if="day.price">{{ day.price }}</i
            ><i>{{ day.qi }}</i></span
          >
          <span v-for="spaceEnd in month.endDayList"></span>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      source: false,
      monthInfo: [], //最后整合假期，价格日历表后月份的数组，用于循环
      showCalendarLength: ""
    };
  },

  props: {
    //要显示的月数
    showMonthLength: {
      default: 6
    },

    //传入的日历价格数组
    PriceCalendarArr: {
      type: Array,
      default() {
        return [];
      }
    },

    //传入的假期数组
    vacationArr: {
      type: Array,
      default() {
        return [];
      }
    },

    //要选中的日期（yy-mm-dd）
    selectedDate: {
      type: String
    }
  },
  methods: {
    //整合月份数据
    initDate() {
      console.log("传进来的值是：", this.selectedDate);
      this.showCalendarLength = this.showMonthLength;
      let now = new Date();
      let today = [now.getFullYear(), now.getMonth() + 1, now.getDate()]; //[yyyy,mm,dd]
      let startDay; //第一天有效日期[yyyy,mm,dd]
      if (this.PriceCalendarArr.length > 0) {
        startDay = this.PriceCalendarArr[0].specDate.split(" ")[0].split("-"); //第一天有效日期[yyyy,mm,dd]
        var endDay = this.PriceCalendarArr[
          this.PriceCalendarArr.length - 1
        ].specDate
          .split(" ")[0]
          .split("-"); //最后一天有效日期[yyyy,mm,dd]
        this.showCalendarLength =
          (parseInt(endDay[0]) - parseInt(startDay[0])) * 12 +
          parseInt(endDay[1]) -
          parseInt(startDay[1]) +
          1; //应该显示几个月份
      } else {
        startDay = today; //第一天有效日期[yyyy,mm,dd]
      }

      //节假日
      let vacationData, vacationDataList;
      if (this.vacationArr.length > 0) {
        vacationDataList = this.vacationArr.filter(function(vacation) {
          return vacation.flag == "休";
        });
        vacationData = vacationDataList.map(function(vacationData) {
          return vacationData.date;
        });
      } else {
        vacationData = [];
      }

      let dateListIndex = 0;
      for (let i = 0; i < this.showCalendarLength; i++) {
        let monthList = {},
          nowMonth;
        if (+startDay[1] + i < 13) {
          //未跨年
          nowMonth = +startDay[1] + i;
          monthList.year = +startDay[0];
        } else {
          //跨年
          nowMonth = +startDay[1] + i - 12;
          monthList.year = +startDay[0] + 1;
        }

        //初始化信息
        monthList.month = nowMonth;
        monthList.days = new Date(monthList.year, nowMonth, 0).getDate();
        monthList.firstWeek = new Date(
          monthList.year,
          nowMonth - 1,
          1
        ).getDay();
        monthList.yearMonth = monthList.year + "年" + monthList.month + "月";

        //开始的空白
        let startDayList = [];
        for (let k = 0; k < monthList.firstWeek; k++) {
          let dayItem = {};
          startDayList.push(dayItem);
        }
        monthList.startDayList = startDayList;

        //中间的有值
        let dayList = [];
        for (let j = 1; j <= monthList.days; j++) {
          var dayItem = {};
          dayItem.date = "";
          dayItem.price = "";
          dayItem.style = "";
          dayItem.qi = "";

          //日期格式化 loopDate [yyyy-mm-dd]
          var LoopDate = "";
          if (monthList.month < 10) {
            LoopDate = monthList.year + "-0" + monthList.month;
          } else {
            LoopDate = monthList.year + "-" + monthList.month;
          }

          if (j < 10) {
            LoopDate = LoopDate + "-0" + j;
          } else {
            LoopDate = LoopDate + "-" + j;
          }

          dayItem.date = LoopDate;
          if (LoopDate == this.selectedDate) {
            dayItem.style = "selected";
          }

          //显示的时间 TODO 假日
          if (
            today[0] == monthList.year &&
            today[1] == monthList.month &&
            today[2] == j
          ) {
            dayItem.day = "今天";
          } else {
            dayItem.day = j;
          }

          //显示的价格 以及样式
          if (this.PriceCalendarArr.length > 0) {
            if (
              dateListIndex < this.PriceCalendarArr.length &&
              LoopDate == this.PriceCalendarArr[dateListIndex].specDate
            ) {
              dayItem.style += " usable hasPrice";
              dayItem.price = this.PriceCalendarArr[dateListIndex].sellPrice;
              dayItem.qi = "起";
              dateListIndex++;
            }
          } else {
            if (
              new Date(monthList.year, monthList.month - 1, j) >=
              new Date(now.getFullYear(), now.getMonth(), now.getDate())
            ) {
              dayItem.style += " usable";
            }
          }

          //节假日
          if (vacationData.length > 0) {
            if (vacationData.indexOf(LoopDate) > -1) {
              if (dayItem.style != "") {
                dayItem.style += " isVocRest";
              }
              vacationDataList.forEach(function(vacation) {
                if (
                  vacation.date == LoopDate &&
                  vacation.name != "" &&
                  dayItem.day != "今天"
                ) {
                  dayItem.day = vacation.name;
                }
              });
            }
          }
          dayList.push(dayItem);
        }
        monthList.dayList = dayList;

        //尾部的空白
        var endDayList = [];
        var endDayLength = 7 - ((monthList.days + monthList.firstWeek) % 7);
        if (endDayLength != 7) {
          for (var p = 0; p < endDayLength; p++) {
            var dayItem = {};
            endDayList.push(dayItem);
          }
        }
        monthList.endDayList = endDayList;

        //最终的结果
        this.monthInfo.push(monthList);
      }
    },

    isClient() {
      /* 1 为客户端 其余为非客户端*/
      const agent = navigator.userAgent;
      if (agent.indexOf("LVMM") > 0) {
        return "1";
      }
      return "0";
    },

    //点击日期处理方法，并向父组件pop selectDate事件
    selectDate(day) {
      if (day.style.indexOf("usable") > -1) {
        if (!!document.querySelector(".selected")) {
          document.querySelector(".selected").classList.remove("selected");
        }
        let $target = event.currentTarget;
        $target.classList.add("selected");
        this.$emit("selectDate", day);
      } else {
        return;
      }
    },

    loadScript(src, callback) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.onload = function() {
        if (callback && callback instanceof Function) {
          callback();
        }
      };
      document.body.appendChild(script);
    },
    setAppTitle(title) {
      window.NativeUtil.lvCommon("lvJSShowNativeNavigationBar", {
        animate: "0"
      });
      var titleparam = {
        title: title
      };
      window.NativeUtil.lvCommon("lvJSSetTitle", titleparam);
      window.NativeUtil.lvCommon("lvJSSetNativeNavigationBar", {
        left: ["back"]
      });
    }
  },
  watch: {},
  directives: {},
  updated() {},
  mounted() {
    this.initDate();
    if (this.isClient() === "1") {
      this.source = true;
    } else {
      this.source = false;
    }
    // if(navigator.userAgent.indexOf('LVMM') > -1){
    //     if(window.NativeUtil){
    //         this.setAppTitle('日期选择')
    //     }else{
    //         this.loadScript('//pics.lvjs.com.cn/mobile/lib/plugins/nativeUtil/2.0/dist/nativeUtil-2.5.1.min.js',() => {
    //             this.setAppTitle('日期选择')
    //         })
    //     }
    // }else{
    //    if(window.lvHeader){
    //         window.lvHeader.setTitle("日期选择");
    //    }else{
    //         this.loadScript('//pics.lvjs.com.cn/mobile/plugins/nativeJs/lvHeader/1.0/build.min.js',function(){
    //              window.lvHeader.setTitle("日期选择");
    //         })
    //    }
    // }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  font-size: 28px;
}

em,
i {
  font-style: normal;
}

.g-dp-bd {
  position: absolute;
  top: 146px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -o-overflow-scrolling: touch;
  font-size: 24px;
}
.ios-header2 {
  top: 56px;
}

.m-dp-day {
  width: 100%;
  background-color: #fff;
  line-height: 176px;
  height: 176px;
  font-size: 28px;
  border-bottom: 1px solid #ddd;
  position: fixed;
}
.ios-header1 {
  top: 0px;
}
.m-dp-day > div {
  float: left;
  width: 14.2%;
  text-align: center;
}
.m-dp-day > div:first-child,
.m-dp-day > div:last-child {
  color: #d30976;
}

.m-dp-date {
  background-color: #fff;
  overflow: hidden;
}
.m-dp-date:first-of-type {
  margin-top: -1px;
}

.m-dp-date p {
  line-height: 88px;
  text-align: center;
  color: #000;
  /*border-bottom: 1px solid #eee;*/
  background: #efeff7;
}
.m-dp-date > div > span {
  float: left;
  width: 14.2%;
  height: 120px;
  line-height: 120px;
  text-align: center;
  color: #aaa;
  position: relative;
  font-size: 28px;
}
.m-dp-date > div > span.hasPrice {
  line-height: 30px !important;
  padding-top: 20px;
}
.m-dp-date > div > span.selected,
.m-dp-date > div > span.selected > i,
.m-dp-date > div > span.selected > i:after {
  background-color: #d30976;
  color: #fff !important;
}

.m-dp-date > div > span.highLight.usable {
  color: #d30976;
}
.m-dp-date > div > span.highLight.usable > i {
  color: #d30976;
}
.m-dp-date > div > span.usable {
  color: #000;
}
.m-dp-date > div > span.usable > i {
  font-size: 20px;
  display: block;
  color: #d30976;
}
.m-dp-date > div > span.isVocRest {
  color: #4ca2e1;
}
</style>
