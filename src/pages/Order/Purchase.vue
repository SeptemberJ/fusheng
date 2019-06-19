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
          height="580">
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
            prop="id"
            width="80"
            label="id">
          </el-table-column> -->
          <el-table-column
            prop="fstatusTxt"
            width="100"
            show-overflow-tooltip
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="cgorderno"
            width="150"
            show-overflow-tooltip
            label="采购单号">
          </el-table-column>
         <!--  <el-table-column
            prop="providerfullname"
            width="200"
            show-overflow-tooltip
            label="供应商全称">
          </el-table-column>
          <el-table-column
            prop="providername"
            width="120"
            show-overflow-tooltip
            label="供应商简称">
          </el-table-column>
          <el-table-column
            prop="providercode"
            width="120"
            label="供应商编号">
          </el-table-column> -->
          <el-table-column
            prop="matcode"
            width="150"
            show-overflow-tooltip
            label="物料编号">
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
            prop="providerproxy"
            width="100"
            show-overflow-tooltip
            label="联系人">
          </el-table-column>
          <!-- <el-table-column
            prop="tel"
            width="150"
            show-overflow-tooltip
            label="电话">
          </el-table-column>
          <el-table-column
            prop="fax"
            width="150"
            show-overflow-tooltip
            label="传真">
          </el-table-column>
          <el-table-column
            prop="address"
            width="250"
            show-overflow-tooltip
            label="地址">
          </el-table-column> -->
          <el-table-column
            prop="name"
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
          <!-- <el-table-column
            prop="name"
            label="录入人">
          </el-table-column> -->
          <!-- <el-table-column
            prop="name"
            label="图号">
          </el-table-column> -->
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
            label="未收货数量">
          </el-table-column>
          <el-table-column
            prop="shnum"
            width="100"
            show-overflow-tooltip
            label="收货数量">
          </el-table-column>
          <!-- <el-table-column
            prop="name"
            label="检验数量">
          </el-table-column>
          <el-table-column
            prop="name"
            label="合格数量">
          </el-table-column>
          <el-table-column
            prop="name"
            label="不合格数量"
            width="90">
          </el-table-column>
          <el-table-column
            prop="name"
            label="入库数量">
          </el-table-column>
          <el-table-column
            prop="name"
            label="未入库数量"
            width="90">
          </el-table-column>
          <el-table-column
            prop="name"
            label="退料数量">
          </el-table-column>
          <el-table-column
            prop="name"
            label="关闭标志">
          </el-table-column>
          <el-table-column
            prop="name"
            label="行关闭标志"
            width="90">
          </el-table-column>
          <el-table-column
            prop="name"
            label="是否手工关闭"
            width="110">
          </el-table-column>
          <el-table-column
            prop="name"
            label="变更版本">
          </el-table-column>
          <el-table-column
            prop="name"
            label="图纸下载">
          </el-table-column> -->
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="send(scope.row)" type="text" size="small">发送</el-button>
              <!-- <el-button @click="seeDetail(scope.row)" type="text" size="small">详情</el-button> -->
              <el-button @click="editPlant(scope.row)" type="text" size="small">计划</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="TextAlignR MarginT_20">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 操作 -->
    <!-- <Add v-if="ifInput" @toggleAddDialog="toggleAddDialog" @refreshPurchaseOrders="getPurchaseOrders"/> -->
    <!-- 计划 -->
    <Plant v-if="ifShowPlant" :curCgorderEntryId="curCgorderEntryId" :curCgorderNo="curCgorderNo" @togglePlantDialog="togglePlantDialog"></Plant>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      userCode: state => state.userCode
    })
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
            item.fstatusTxt = item.fstatus === '1' ? '进行中' : ''
            return item
          })
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
      this.ifShowPlant = true
    },
    send (row) {
      if (row.sendemail1 >= row.sendemail) {
        this.$message({
          message: '该采购单还不能执行该操作!',
          type: 'warning'
        })
      } else {
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
  background: #fff;
  padding: @Padding;
}
</style>
