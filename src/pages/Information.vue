<template>
  <div class="wrap">
    <div style="width: 100%;"><TopBar/></div>
    <el-row class="Information">
      <el-col :span="24" class="MarginB_20 TextAlignL">
        <h2 style="display: inline-block">补充信息</h2> <span class="MarginL_10 ColorPrimary">( {{checkTips}} )</span>
      </el-col>
      <el-col :span="24">
        <el-form :model="Form" :rules="rules" ref="Form" label-position="left" label-width="95px" class="demo-ruleForm">
          <el-form-item label="联系人" prop="contacts">
            <el-input v-model="Form.contacts" placeholder="请输入联系人" clearable :disabled="!ifCanModify"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="Form.phone" placeholder="请输入手机号" clearable :disabled="!ifCanModify"></el-input>
          </el-form-item>
          <el-form-item label="传真" prop="fax">
            <el-input v-model="Form.fax" placeholder="请输入传真" clearable :disabled="!ifCanModify"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="Form.mail" placeholder="请输入邮箱" clearable :disabled="!ifCanModify"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="Form.address" placeholder="请输入地址" clearable :disabled="!ifCanModify"></el-input>
          </el-form-item>
          <el-form-item label="开户银行" prop="bank">
            <el-input v-model="Form.bank" placeholder="请输入开户银行" clearable :disabled="!ifCanModify"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="bankAccount">
            <el-input v-model="Form.bankAccount" placeholder="请输入银行账号" clearable :disabled="!ifCanModify"></el-input>
          </el-form-item>
          <el-form-item label="税号" prop="dutyParagraph">
            <el-input v-model="Form.dutyParagraph" placeholder="请输入税号" clearable :disabled="!ifCanModify"></el-input>
          </el-form-item>
          <el-form-item label="信用机构号" prop="creditInstitutionNumber">
            <el-input v-model="Form.creditInstitutionNumber" placeholder="请输入信用机构号" clearable :disabled="!ifCanModify"></el-input>
          </el-form-item>
          <el-button type="primary" :loading="btLoading" :disabled="!ifCanModify" class="bt" @click="Submit('Form')">提交</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TopBar from '../components/TopBar.vue'
export default {
  name: 'Information',
  data () {
    var validatePhone = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入手机号！'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      checkTips: '您的信息正在等待审核',
      ifCanModify: true,
      Form: {
        contacts: '',
        phone: '',
        fax: '',
        mail: '',
        address: '',
        bank: '',
        bankAccount: '',
        dutyParagraph: '',
        creditInstitutionNumber: ''
      },
      rules: {
        contacts: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        fax: [
          { required: true, message: '请输入传真', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, message: '请输入银行账号', trigger: 'blur' }
        ],
        dutyParagraph: [
          { required: true, message: '请输入税号', trigger: 'blur' }
        ],
        creditInstitutionNumber: [
          { required: true, message: '请输入信用机构号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userCode: state => state.userCode,
      userName: state => state.userName,
      btLoading: state => state.btLoading
    })
  },
  created () {
    this.getInformaion()
  },
  components: {
    TopBar
  },
  methods: {
    ...mapActions([
      'toggleLoadingBt'
    ]),
    Submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sureSubmit()
        } else {
          this.$message({
            message: '请确认您输入的信息!',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 提交信息
    sureSubmit () {
      this.toggleLoadingBt(true)
      let Data = {
        code: this.userCode,
        fname: this.userName,
        fpeople: this.Form.contacts,
        fphone: this.Form.phone,
        fax: this.Form.fax,
        address: this.Form.address,
        bank: this.Form.bank,
        bankaccount: this.Form.bankAccount,
        emil: this.Form.mail,
        taxnumber: this.Form.dutyParagraph,
        institution: this.Form.creditInstitutionNumber
      }
      this.Http.post('updategys', Data
      ).then(res => {
        switch (res.data.result) {
          case '1':
            this.$message({
              message: '信息提交成功!',
              type: 'success'
            })
            // 刷新信息
            this.getInformaion()
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
    // 获取补充信息
    getInformaion () {
      this.Http.get('sergys', {code: this.userCode}
      ).then(res => {
        let Info = res.data.arr
        switch (Info.ishege) {
          case '0':
            this.checkTips = '请补充您的信息'
            break
          case '1':
            this.checkTips = '您的信息正在等待审核'
            this.ifCanModify = false
            break
          case '2':
            this.checkTips = '您的信息未通过审核，请重新提交'
            break
          case '3':
            this.$router.push({name: 'Home'})
            break
        }
        this.Form = {
          contacts: Info.fpeople,
          phone: Info.fphone,
          fax: Info.fax,
          mail: Info.emil,
          address: Info.address,
          bank: Info.bank,
          bankAccount: Info.bank_account,
          dutyParagraph: Info.taxnumber,
          creditInstitutionNumber: Info.institution
        }
        this.toggleLoadingBt(false)
      }).catch((error) => {
        this.toggleLoadingBt(false)
        console.log(error)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.wrap{
  padding-bottom: 32px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .Information{
    max-width: 388px;
    width: 95%;
    margin: 0 auto;
    background: transparent;
    .bt{
      width: 100%;
      font-weight: 400;
      letter-spacing: .34em;
    }
  }
}
</style>
