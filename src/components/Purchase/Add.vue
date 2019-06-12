<template>
  <el-dialog class="AddDialog" title="采购单录入" :visible.sync="dialogFormVisible" fullscreen>
    <!-- topInfo -->
    <el-row style="background: #eee;padding: 5px 0;margin-top: 10px;">
      <el-form id="AddPurchaseForm" :model="Form" :rules="rules" ref="Form" label-width="120px" label-position="right">
        <el-col :span="12">
          <el-form-item label="订单号: " prop="orderNo" size="mini">
            <el-input v-model="Form.orderNo" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="日期: " prop="date" size="mini">
            <el-input v-model="Form.date" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>

        <el-col :span="12">
          <el-form-item label="供应商: " prop="supplier" size="mini">
            <el-input v-model="Form.supplier" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人: " prop="contacts" size="mini">
            <el-input v-model="Form.contacts" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>

        <el-col :span="12">
          <el-form-item label="电话: " prop="tel" size="mini">
            <el-input v-model="Form.tel" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="传真: " prop="fax" size="mini">
            <el-input v-model="Form.fax" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>

        <el-col :span="12">
          <el-form-item label="收货联系人: " prop="receivingContact" size="mini">
            <el-input v-model="Form.receivingContact" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址: " prop="address" size="mini">
            <el-input v-model="Form.address" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>

        <el-col :span="12">
          <el-form-item label="电话: " prop="receivingTel" size="mini">
            <el-input v-model="Form.receivingTel" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="传真: " prop="receivingFax" size="mini">
            <el-input v-model="Form.receivingFax" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>

        <el-col :span="12">
          <el-form-item label="采购单号: " prop="purchasingOrderNo" size="mini">
            <el-input v-model="Form.purchasingOrderNo" size="mini" clearable></el-input>
          </el-form-item>
        </el-col>

      </el-form>
    </el-row>
    <!-- bottomList -->
    <el-row class="AddListBlock">
      <!-- bt -->
      <el-col :span="24" class="TextAlignL MarginT_10">
        <el-button class="MarginL_0_N" size="mini" icon='el-icon-plus' @click="addOne">添加</el-button>
        <el-button class="MarginL_0_N" size="mini" icon="el-icon-delete" @click="deleteLine">删除</el-button>
      </el-col>
      <!-- list -->
      <el-col :span="24" class="ListColumnHead">
        <span>序号</span>
        <span>操作 </span>
        <span>物料编号</span>
        <span>规格</span>
        <span>材质</span>
        <span>图号</span>
        <span>版本号</span>
        <span>数量</span>
        <span>单位</span>
        <span>未税单价</span>
        <span>价税合计</span>
        <span>预到日期</span>
      </el-col>
      <el-col :span="24" class="ListItem" v-for="(item, idx) in addList" :key="idx">
        <span>{{idx + 1}}</span>
        <span><el-checkbox v-model="item.checked"></el-checkbox></span>
        <span><el-input v-model="item.wlbh" size="mini" clearable></el-input></span>
        <span><el-input v-model="item.model" size="mini" clearable></el-input></span>
        <span><el-input v-model="item.cz" size="mini" clearable></el-input></span>
        <span><el-input v-model="item.th" size="mini" clearable></el-input></span>
        <span><el-input v-model="item.version" size="mini" clearable></el-input></span>
        <span><el-input v-model="item.amount" size="mini" clearable></el-input></span>
        <span><el-input v-model="item.unit" size="mini" clearable></el-input></span>
        <span><el-input v-model="item.price" size="mini" clearable></el-input></span>
        <span><el-input v-model="item.sum" size="mini" clearable></el-input></span>
        <span>
          <el-date-picker
            v-model="item.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
            size="mini"
            type="date">
          </el-date-picker>
        </span>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer TextAlignC">
      <el-button type="primary" @click="Submit('Form')">提交</el-button>
      <el-button @click="Close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddPurchase',
  props: ['maxforder'],
  data () {
    return {
      dialogFormVisible: true,
      checked: true,
      Form: {
        orderNo: '',
        date: '',
        supplier: '',
        contacts: '',
        tel: '',
        fax: '',
        receivingContact: '',
        address: '',
        receivingTel: '',
        receivingFax: '',
        purchasingOrderNo: ''
      },
      rules: {
        orderNo: [
          { required: true, message: '请输入订单号', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请输入日期', trigger: 'change' }
        ],
        supplier: [
          { required: true, message: '请输入供应商', trigger: 'change' }
        ],
        contacts: [
          { required: true, message: '请输入联系人', trigger: 'change' }
        ],
        tel: [
          { required: true, message: '请输入电话', trigger: 'change' }
        ],
        fax: [
          { required: true, message: '请输入传真', trigger: 'change' }
        ],
        receivingContact: [
          { required: true, message: '请输入收货联系人', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        receivingTel: [
          { required: true, message: '请输入电话', trigger: 'change' }
        ],
        receivingFax: [
          { required: true, message: '请输入传真', trigger: 'change' }
        ],
        purchasingOrderNo: [
          { required: true, message: '请输入采购单号', trigger: 'change' }
        ]
      },
      addList: [
        {
          xuhao: 1,
          checked: false,
          wlbh: 'BH123',
          model: 'MD1293',
          cz: '材质',
          th: '093',
          version: '1.0.0',
          amount: 11,
          unit: 'kg',
          price: 2000,
          sum: 20000,
          date: '2019-06-06'
        }
      ],
      selectedList: []
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  watch: {
    dialogFormVisible: function (newVal, oldVal) {
      this.$emit('toggleAddDialog', newVal)
      this.$emit('refreshPurchaseOrders')
    }
  },
  methods: {
    ...mapActions([
      'toggleLoadingBt'
    ]),
    addOne () {
      this.addList.push({
        checked: false,
        wlbh: '',
        model: '',
        cz: '',
        th: '',
        version: '',
        amount: '',
        unit: '',
        price: '',
        sum: '',
        date: ''
      })
    },
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
    Close () {
      this.$emit('toggleAddDialog')
    },
    Submit (formName) {
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
  #AddPurchaseForm{
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
    width: 1170px;
    font-size: 12px;
    .ListColumnHead{
      background: #eee;
      margin: 2px 0;
      span{
        text-align: left;
        float: left;
        width: 100px;
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
      span:nth-of-type(12){
        width: 130px;
      }
    }
    .ListItem{
      span{
        text-align: left;
        float: left;
        width: 100px;
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
      span:nth-of-type(12){
        width: 130px;
      }
    }
  }
}
</style>
