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
        <el-table
          :data="deliveryList"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          height="250">
          <el-table-column
            type="index"
            fixed
            width="50">
          </el-table-column>
          <el-table-column
            type="selection"
            fixed
            width="55">
          </el-table-column>
          <el-table-column
            prop="songhuono"
            width="120"
            label="送货单号">
          </el-table-column>
          <el-table-column
            prop="cgorderno"
            width="120"
            label="采购单号">
          </el-table-column>
          <el-table-column
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
          </el-table-column>
          <el-table-column
            prop="matcode"
            width="100"
            label="材质">
          </el-table-column>
          <el-table-column
            prop="units"
            width="50"
            label="单位">
          </el-table-column>
          <el-table-column
            prop="providerproxy"
            width="100"
            label="联系人">
          </el-table-column>
          <el-table-column
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
          </el-table-column>
          <el-table-column
            prop="name"
            width="100"
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
          <el-table-column
            prop="matcode"
            width="120"
            label="物料编号">
          </el-table-column>
          <el-table-column
            prop="version"
            label="版本号">
          </el-table-column>
          <!-- <el-table-column
            prop="name"
            label="图号">
          </el-table-column> -->
          <el-table-column
            prop="shnum"
            width="120"
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
            width="80">
            <template slot-scope="scope">
              <el-button @click="seeDetail(scope.row)" type="text" size="small">查看</el-button>
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
    <!-- 录入 -->
    <Add v-if="ifInput" @toggleAddDialog="toggleAddDialog" @refreshDeliveryOrders="getDeliveryList"/>
    <!-- 查看 -->
    <Detail v-if="ifSeeDetail" :curSongHuoId="curSongHuoId" @toggleDetailDialog="toggleDetailDialog"></Detail>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Add from '../../components/Delivery/Add'
import Detail from '../../components/Delivery/Detail'
export default {
  name: 'Delivery',
  data () {
    return {
      ifInput: false,
      ifSeeDetail: false,
      curSongHuoId: '',
      loading: false,
      pageSize: 10,
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
      userCode: state => state.userCode
    })
  },
  created () {
    this.search()
  },
  components: {
    Add,
    Detail
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
          this.deliveryList = res.data.shorderlist
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
      this.ifInput = true
    },
    seeDetail (row) {
      this.ifSeeDetail = true
      this.curSongHuoId = row.songhuoid
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.Delivery{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: @Padding;
}
</style>
