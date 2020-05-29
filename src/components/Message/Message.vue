<template>
  <div>
    <section class="Message">
      <el-card shadow="always">
        <div slot="header" class="clearfix TextAlignL">
          <span><i class="el-icon-bell" style="margin-right: 5px;"></i>消息列表</span>
          <el-select v-model="messageStutus" size="mini" style="width: 80px;float:right;" @change="changeFilterStutus">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-table class="lineSmallTable"
          :data="messageList"
          style="width: 100%"
          height="323">
          <el-table-column
            type="index"
            width="30">
          </el-table-column>
          <el-table-column
            prop="createDateTxt"
            label="日期"
            width="170">
          </el-table-column>
          <el-table-column
            prop="orderTypeTxt"
            label="消息类型"
            width="120">
          </el-table-column>
          <!-- <el-table-column
            prop="message_content"
            label="消息内容"
            width="300">
          </el-table-column> -->
          <el-table-column
            prop="fstatusTxt"
            label="状态"
            width="70">
          </el-table-column>
          <el-table-column
            prop="orderno"
            label="单号"
            show-overflow-tooltip
            width="140">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="changeToReaded(scope.row)" type="text" size="small">查看</el-button>
              <el-button v-if="scope.row.source_id" @click="seeChangeOrder(scope.row)" type="text" size="small">变更单</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="TextAlignR" style="height:26px;">
          <el-pagination v-if="sum > 0" style="padding-top: 8px;"
            small
            @current-change="handleCurrentChange"
            :current-page.sync="curPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="sum">
          </el-pagination>
        </div>
      </el-card>
    </section>
    <!-- 变更单 -->
    <el-dialog
      title="变更详情"
      :close-on-click-modal="false"
      :visible.sync="BGDialogVisible"
      width="650px"
      center>
      <section>
        <el-row>
          <el-col :span="24" class="MarginB_10"><b>采购单号：</b>{{BGInfo.cgorderno}}</el-col>
          <!-- <el-col :span="8">{{BGInfo.create_name}}</el-col> -->
          <el-col :span="12" class="MarginB_10"><b>件号：</b>{{BGInfo.matcode}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>名称：</b>{{BGInfo.matname}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>规格：</b>{{BGInfo.norms}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>数量：</b>{{BGInfo.num}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>原始要求到货日期：</b>{{BGInfo.requestarrivedate_oldTxt}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>更新后要求到货日期：</b>{{BGInfo.requestarrivedate_newTxt}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>原始版本号：</b>{{BGInfo.version_old}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>更新后版本号：</b>{{BGInfo.version_new}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>原始单价：</b>{{BGInfo.pricetax_old}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>更新后单价：</b>{{BGInfo.pricetax_new}}</el-col>
          <!-- <el-col :span="12" class="MarginB_10"><b>原始备注：</b>{{BGInfo.memo_old}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>更新后备注：</b>{{BGInfo.memo_new}}</el-col> -->
          <el-col :span="12" class="MarginB_10"><b>原始取消订购量：</b>{{BGInfo.cancelednum_old}}</el-col>
          <el-col :span="12" class="MarginB_10"><b>更新后取消订购量：</b>{{BGInfo.cancelednum_new}}</el-col>
        </el-row>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="BGInfo.fstatus == 2 || BGInfo.fstatus == 3" disabled>{{BGInfo.fstatus == 2 ? '已同意' : '已不同意'}}</el-button>
        <el-button v-if="BGInfo.fstatus != 2 && BGInfo.fstatus != 3" @click="agreeOrNot(3)">不同意</el-button>
        <el-button v-if="BGInfo.fstatus != 2 && BGInfo.fstatus != 3" type="primary" @click="agreeOrNot(2)">同 意</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { secondToFormat } from '../../util/utils'
export default {
  name: 'Index',
  data () {
    return {
      messageStutus: 0,
      BGDialogVisible: false,
      messageList: [],
      statusList: [
        {label: '未读', value: 0},
        {label: '已读', value: 1}
      ],
      curPage: 1,
      pageSize: 10,
      sum: 0,
      BGInfo: {} // 变更单信息
    }
  },
  computed: {
    ...mapState({
      userCode: state => state.userCode
    })
  },
  created () {
    this.getMessageList()
  },
  components: {
  },
  methods: {
    changeFilterStutus () {
      this.curPage = 1
      this.getMessageList()
    },
    getMessageList (DATE) {
      this.Http.get('messagelist', {code: this.userCode, page_num: this.curPage, number: this.pageSize, fstatus: this.messageStutus}
      ).then(res => {
        if (res.data.code === 1) {
          this.sum = res.data.messageCount
          this.messageList = res.data.messagelist.map(item => {
            item.createDateTxt = secondToFormat(item.create_date.time)
            item.fstatusTxt = (item.fstatus === '0' ? '未读' : '已读')
            item.orderTypeTxt = item.order_type === '1' ? '采购订单' : (item.order_type === '2' ? '采购订单变更' : (item.order_type === '3' ? '送货单' : (item.order_type === '4' ? '供应商审核 ' : (item.order_type === '5' ? '采购订单计划 ' : '其他'))))
            return item
          })
        } else {
          this.$message({
            message: '获取消息失败!',
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
    handleCurrentChange () {
      this.getMessageList()
    },
    changeToReaded (row) {
      if (row.fstatus === '0') {
        this.Http.post('updateStatus?id=' + row.id + '&fstatus=1'
        ).then(res => {
          switch (res.data.code) {
            case 1:
              // this.$message({
              //   message: '标记为已读!',
              //   type: 'success'
              // })
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
      this.$alert(row.message_content, '消息内容', {
        confirmButtonText: '知道了',
        callback: action => {
          this.getMessageList()
        }
      })
    },
    // 查看变更单
    seeChangeOrder (row) {
      this.BGDialogVisible = true
      this.getBGInfo(row.source_id)
    },
    agreeOrNot (status) {
      this.Http.post('updateChangeStatus?id=' + this.BGInfo.id + '&fstatus=' + status
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.$message({
              message: '变更操作成功!',
              type: 'success'
            })
            this.BGDialogVisible = false
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
    getBGInfo (sourceId) {
      this.Http.get('serChangeBymsgid', {source_id: sourceId}
      ).then(res => {
        if (res.data.code === 1) {
          let Info = res.data.changeinfo
          Info.requestarrivedate_oldTxt = secondToFormat(Info.requestarrivedate_old.time)
          Info.requestarrivedate_newTxt = secondToFormat(Info.requestarrivedate_new.time)
          this.BGInfo = Info
        } else {
          this.$message({
            message: '获取变更单信息失败!',
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
.Message{
  width: 95%;
  margin: 0 auto 24px auto;
}

</style>
