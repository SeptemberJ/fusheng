<template>
  <div class="Index">
    <section class="Calendar">
      <el-card shadow="always">
        <div slot="header" class="clearfix TextAlignL">
          <span><i class="el-icon-date"></i>日程安排</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <full-calendar class="test-fc"
          :events="monthData"
          :config="config">
        </full-calendar>
      </el-card>
      <el-dialog class="AddDialog" title="日程详情" :visible.sync="calendarDialogVisible" fullscreen @close="close">
        <el-table
          :data="datePlanList"
          height="450"
          style="width: 100%;padding: 5px 0;margin-top: 10px;">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="cgorderno"
            label="采购单号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="gongxu"
            label="工序"
            width="120">
          </el-table-column>
          <el-table-column
            prop="matcode"
            label="物料编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="norms"
            label="规格"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="stuff"
            label="材质"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="num"
            label="订购数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="shnum"
            label="收货数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="wshnum"
            label="未收货数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="fnote"
            label="备注"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-dialog>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data () {
    const curDate = new Date()
    const curYear = curDate.getFullYear()
    const curMonth = curDate.getMonth() + 1
    const startDate = curYear + '-' + (curMonth < 10 ? '0' + curMonth : curMonth) + '-01'
    let endDate = ''
    if (curMonth === 12) {
      endDate = curYear + 1 + '-' + '01-01'
    } else {
      const endMonth = curMonth + 1
      endDate = curYear + '-' + (endMonth < 10 ? '0' + endMonth : endMonth) + '-01'
    }

    return {
      calendarDialogVisible: false,
      monthData: [],
      datePlanList: [],
      config: {
        firstDay: '0',
        weekends: true,
        locale: 'zh-cn',
        height: 350,
        defaultView: 'month',
        // weekMode: 'liquid',
        // allDaySlot: false,
        header: false,
        // defaultDate: '2019-06-19',
        validRange: {
          start: startDate,
          end: endDate
        },
        navLinks: true,
        navLinkDayClick: function (date, jsEvent) {
          // console.log('day', date.format())
          // console.log('coords', jsEvent.pageX, jsEvent.pageY)
        },
        eventClick: (calEvent, jsEvent, view) => {
          // console.log(calEvent.start._i)
          this.calendarDialogVisible = true
          this.searchEventList(calEvent.start._i)
        }
      }
    }
  },
  components: {
    // 'full-calendar' : require('vue-fullcalendar')
  },
  created () {
    this.getCalendarDta()
  },
  computed: {
  },
  methods: {
    changeMonth () {},
    getCalendarDta () {
      this.Http.get('datePlanList'
      ).then(res => {
        if (res.data.code === 1) {
          res.data.datePlanList.map((item, idx) => {
            this.monthData.push({
              id: idx + 1,
              title: '★',
              start: item.yuji_date,
              end: item.yuji_date
              // cssClass: 'hasEvent'
            })
          })
        } else {
          this.$message({
            message: '获取采购单失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message({
          message: 'interface error!',
          type: 'error'
        })
      })
    },
    close () {
      this.calendarDialogVisible = false
    },
    searchEventList (DATE) {
      this.Http.get('datePlanByDayList', {yuji_date: DATE}
      ).then(res => {
        if (res.data.code === 1) {
          this.datePlanList = res.data.datePlanList
        } else {
          this.$message({
            message: '获取计划安排失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message({
          message: 'interface error!',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.Index{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: @Padding;
  .Calendar{
    width: 450px;
  }
}
</style>
