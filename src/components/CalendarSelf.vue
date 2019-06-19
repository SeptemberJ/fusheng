<template>
  <div class="cal-wrapper">
    <div class="cal-header">
      <div class="l">考勤日历</div>
      <div class="r">
        <div class="iconfont icon-jiantouleft icon" @click="preMonth"></div>
        <div class="title icon">{{curYearMonth}}</div>
        <div class="iconfont icon-jiantouright icon" @click="nextMonth"></div>
      </div>
    </div>
    <div class="cal-body">
      <div class="weeks">
        <span v-for="(dayName, dayIndex) in dayNames" :key="dayIndex" :style="`width:${100/dayNames.length}%;`">
          {{dayName}}
        </span>
      </div>
      <div class="dates">
        <div v-for="(date,index) in dayList" :key="index" :style="bgColor(date)" :class="[{ today: date.status ? (today == date.date) : false,event:date.status ? date.type : false}]" @click="unusualFunc(date)">
          <p class="date-num" :style="`color:${date.type?'#fff':date.status?'#74797b':'#b0b3b4'};`">{{date.date.split('/')[2]}}</p>
          <span>{{date.desc}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
 
export default {
  props: {
    calendar: {
      type: Object,
      required: true
    },
    events: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      emptyText: '',
      dayNames: '',
      showUnusual: false,
      tableData: [],
      worknData: [],
      currentDay: '',
      checkDate: ''
    };
  },
  methods: {
    nextMonth() {
      this.$emit("month-changed", "next");
    },
    preMonth() {
      this.$emit("month-changed", "pre");
    },
    bgColor(date) {
      // 1 迟到 #f68787 2 未打卡 #56bff5 3 早退 #edb55d
      let bg =
        date.type == 1
          ? "#f68787"
          : date.type == 2 ? "#56bff5" : date.type == 3 ? "#edb55d" : "#fff";
      return `width:${100 / 7}%;background:${bg};color:#fff;`;
    }
  },
  computed: {
    dayList() {
      let firstDay = new Date(
        this.calendar.params.curYear,
        this.calendar.params.curMonth,
        1
      );
      let dayOfWeek = firstDay.getDay();
      // 根据当前日期计算偏移量 // Calculate the offset based on the current date
      if (this.calendar.options.weekStartOn > dayOfWeek) {
        dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn + 7;
      } else {
        dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn;
      }
 
      let startDate = new Date(firstDay);
      startDate.setDate(firstDay.getDate() - dayOfWeek);
 
      let item,
        status,
        tempArr = [],
        tempItem;
      for (let i = 0; i < 42; i++) {
        item = new Date(startDate);
        item.setDate(startDate.getDate() + i);
 
        status = this.calendar.params.curMonth === item.getMonth() ? 1 : 0;
 
        tempItem = {
          date: `${item.getFullYear()}/${item.getMonth() +
            1}/${item.getDate()}`,
          status: status,
          customClass: []
        };
        this.events.map(event => {
          if (isEqualDateStr(event.date, tempItem.date)) {
            tempItem.type = event.type;
            tempItem.desc = event.desc || "";
            if (event.customClass) tempItem.customClass.push(event.customClass);
          }
        });
        tempArr.push(tempItem);
      }
      return tempArr;
    },
    curYearMonth() {
      return `${this.calendar.params.curYear}年${this.calendar.params.curMonth +
        1}月`;
    },
    today() {
      let dateObj = new Date();
      return `${dateObj.getFullYear()}/${dateObj.getMonth() +
        1}/${dateObj.getDate()}`;
    }
  }
}
</script>
<style>
  .is-selected {
    color: #1989FA;
  }
</style>
 
