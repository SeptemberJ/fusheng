<template>
  <el-dialog class="CgListDialog" title="采购单列表" width="850px" :visible.sync="listDialogVisible" @close="close">
  <!-- <el-dialog class="CgListDialog" title="采购单列表" :visible.sync="dialogFormVisible" fullscreen> -->
    <div class="Purchase">
      <el-row>
        <!-- 查询筛选 -->
        <el-col :span="20" class="TextAlignL">
          <el-form :inline="true" :model="formSearch" label-width="70px" label-position="left" class="demo-form-inline searchForm">
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
        <el-col :span="24">
          <el-table id="chooseCgTable"
            ref="selectedList"
            :data="purchaseList"
            v-loading="loading"
            @select-all="selectAll"
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
            <!-- <el-table-column
              prop="entryid"
              width="120"
              label="entryid">
            </el-table-column> -->
            <el-table-column
              prop="cgorderno"
              width="120"
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
              width="120"
              label="物料编码">
            </el-table-column>
            <el-table-column
              prop="norms"
              width="200"
              show-overflow-tooltip
              label="规格">
            </el-table-column>
            <el-table-column
              prop="version"
              width="80"
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
              prop="stuff"
              width="150"
              label="材质"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="shnum"
              width="100"
              label="收货数量">
            </el-table-column>
            <el-table-column
              prop="wshnum"
              width="100"
              label="未收货数量">
            </el-table-column>
            <el-table-column
              prop="fnote"
              width="200"
              show-overflow-tooltip
              label="备注">
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
      <div slot="footer" class="dialog-footer TextAlignC">
        <el-button type="primary" @click="sureChoose">确认</el-button>
        <!-- <el-button @click="close">关闭{{copySelectedAllList.length}}</el-button> -->
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Purchase',
  props: ['copySelectedAllList'],
  data () {
    return {
      listDialogVisible: true,
      loading: false,
      pageSize: 20,
      curPage: 1,
      sum: 0,
      selectedList: [], // 当前页所选择的项
      selectedAllList: [], // 所有选择的项
      selectedCgorderno: null, // 选择项的单号
      formSearch: {
        status: '',
        orderNo: '',
        inputDate: ['', ''],
        matcode: ''
      },
      purchaseList: [],
      copySelectedAllListOrigin: []
    }
  },
  computed: {
    ...mapState({
      userCode: state => state.userCode
    })
  },
  created () {
    // console.log('created-----------------')
    this.selectedAllList = this.copySelectedAllList
    // this.copySelectedAllListOrigin = [...this.copySelectedAllList]
    this.handleCurrentChange()
    // this.search()
  },
  methods: {
    selectAll () {
    },
    async handleCurrentChange () {
      let temp = this.selectedAllList[this.curPage - 1] ? this.selectedAllList[this.curPage - 1] : []
      let PurchaseList = await this.search()
      this.selectedList = temp
      if (this.selectedList.length > 0) {
        this.selectedList.map((item, idx) => {
          this.checkIfHas(PurchaseList, item.entryid)
          // this.checkIfHas(PurchaseList, item.id)
        })
      }
    },
    checkIfHas (PurchaseList, EntryId) {
      PurchaseList.map((item, idx) => {
        // if (item.id === rowId)
        if (item.entryid === EntryId) {
          this.$refs.selectedList.toggleRowSelection(PurchaseList[idx], true)
        } else {
        }
      })
    },
    handleSelectionChange (curSelection) {
      this.updateSelectedAll(curSelection)
      // 不能选择不同单号
      // let len = curSelection.length
      // let LatestCgorder = curSelection[len - 1] // 最新加入的采购单
      // if (len > 0) {
      //   if (this.selectedCgorderno) {
      //     if (LatestCgorder.cgorderno !== this.selectedCgorderno) {
      //       this.purchaseList.map((item, idx) => {
      //         if (item.entryid === LatestCgorder.entryid) {
      //           this.$refs.selectedList.toggleRowSelection(this.purchaseList[idx], false)
      //         }
      //       })
      //       this.$message({
      //         message: '请选择同样单号的采购单!',
      //         type: 'warning'
      //       })
      //       return false
      //     } else {
      //     }
      //   } else {
      //     this.selectedCgorderno = curSelection[0].cgorderno
      //     if (LatestCgorder.cgorderno !== this.selectedCgorderno) {
      //       this.purchaseList.map((item, idx) => {
      //         if (item.entryid === LatestCgorder.entryid) {
      //           this.$refs.selectedList.toggleRowSelection(this.purchaseList[idx], false)
      //         }
      //       })
      //       this.$message({
      //         message: '请选择同样单号的采购单!',
      //         type: 'warning'
      //       })
      //       return false
      //     } else {
      //     }
      //   }
      // }
      this.selectedList = curSelection
    },
    async updateSelectedAll (curSelection) {
      // console.log(this.selectedAllList)
      // debugger
      // 若当前无任何选择项 则初始化selectedCgorderno
      // if (curSelection.length === 0 && (this.selectedAllList.length === 0 || this.selectedAllList[this.curPage - 1].length === 1)) {
      //   debugger
      //   this.selectedCgorderno = null
      // }
      // =======================
      // if (curSelection.length === 0) {
      //   if (this.selectedAllList.length === 0) {
      //     debugger
      //     this.selectedCgorderno = null
      //   } else {
      //     let ifHasNoEmpty = false
      //     this.selectedAllList.map( item => {
      //       if (item.length > 0) {
      //         ifHasNoEmpty = true
      //       }
      //     })
      //     if (!ifHasNoEmpty && this.selectedAllList[this.curPage - 1].length === 1) {
      //       this.selectedCgorderno = null
      //     }
      //   }
      // }
      // -----------------------
      // if (curSelection.length > 0) {
      //   this.selectedAllList[this.curPage - 1] = curSelection
      // } else {
      //   if (this.selectedAllList[this.curPage - 1]) {
      //     this.selectedAllList.splice(this.curPage - 1, 1)
      //   }
      // }
      // 若当前无任何选择项 则初始化selectedCgorderno
      // if (curSelection.length === 0 && (this.selectedAllList.length === 0)) {
      //   debugger
      //   this.selectedCgorderno = null
      // }
      this.selectedAllList[this.curPage - 1] = curSelection
      // 若当前无任何选择项 则初始化selectedCgorderno
      if (curSelection.length === 0) {
        // console.log(this.selectedAllList)
        let noEmptyArray = await this.ifHasNoEmpty()
        if (noEmptyArray.length === 0) {
          this.selectedCgorderno = null
        }
      }
    },
    ifHasNoEmpty () {
      return new Promise((resolve, reject) => {
        let noEmptyItem = this.selectedAllList.filter(item => {
          return item.length > 0
        })
        resolve(noEmptyItem)
      })
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
      return new Promise((resolve, reject) => {
        this.loading = true
        this.Http.get('cgorderShList', Data
        ).then(res => {
          if (res.data.code === 1) {
            this.purchaseList = res.data.cgorderlist
            this.sum = res.data.cgorderCount
            this.loading = false
            resolve(res.data.cgorderlist)
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
      })
    },
    sureChoose () {
      // console.log(this.selectedAllList)
      this.$emit('updateCgList', this.selectedAllList)
      this.close()
    },
    search2 () {
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
    // getPurchaseList (Data) {
    //   this.loading = true
    //   this.Http.get('cgorderShList', Data
    //   ).then(res => {
    //     if (res.data.code === 1) {
    //       this.purchaseList = res.data.cgorderlist
    //       this.sum = res.data.cgorderCount
    //       this.loading = false
    //     } else {
    //       this.$message({
    //         message: '获取采购单失败!',
    //         type: 'error'
    //       })
    //       this.loading = false
    //     }
    //   }).catch((error) => {
    //     console.log(error)
    //     this.loading = false
    //     this.$message({
    //       message: 'interface error!',
    //       type: 'error'
    //     })
    //   })
    // },
    close () {
      // this.selectedAllList = this.copySelectedAllListOrigin
      // console.log(this.selectedAllList)
      this.$emit('toggleCgListDialog', false)
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.Purchase{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: @Padding;
  margin-top: -50px;
}
</style>
