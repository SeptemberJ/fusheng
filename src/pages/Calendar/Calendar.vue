<template>
  <div class="Calendar">
    <full-calendar :events="monthData" class="test-fc"
      lang="zh"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick">
    </full-calendar>
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
  </div>
</template>
<script>
export default {
  name: 'Calendar',
  data () {
    return {
      calendarDialogVisible: false,
      monthData: [],
      datePlanList: []
    }
  },
  components: {
    'full-calendar': require('vue-fullcalendar')
  },
  created () {
    this.getCalendarDta()
  },
  computed: {
  },
  methods: {
    changeMonth () {},
    eventClick (date, jsEvent, view) {
      this.calendarDialogVisible = true
      this.searchEventList(date.start)
    },
    dayClick (date, jsEvent, view) {
    },
    getCalendarDta () {
      this.Http.get('datePlanList'
      ).then(res => {
        if (res.data.code === 1) {
          res.data.datePlanList.map(item => {
            this.monthData.push({
              title: '★',
              start: item.yuji_date,
              end: item.yuji_date,
              cssClass: 'hasEvent'
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
.Calendar{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: @Padding;
}
</style>
