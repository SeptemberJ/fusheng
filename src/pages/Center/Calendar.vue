<template>
  <div class="Calendar">
    <div class="WeekBar">
      <div class="WeekItem">一</div>
      <div class="WeekItem">二</div>
      <div class="WeekItem">三</div>
      <div class="WeekItem">四</div>
      <div class="WeekItem">五</div>
      <div class="WeekItem">六</div>
      <div class="WeekItem">日</div>
      <!-- <el-row :gutter="20">
        <el-col :span="3">一</el-col>
        <el-col :span="3">二</el-col>
        <el-col :span="3">三</el-col>
        <el-col :span="3">四</el-col>
        <el-col :span="3">五</el-col>
        <el-col :span="3">六</el-col>
        <el-col :span="3">日</el-col>
      </el-row> -->
    </div>
    <div class="DayGrid">
      <div class="DayItem" v-for="(dayItem, idx) in dayData" :key="idx">{{dayItem ? dayItem.day : 'empty'}}</div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Calendar',
  data () {
    return {
      dayData: [],
      dayData2: [
        {day: 1, events: ['订单开始']},
        {day: 2, events: ['订单开始']},
        {day: 1, events: ['订单开始']},
        {day: 1, events: ['订单开始']},
        {day: 1, events: ['订单开始']},
        {day: 1, events: ['订单开始']},
        {day: 1, events: ['订单开始']},
        {day: 1, events: ['订单开始']},
        {day: 1, events: ['订单开始']}
      ]
    }
  },
  components: {
  },
  created () {
    this.getDateList()
  },
  computed: {
    // ...mapState({
    //   userCode: state => state.userCode
    // })
  },
  methods: {
    getDayCount () {
      var curDate = new Date()
      return new Date(curDate.getFullYear(), curDate.getMonth(), 0).getDate()
    },
    async getDateList () {
      const curDate = new Date()
      const Year = curDate.getFullYear()
      // const Month = curDate.getMonth() + 1
      const Day = curDate.getDate()
      const Week = 5 // curDate.getDay()
      const dayCount = await this.getLastDay(Year, 3)
      const DateList = await this.combineDate(Day, dayCount)
      if (Week === 1) {
        this.dayData = DateList
        console.log(DateList)
      } else {
        const temp = await this.addPreDay(Week, DateList)
        this.dayData = temp
        console.log(temp)
      }
    },
    combineDate (Day, dayCount) {
      return new Promise((resolve, reject) => {
        let dayList = []
        for (let i = 1; i <= dayCount; i++) {
          if (i >= Day) {
            let obj = {
              'day': i
            }
            dayList.push(obj)
            if (i === dayCount) {
              resolve(dayList)
            }
          }
        }
      })
    },
    addPreDay (Week, DateList) {
      return new Promise((resolve, reject) => {
        for (let i = 1; i < Week; i++) {
          DateList.unshift(false)
          if (i === Week - 1) {
            resolve(DateList)
          }
        }
      })
    },
    getLastDay (year, month) {
      return new Promise((resolve, reject) => {
        var d = new Date(0)
        if (month === 12) {
          d.setUTCFullYear(year + 1)
          d.setUTCMonth(0)
        } else {
          d.setUTCFullYear(year)
          d.setUTCMonth(month)
        }
        d.setTime(d.getTime() - 1)
        resolve(d.getUTCDate())
      })
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.Calendar{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: @Padding;
  .WeekBar{
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #409EFF;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .WeekItem{
      width: 14.3%;
    }
  }
  .DayGrid{
    width: calc(100% - 1px);
    .DayItem{
      width: calc(14.28% - 20px - 1px);
      height: 80px;
      background: #fff;
      color: #333;
      display: inline-block;
      float: left;
      padding: 10px;
      text-align: right;
      background: #fff;
      border-left: 1px solid #eee;
      border-bottom: 1px solid #eee;
      &:nth-of-type(7n){
        width: calc(14.28% - 20px - 2px);
        border-right: 1px solid #eee;
      }
      &:nth-last-child(2) {
        border-right: 1px solid #eee;
      }
      /*
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      &:nth-of-type(7n){
        border-right: 1px solid #ccc;
      }
      */
    }
  }
}
</style>
