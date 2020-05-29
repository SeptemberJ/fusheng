<template>
  <div>
    <section class="Calendar">
      <el-card shadow="always">
        <div slot="header" class="clearfix TextAlignL">
          <span><i class="el-icon-date" style="margin-right: 5px;"></i>日程安排</span>
        </div>
        <full-calendar class="test-fc"
          :events="monthData"
          :config="config">
        </full-calendar>
      </el-card>
      <el-dialog class="AddDialog" title="日程详情" :visible.sync="calendarDialogVisible" fullscreen @close="close">
        <el-table class="lineSmallTable"
          :data="datePlanList"
          height="450"
          style="width: 100%;padding: 5px 0;margin-top: 10px;">
          <el-table-column
            type="index"
            width="45">
          </el-table-column>
          <el-table-column
            prop="cgorderno"
            label="采购单号"
            width="130"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="gongxu"
            label="工序"
            width="100">
          </el-table-column>
          <el-table-column
            prop="matcode"
            label="物料编号"
            width="120"
            show-overflow-tooltip>
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
            width="80"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="shnum"
            label="收货数量"
            width="80"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="wshnum"
            label="未收货数量"
            width="90"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="fnote"
            label="备注"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button @click="seeDetail(scope.row)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </section>
    <!-- 计划 -->
    <Plant v-if="ifShowPlant" :curCgorderEntryId="curCgorderEntryId" :curCgorderNo="curCgorderNo" @togglePlantDialog="togglePlantDialog"></Plant>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Plant from '../../components/Purchase/Plant'
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
      ifShowPlant: false,
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
        },
        eventClick: (calEvent, jsEvent, view) => {
          this.calendarDialogVisible = true
          this.searchEventList(calEvent.start._i)
        }
      }
    }
  },
  components: {
    Plant
  },
  created () {
    this.getCalendarDta()
  },
  computed: {
    ...mapState({
      userCode: state => state.userCode
    })
  },
  methods: {
    getCalendarDta () {
      this.Http.get('datePlanList', {code: this.userCode}
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
    },
    seeDetail (row) {
      this.curCgorderEntryId = '15564960'// row.entryid
      this.curCgorderNo = 'PO2018120201' // row.cgorderno
      this.ifShowPlant = true
    },
    togglePlantDialog (val) {
      this.ifShowPlant = val
    }
  }
}
</script>

<style lang="less" scoped>
.Calendar{
  /*width: 450px;*/
  width: 95%;
  margin: 0 auto 24px auto;
}

</style>
