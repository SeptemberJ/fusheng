<template>
  <div class="Delivery">
    <el-row>
      <!-- 查询筛选 -->
      <el-col :span="20" class="TextAlignL">
        <el-form :inline="true" :model="formSearch" label-width="70px" label-position="left" class="demo-form-inline searchForm">
          <el-form-item label="送货日期">
            <el-date-picker
              v-model="formSearch.deliveryDate"
              type="daterange"
              size="mini"
              style="width: 250px;"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="采购单号">
            <el-input v-model="formSearch.cgorderno" size="mini" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item label="送货单号">
            <el-input v-model="formSearch.songhuono" size="mini" style="width: 130px;"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" class="TextAlignR">
        <el-button type="primary" @click="search" size="mini" style="margin-top: 6px;">查询</el-button>
        <el-button @click="reset" size="mini" style="margin-top: 6px;">重置</el-button>
      </el-col>
      <el-col :span="24" class="PartitionLine"></el-col>
      <el-col :span="24" class="TextAlignR">
        <el-button class="MarginL_0_N" size="mini" @click="Input">录入</el-button>
        <!-- <el-button class="MarginL_0_N" size="mini">编辑</el-button>
        <el-button class="MarginL_0_N" size="mini" @click="Delete">删除</el-button>
        <el-button class="MarginL_0_N" size="mini">查看</el-button>
        <el-button class="MarginL_0_N" size="mini">邮箱发送</el-button>
        <el-button class="MarginL_0_N" size="mini">导出</el-button> -->
      </el-col>
      <el-col :span="24">
        <el-table class="lineSmallTable"
          :data="deliveryList"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          :height="tableHieght">
          <el-table-column
            type="index"
            fixed
            width="50">
          </el-table-column>
          <!-- <el-table-column
            type="selection"
            fixed
            width="55">
          </el-table-column> -->
          <el-table-column
            prop="fstatusTxt"
            width="80"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="songhuono"
            width="150"
            show-overflow-tooltip
            label="送货单号">
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
            prop="norms"
            width="150"
            show-overflow-tooltip
            label="规格">
          </el-table-column>
          <el-table-column
            prop="lrsjTxt"
            width="150"
            show-overflow-tooltip
            label="制单日期">
          </el-table-column>
          <el-table-column
            prop="stuff"
            width="150"
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
            prop="units"
            width="50"
            show-overflow-tooltip
            label="单位">
          </el-table-column>
          <el-table-column
            prop="shnum"
            width="100"
            show-overflow-tooltip
            label="送货数量">
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
            prop="shnum"
            width="120"
            show-overflow-tooltip
            label="收货数量">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="seeDetail(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="goPrint(scope.row)" type="text" size="small" :disabled="scope.row.fstatus != 1">打印</el-button>
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
    <!-- 录入 -->
    <Add v-if="ifInput" @toggleAddDialog="toggleAddDialog" @refreshDeliveryOrders="search"/>
    <!-- 查看 -->
    <Detail v-if="ifSeeDetail" :curSongHuoId="curSongHuoId" @toggleDetailDialog="toggleDetailDialog" :curTimestamp="curTimestampD"></Detail>
    <!-- 打印 -->
    <el-dialog title="复盛易利达送货单" :visible.sync="printDialogVisible" :show-close="false" fullscreen @close="closePrintDialog">
      <PrintSH @closePrintDialog='closePrintDialog' :curSongHuoId="curSongHuoId" :curTimestamp="curTimestampP"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Add from '../../components/Delivery/Add'
import Detail from '../../components/Delivery/Detail'
import PrintSH from '../../components/Delivery/Print'
import {secondToFormat} from '../../util/utils'
export default {
  name: 'Delivery',
  data () {
    return {
      ifCanAdd: true,
      ifInput: false,
      ifSeeDetail: false,
      printDialogVisible: false,
      curSongHuoId: '',
      curTimestampD: '',
      curTimestampP: '',
      loading: false,
      pageSize: 15,
      curPage: 1,
      sum: 0,
      formSearch: {
        deliveryDate: ['', ''],
        cgorderno: '',
        songhuono: ''
      },
      deliveryList: [],
      selected: []
    }
  },
  computed: {
    ...mapState({
      userCode: state => state.userCode,
      mainContentHeight: state => state.mainContentHeight
    }),
    tableHieght: function () {
      return this.mainContentHeight - 280
    }
  },
  created () {
    this.search()
  },
  components: {
    Add,
    Detail,
    PrintSH
  },
  methods: {
    reset () {
      this.formSearch = {
        deliveryDate: ['', ''],
        cgorderno: '',
        songhuono: ''
      }
      this.search()
    },
    search () {
      let Data = {
        code: this.userCode,
        number: this.pageSize,
        page_num: this.curPage
      }
      if (this.formSearch.cgorderno) {
        Data.cgorderno = this.formSearch.cgorderno
      }
      if (this.formSearch.songhuono) {
        Data.songhuono = this.formSearch.songhuono
      }
      if (this.formSearch.deliveryDate[0]) {
        Data.begin_lrsj = this.formSearch.deliveryDate[0]
      }
      if (this.formSearch.deliveryDate[1]) {
        Data.end_lrsj = this.formSearch.deliveryDate[1]
      }
      this.getDeliveryList(Data)
    },
    handleCurrentChange () {
      this.search()
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    toggleAddDialog (val) {
      this.ifInput = val
    },
    toggleDetailDialog (val) {
      this.ifSeeDetail = val
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
    getDeliveryList (Data) {
      this.loading = true
      this.Http.get('shorderList', Data
      ).then(res => {
        if (res.data.code === 1) {
          this.deliveryList = res.data.shorderlist.map(item => {
            if (item.fstatus === '0') {
              this.ifCanAdd = false
            }
            item.lrsj = secondToFormat(item.lrsj.time)
            item.fstatusTxt = item.fstatus === '0' ? '待审核' : (item.fstatus === '1' ? '同意' : '不同意')
            return item
          })
          // let temp = res.data.shorderlist.slice(0)
          // let preSonghuono = null
          // temp.map((item, idx) => {
          //   if (item.songhuono === preSonghuono) {
          //     item.cgorderno = ''
          //     item.sendemail1 = ''
          //     item.sendemail = ''
          //   } else {
          //     preSonghuono = item.songhuono
          //   }
          // })
          this.sum = res.data.shorderCount
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
    // 录入
    Input () {
      if (!this.ifCanAdd) {
        this.$message({
          message: '目前还有待审核的送货单，无法录入新的送货单!',
          type: 'warning'
        })
      } else {
        this.ifInput = true
      }
    },
    seeDetail (row) {
      this.ifSeeDetail = true
      this.curSongHuoId = row.songhuoid
      this.curTimestampD = new Date().getTime()
    },
    goPrint (row) {
      this.printDialogVisible = true
      this.curSongHuoId = row.songhuoid
      this.curTimestampP = new Date().getTime()
    },
    closePrintDialog () {
      this.printDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.Delivery{
  width: calc(100% - 2*@Padding);
  height: 100%;
  background: #fff;
  padding: @Padding;
}
</style>
