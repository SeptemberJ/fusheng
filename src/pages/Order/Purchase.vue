<template>
  <div class="Purchase">
    <el-row>
      <!-- 查询筛选 -->
      <el-col :span="20" class="TextAlignL">
        <el-form :inline="true" :model="formSearch" label-width="70px" label-position="left" class="demo-form-inline searchForm">
          <!-- <el-form-item label="订单状态">
            <el-select v-model="formSearch.status" placeholder="请选择" size="mini" style="width: 120px;">
              <el-option label="备料" value="0"></el-option>
              <el-option label="生产" value="1"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="采购单号">
            <el-input v-model="formSearch.cgorderno" clearable size="mini" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item label="物料编号">
            <el-input v-model="formSearch.matcode" clearable size="mini" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item label="录入日期">
            <el-date-picker
              v-model="formSearch.inputDate"
              type="daterange"
              size="mini"
              style="width: 250px;"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" class="TextAlignR">
        <el-button type="primary" @click="search" size="mini" style="margin-top: 6px;">查询</el-button>
        <el-button @click="reset" size="mini" style="margin-top: 6px;">重置</el-button>
      </el-col>
      <el-col :span="24" class="PartitionLine"></el-col>
      <el-col :span="24" class="TextAlignR">
        <!-- <el-button class="MarginL_0_N" size="mini" @click="Input">录入</el-button> -->
        <!-- <el-button class="MarginL_0_N" size="mini">编辑</el-button> -->
        <!-- <el-button class="MarginL_0_N" size="mini" @click="Delete">删除</el-button>
        <el-button class="MarginL_0_N" size="mini">查看</el-button> -->
        <!-- <el-button class="MarginL_0_N" size="mini">邮箱发送</el-button>
        <el-button class="MarginL_0_N" size="mini">导出</el-button> -->
      </el-col>
      <el-col :span="24">
        <el-table class="lineSmallTable"
          :data="purchaseList"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          :height="tableHieght">
          <el-table-column
            type="index"
            fixed
            width="40">
          </el-table-column>
          <!-- <el-table-column
            type="selection"
            fixed
            width="40">
          </el-table-column> -->
          <el-table-column
            prop="sendemail1"
            width="80"
            show-overflow-tooltip
            label="发送次数">
          </el-table-column>
          <el-table-column
            prop="sendemail"
            width="80"
            show-overflow-tooltip
            label="接收次数">
          </el-table-column>
          <!-- <el-table-column
            prop="fstatusTxt"
            width="100"
            show-overflow-tooltip
            label="订单状态">
          </el-table-column> -->
          <el-table-column
            prop="jqTxt"
            width="120"
            show-overflow-tooltip
            label="交期确认状态">
          </el-table-column>
          <el-table-column
            prop="cgorderno"
            width="150"
            show-overflow-tooltip
            label="采购单号">
          </el-table-column>
          <el-table-column
            prop="matname"
            width="200"
            show-overflow-tooltip
            label="物料名称">
          </el-table-column>
          <el-table-column
            prop="matcode"
            width="150"
            show-overflow-tooltip
            label="物料编号">
          </el-table-column>
          <el-table-column
            prop="units"
            width="50"
            show-overflow-tooltip
            label="单位">
          </el-table-column>
          <el-table-column
            prop="num"
            width="100"
            show-overflow-tooltip
            label="订购数量">
          </el-table-column>
          <el-table-column
            prop="wshnum"
            width="100"
            show-overflow-tooltip
            label="待收货数量">
          </el-table-column>
          <el-table-column
            prop="shnum"
            width="100"
            show-overflow-tooltip
            label="已到货数量">
          </el-table-column>
          <el-table-column
            prop="matcode"
            width="120"
            show-overflow-tooltip
            label="材质">
          </el-table-column>
          <el-table-column
            prop="version"
            width="100"
            show-overflow-tooltip
            label="版本号">
          </el-table-column>
          <el-table-column
            prop="dateDaoHuo"
            width="180"
            show-overflow-tooltip
            label="要求到货日期">
          </el-table-column>
          <el-table-column
            prop="dateDaoHuoYJ"
            width="180"
            show-overflow-tooltip
            label="预计送货日期">
          </el-table-column>
          <el-table-column
            prop="shlxr"
            width="100"
            show-overflow-tooltip
            label="收货联系人">
          </el-table-column>
          <el-table-column
            prop="shtel"
            width="150"
            show-overflow-tooltip
            label="收货人电话">
          </el-table-column>
          <el-table-column
            prop="shfax"
            width="150"
            show-overflow-tooltip
            label="收货人传真">
          </el-table-column>
          <el-table-column
            prop="shaddress"
            width="250"
            show-overflow-tooltip
            label="收货人地址">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <!-- <el-button @click="send(scope.row)" type="text" size="small">发送</el-button> -->
              <!-- <el-button @click="seeDetail(scope.row)" type="text" size="small">详情</el-button> -->
              <el-button v-if="scope.row.fstatus == 2" @click="editPlant(scope.row)" type="text" size="small">计划</el-button>
              <el-button v-if="scope.row.fstatus == 1" @click="receipt(scope.row)" type="text" size="small">接单</el-button>
              <el-button v-if="scope.row.fstatus == 1" @click="refuseReceipt(scope.row)" type="text" size="small">不接单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="TextAlignR MarginT_20">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="curPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 操作 -->
    <!-- <Add v-if="ifInput" @toggleAddDialog="toggleAddDialog" @refreshPurchaseOrders="getPurchaseOrders"/> -->
    <!-- 计划 -->
    <Plant v-if="ifShowPlant" :curCgorderJQ="curCgorderJQ" :curCgorderEntryId="curCgorderEntryId" :curCgorderNo="curCgorderNo" @togglePlantDialog="togglePlantDialog"></Plant>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {secondToFormat} from '../../util/utils'
import Plant from '../../components/Purchase/Plant'
export default {
  name: 'Purchase',
  data () {
    return {
      // ifInput: false,
      ifShowPlant: false,
      loading: false,
      pageSize: 15,
      curPage: 1,
      sum: 0,
      formSearch: {
        status: '',
        orderNo: '',
        inputDate: ['', ''],
        matcode: ''
      },
      purchaseList: [],
      selected: []
    }
  },
  computed: {
    ...mapState({
      userCode: state => state.userCode,
      mainContentHeight: state => state.mainContentHeight
    }),
    tableHieght: function () {
      return this.mainContentHeight - 250
    }
  },
  created () {
    this.search()
  },
  components: {
    Plant
  },
  methods: {
    handleCurrentChange () {
      this.search()
    },
    getPurchaseOrders () {

    },
    handleSelectionChange (val) {
      this.selected = val
    },
    togglePlantDialog (val) {
      this.ifShowPlant = val
    },
    Delete () {
      if (this.selected.length === 0) {
        this.$message({
          message: '请选择要删除的项!',
          type: 'warning'
        })
        return false
      }
    },
    reset () {
      this.formSearch = {
        status: '',
        cgorderno: '',
        inputDate: ['', ''],
        matcode: ''
      }
      this.search()
    },
    search () {
      let Data = {
        code: this.userCode, // 'SC01A004',
        number: this.pageSize,
        page_num: this.curPage
      }
      if (this.formSearch.cgorderno) {
        Data.cgorderno = this.formSearch.cgorderno
      }
      if (this.formSearch.matcode) {
        Data.matcode = this.formSearch.matcode
      }
      if (this.formSearch.inputDate[0]) {
        Data.begin_lrsj = this.formSearch.inputDate[0]
      }
      if (this.formSearch.inputDate[1]) {
        Data.end_lrsj = this.formSearch.inputDate[1]
      }
      this.getPurchaseList(Data)
    },
    getPurchaseList (Data) {
      this.loading = true
      this.Http.get('cgorderList', Data
      ).then(res => {
        if (res.data.code === 1) {
          this.purchaseList = res.data.cgorderlist.map(item => {
            // item.fstatusTxt = item.fstatus === '1' ? '进行中' : ''
            item.jqTxt = item.respectarrivedate1_status === '0' ? '未审核' : (item.respectarrivedate1_status === '1' ? '未通过' : '已通过')
            item.dateDaoHuo = secondToFormat(item.respectarrivedate.time)
            item.dateDaoHuoYJ = item.respectarrivedate1.time === -2209017600000 ? '' : secondToFormat(item.respectarrivedate1.time)
            // item.dateDaoHuoYJ = secondToFormat(item.respectarrivedate1.time)
            return item
          })
          let temp = res.data.cgorderlist.slice(0)
          let preCgorderno = null
          temp.map((item, idx) => {
            if (item.cgorderno === preCgorderno) {
              item.cgorderno = ''
              item.sendemail1 = ''
              item.sendemail = ''
            } else {
              preCgorderno = item.cgorderno
            }
          })
          // setTimeout(() => {
          //   console.log(temp, temp)
          // }, 2000)
          this.sum = res.data.cgorderCount
          this.loading = false
        } else {
          this.$message({
            message: '获取采购单失败!',
            type: 'error'
          })
          this.loading = false
        }
      }).catch((error) => {
        console.log(error)
        this.loading = false
        this.$message({
          message: 'interface error!',
          type: 'error'
        })
      })
    },
    seeDetail () {
    },
    editPlant (row) {
      this.curCgorderEntryId = row.entryid
      this.curCgorderNo = row.cgorderno
      this.curCgorderJQ = row.respectarrivedate1_status
      this.ifShowPlant = true
    },
    receipt (row) {
      this.$confirm('确认接单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.operation(row.id, 2)
      }).catch(() => {
      })
    },
    // sureRefuse (row) {
    //   this.$confirm('确认不接单?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.operation(row.id, 3)
    //   }).catch(() => {
    //   })
    // },
    refuseReceipt (row) {
      var validateReason = (value) => {
        if (!value || !(value.trim())) {
          return false
        } else {
          return true
        }
      }
      this.$prompt('请输入不接单的原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: validateReason,
        inputErrorMessage: '请输入原因！'
      }).then(({ value }) => {
        this.operation(row.id, 3, value)
      }).catch(() => {
      })
    },
    operation (id, status, reason = '') {
      this.Http.post('updateFstatus?id=' + id + '&fstatus=' + status + '&reason=' + reason
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.$message({
              message: '操作成功!',
              type: 'success'
            })
            // 刷新信息
            this.search()
            break
          default:
            this.$message({
              message: res.data.message + '!',
              type: 'error'
            })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    send (row) {
      if (row.sendemail1 >= row.sendemail) {
        this.$message({
          message: '该采购单还不能执行该操作!',
          type: 'warning'
        })
      } else {
        this.$confirm('确认发送?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Http.post('updateSend?id=' + row.id
          ).then(res => {
            switch (res.data.code) {
              case 1:
                this.$message({
                  message: '发送成功!',
                  type: 'success'
                })
                // 刷新信息
                this.search()
                break
              default:
                this.$message({
                  message: res.data.message + '!',
                  type: 'error'
                })
            }
          }).catch((error) => {
            console.log(error)
          })
        }).catch(() => {
        })
      }
    }
    // 录入
    // Input () {
    //   this.ifInput = true
    // }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.Purchase{
  width: calc(100% - 2*@Padding);
  height: 100%;
  background: #fff;
  padding: @Padding;
}
</style>
