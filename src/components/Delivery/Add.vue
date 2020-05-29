<template>
  <div>
   <el-dialog class="AddDialog" title="送货单录入" :visible.sync="addDialogVisible" fullscreen @close="close">
      <!-- topInfo -->
      <el-row style="background: #eee;padding: 5px 0;margin-top: 10px;">
        <el-form id="AddDeliveryForm" :model="Form" :rules="rules" ref="Form" label-width="150px" label-position="right">
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="制单时间: " prop="zdDate" size="mini">
              <el-date-picker
                v-model="Form.zdDate"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                disabled
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="制单人: " prop="zdrName" size="mini">
              <el-input v-model="zdrName" size="mini" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>

          <!-- <el-col :span="12" class="TextAlignL">
            <el-form-item label="采购单号: " prop="cgorderno" size="mini">
              <el-input v-model="Form.cgorderno" size="mini" disabled></el-input>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="12" class="TextAlignL">
            <el-form-item label="送货单号: " prop="shorderno" size="mini">
              <el-input v-model="Form.shorderno" size="mini" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-divider></el-divider>
          </el-col> -->

          <el-col :span="12" class="TextAlignL">
            <el-form-item label="送货时间: " prop="shDate" size="mini">
              <el-date-picker
                v-model="Form.shDate"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="供应商全称: " prop="supplierFullName" size="mini">
              <el-input v-model="Form.supplierFullName" size="mini" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>

          <el-col :span="12" class="TextAlignL">
            <el-form-item label="收货联系人: " prop="shlxr" size="mini">
              <el-input v-model="Form.shlxr" size="mini" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="收货人电话: " prop="shtel" size="mini">
              <el-input v-model="Form.shtel" size="mini" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>

          <el-col :span="12" class="TextAlignL">
            <el-form-item label="收货人传真: " prop="shfax" size="mini">
              <el-input v-model="Form.shfax" size="mini" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="收货人地址 : " prop="shaddress" size="mini">
              <el-input v-model="Form.shaddress" size="mini" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="送货单号: " prop="shorderno" size="mini">
              <el-input v-model="Form.shorderno" size="mini" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>

          <el-col :span="12" class="TextAlignL">
            <el-form-item label="备注: " prop="note" size="mini">
              <el-input v-model="Form.note" size="mini" type="textarea" :rows="2" clearable></el-input>
            </el-form-item>
          </el-col>

        </el-form>
      </el-row>
      <!-- bottomList -->
      <el-row class="AddListBlock">
        <!-- bt -->
        <el-col :span="24" class="TextAlignL MarginT_10">
          <el-button class="MarginL_0_N" size="mini" icon='el-icon-plus' @click="toChoose">选择</el-button>
          <!-- <el-button class="MarginL_0_N" size="mini" icon="el-icon-delete" @click="deleteLine">删除</el-button> -->
        </el-col>
        <!-- list -->
        <el-col :span="24" class="ListColumnHead">
          <span>序号</span>
          <span>操作 </span>
          <span>物料编号</span>
          <span>规格</span>
          <span>版本号</span>
          <span>单位</span>
          <span>材质</span>
          <span>已送货数量</span>
          <span>未送货数量</span>
          <span>送货数量</span>
          <span>备注</span>
        </el-col>
        <el-col :span="24" class="ListItem" v-for="(item, idx) in addList" :key="idx">
          <span>{{idx + 1}}</span>
          <span><el-checkbox v-model="item.checked"></el-checkbox></span>
          <span><el-input v-model="item.matcode" size="mini" disabled></el-input></span>
          <span><el-input v-model="item.norms" size="mini" disabled></el-input></span>
          <span><el-input v-model="item.version" size="mini" disabled></el-input></span>
          <span><el-input v-model="item.units" size="mini" disabled></el-input></span>
          <span><el-input v-model="item.stuff" size="mini" disabled></el-input></span>
          <span><el-input v-model="item.shnum" size="mini" disabled></el-input></span>
          <span><el-input v-model="item.wshnum" size="mini" disabled></el-input></span>
          <span><el-input size="mini" v-model="inputAmountList[idx]" clearable></el-input></span>
          <span><el-input v-model="item.fnote" size="mini" disabled></el-input></span>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer TextAlignC">
        <el-button type="primary" @click="Submit('Form')">提交</el-button>
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 采购单选择列表 -->
    <CgList v-if="ifShowCgList" :copySelectedAllList="copySelectedAllList" @toggleCgListDialog="toggleCgListDialog" @updateCgList="updateCgList"/>
  </div>
</template>

<script>
import CgList from '../../components/Delivery/CgList'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddPurchase',
  data () {
    return {
      addDialogVisible: true,
      ifShowCgList: false,
      checked: true,
      Form: {
        zdDate: '',
        cgorderno: '',
        shorderno: '',
        shDate: '',
        supplierFullName: '',
        supplierShortName: '',
        providercode: '',
        contacts: '',
        tel: '',
        fax: '',
        address: '',
        shlxr: '',
        shfax: '',
        shtel: '',
        shaddress: '',
        note: ''
      },
      rules: {
        shDate: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      },
      copySelectedAllList: [], // 之前更新过来的所有选择的项
      addList: [],
      inputAmountList: [], // 输入数量
      selectedList: []
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      zdrName: state => state.zdrName
    })
  },
  components: {
    CgList
  },
  methods: {
    ...mapActions([
      'toggleLoadingBt'
    ]),
    toggleCgListDialog (val) {
      this.ifShowCgList = val
    },
    updateCgList (val) {
      // this.copySelectedAllList = val.slice(0)
      let temp = []
      val.map(Outer => {
        Outer.map(item => {
          this.inputAmountList.push('')
          temp.push(item)
        })
      })
      if (temp.length > 0) {
        // this.Form.cgorderno = temp[0].cgorderno
        this.Form.supplierFullName = temp[0].providerfullname
        this.Form.supplierShortName = temp[0].providername
        this.Form.providercode = temp[0].providercode
        this.Form.contacts = temp[0].providerproxy
        this.Form.tel = temp[0].tel
        this.Form.fax = temp[0].fax
        this.Form.address = temp[0].address
        this.Form.shlxr = temp[0].shlxr
        this.Form.shfax = temp[0].shfax
        this.Form.shtel = temp[0].shtel
        this.Form.shaddress = temp[0].shaddress
      }
      this.addList = temp
    },
    toChoose () {
      this.ifShowCgList = true
    },
    // addOne () {
    //   this.addList.push({
    //     checked: false,
    //     wlbh: '',
    //     model: '',
    //     cz: '',
    //     th: '',
    //     version: '',
    //     amount: '',
    //     unit: '',
    //     price: '',
    //     sum: '',
    //     date: ''
    //   })
    // },
    deleteLine () {
      let selected = this.addList.filter((item) => {
        return item.checked
      })
      if (selected.length === 0) {
        this.$message({
          message: '请选择要删除的项!',
          type: 'warning'
        })
      } else {
        this.addList.map((item, idx) => {
          if (item.checked) {
            this.addList.splice(idx, 1)
          }
        })
      }
    },
    close () {
      this.$emit('toggleAddDialog', false)
    },
    Submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addList.length === 0) {
            this.$message({
              message: '至少添加一条采购信息!',
              type: 'warning'
            })
            return false
          }
          // 输入数量为空校验
          for (let i = 0; i < this.addList.length; i++) {
            if (!this.inputAmountList[i]) {
              this.$message({
                message: '请将送货数量不能为空!',
                type: 'warning'
              })
              return false
              // break
            }
            if (this.inputAmountList[i] > this.addList[i].wshnum) {
              this.$message({
                message: '送货数量不能大于未收货数量!',
                type: 'warning'
              })
              return false
            }
          }
          let detailTemp = []
          this.addList.map((item, idx) => {
            detailTemp.push({
              cgorderentryid: item.entryid,
              cgorderid: item.id,
              matcode: item.matcode,
              matname: item.matname,
              version: item.version,
              units: item.units,
              stuff: item.stuff,
              shnum: this.inputAmountList[idx],
              norms: item.norms,
              fnote: item.fnote
            })
          })
          let DATA = {
            songhuodate: this.Form.shDate,
            providerfullname: this.Form.supplierFullName,
            providername: this.Form.supplierShortName,
            providercode: this.Form.providercode,
            providerproxy: this.Form.contacts,
            shlxr: this.Form.shlxr,
            shfax: this.Form.shfax,
            shtel: this.Form.shtel,
            shaddress: this.Form.shaddress,
            faddress: this.Form.address,
            fax: this.Form.fax,
            tel: this.Form.tel,
            fnote: this.Form.note,
            orderdetaillist: detailTemp
          }
          this.sureSend(JSON.stringify(DATA))
        } else {
          this.$message({
            message: '请选择送货时间!',
            type: 'warning'
          })
        }
      })
    },
    sureSend (DATA) {
      this.Http.post('insertSonghuoOrder', DATA
      ).then(res => {
        switch (res.data.code) {
          case 0:
            this.$message({
              message: '送货单录入成功!',
              type: 'success'
            })
            // 刷新信息
            this.close()
            this.$emit('refreshDeliveryOrders')
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
    Submit2 (formName) {
      this.addList.map((item, idx) => {
        if (!item.wlbh && !item.model && !item.cz && !item.th && !item.version && !item.amount && !item.unit && !item.price && !item.sum && !item.date) {
          this.addList.splice(idx, 1)
        }
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addList.length === 0) {
            this.$message({
              message: '至少添加一条采购信息!',
              type: 'warning'
            })
          } else {
            console.log(this.addList)
            // this.$emit('refreshPurchaseOrders')
          }
        } else {
          this.$message({
            message: '请将信息填写完整!',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.AddDialog{
  #AddDeliveryForm{
    .el-input{
      width: 50%;
    }
    .el-form-item{
      margin-bottom: 0px;
    }
    .el-divider--horizontal{
      margin: 5px 0;
    }
  }
  .AddListBlock{
    width: 1375px; /*50 + 30 + 200 + 200 + 80 + 80+ 80 + 200 + 100 + 100 + 200 + (5 * 11)*/
    font-size: 12px;
    .ListColumnHead{
      background: #eee;
      margin: 2px 0;
      span{
        text-align: left;
        float: left;
        width: 200px;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
      }
      span:nth-of-type(1){
        width: 50px;
      }
      span:nth-of-type(2){
        width: 30px;
      }
      span:nth-of-type(5){
        width: 80px;
      }
      span:nth-of-type(6){
        width: 80px;
      }
      span:nth-of-type(7){
        width: 80px;
      }
      span:nth-of-type(9){
        width: 100px;
      }
      span:nth-of-type(10){
        width: 100px;
      }
    }
    .ListItem{
      span{
        text-align: left;
        float: left;
        width: 200px;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
      }
      span:nth-of-type(1){
        width: 50px;
      }
      span:nth-of-type(2){
        width: 30px;
      }
      span:nth-of-type(5){
        width: 80px;
      }
      span:nth-of-type(6){
        width: 80px;
      }
      span:nth-of-type(7){
        width: 80px;
      }
      span:nth-of-type(9){
        width: 100px;
      }
      span:nth-of-type(10){
        width: 100px;
      }
    }
  }
}
</style>
