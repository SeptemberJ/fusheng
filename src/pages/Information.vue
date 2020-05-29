<template>
  <div class="wrap">
    <div style="width: 100%;"><TopBar/></div>
    <el-row class="Information">
      <el-col :span="24" class="MarginB_20 TextAlignL">
        <h2 style="display: inline-block">补充信息</h2>
        <!-- <span class="MarginL_10 ColorPrimary">( {{checkTips}} )</span> -->
      </el-col>
      <el-col :span="24">
        <el-form :model="Form" :rules="rules" ref="Form" label-position="left" label-width="95px" class="demo-ruleForm">
          <el-form-item label="基本信息">
          </el-form-item>
          <el-form-item label="联系人" prop="contacts">
            <el-input v-model="Form.contacts" placeholder="请输入联系人" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="Form.phone" placeholder="请输入手机号" clearable></el-input>
          </el-form-item>
          <el-form-item label="固定电话" prop="fixedPhone">
            <el-input v-model="Form.fixedPhone" placeholder="固定电话" clearable></el-input>
          </el-form-item>
          <el-form-item label="传真" prop="fax">
            <el-input v-model="Form.fax" placeholder="请输入传真" clearable></el-input>
          </el-form-item>
           <el-form-item label="地址" prop="address">
            <el-input v-model="Form.address" placeholder="请输入地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="Form.mail" placeholder="请输入邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item label="备用邮箱1" prop="mail1">
            <el-input v-model="Form.mail1" placeholder="请输入邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item label="备用邮箱2" prop="mail2">
            <el-input v-model="Form.mail2" placeholder="请输入邮箱" clearable></el-input>
          </el-form-item>

          <el-form-item label="公司资料">
          </el-form-item>
          <el-form-item label="营业执照" prop="address" class="TextAlignR">
            <el-input v-model="Form.licenseFileName" placeholder="请输入文件名称" clearable style="width: 200px;"></el-input>
            <el-date-picker style="width: 150px;"
              v-model="Form.licenseClosingDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择有效期">
            </el-date-picker>
            <el-upload
              class="upload-demo"
              :on-success="uploadSuccessLicense"
              :on-remove="removeLicense"
              :action="urlPre + 'uploadFile'">
              <el-button size="small">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="公司简介">
            <el-input v-model="Form.companyFileName" placeholder="请输入文件名称" clearable></el-input>
            <el-upload
              class="upload-demo TextAlignR"
              :action="urlPre + 'uploadFile'"
              :on-success="uploadSuccessCompany"
              :on-remove="removeCompany"
              :limit="1">
              <el-button size="small">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="质量证书" class="TextAlignR">
            <el-input v-model="Form.certificateFileName" placeholder="请输入文件名称" clearable style="width: 200px;"></el-input>
            <el-date-picker style="width: 150px;"
              v-model="Form.certificateClosingDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择有效期">
            </el-date-picker>
            <el-upload
              class="upload-demo"
              :limit="1"
              :on-success="uploadSuccessCertificate"
              :on-remove="removeCertificate"
              :action="urlPre + 'uploadFile'">
              <el-button size="small">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="设备清单">
            <el-input v-model="Form.equipmentFileName" placeholder="请输入文件名称" clearable></el-input>
            <el-upload
              class="upload-demo TextAlignR"
              :action="urlPre + 'uploadFile'"
              :on-success="uploadSuccessEquipment"
              :on-remove="removeEquipment"
              :limit="1">
              <el-button size="small">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="开户银行" prop="bank">
            <el-input v-model="Form.bank" placeholder="请输入开户银行" clearable></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="bankAccount">
            <el-input v-model="Form.bankAccount" placeholder="请输入银行账号" clearable></el-input>
          </el-form-item>
          <el-form-item label="信用机构号" prop="creditInstitutionNumber">
            <el-input v-model="Form.creditInstitutionNumber" placeholder="请输入信用机构号" clearable></el-input>
          </el-form-item>
          <el-button type="primary" :loading="btLoading" class="bt" @click="Submit('Form')">提交</el-button>
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
        fixedPhone: '',
        fax: '',
        email: '',
        email1: '',
        email2: '',
        address: '',
        // 营业执照
        licenseFileName: '',
        licenseClosingDate: '',
        licenseFileUrl: '',
        // 公司简介
        companyFileName: '',
        companyFileUrl: '',
        // 质量证书
        certificateFileName: '',
        certificateClosingDate: '',
        certificateFileUrl: '',
        // 设备清单
        equipmentFileName: '',
        equipmentFileUrl: '',
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
        ]
      },
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  computed: {
    ...mapState({
      urlPre: state => state.urlPre,
      userCode: state => state.userCode,
      userId: state => state.userId,
      userName: state => state.userName,
      btLoading: state => state.btLoading
    })
  },
  created () {
    // this.getInformaion()
  },
  components: {
    TopBar
  },
  methods: {
    ...mapActions([
      'toggleLoadingBt'
    ]),
    uploadSuccessLicense (response, file, fileList, pp) {
      this.Form.licenseFileUrl = response.filePath
    },
    uploadSuccessCompany (response, file, fileList, pp) {
      this.Form.companyFileUrl = response.filePath
    },
    uploadSuccessCertificate (response, file, fileList, pp) {
      this.Form.certificateFileUrl = response.filePath
    },
    uploadSuccessEquipment (response, file, fileList, pp) {
      this.Form.equipmentFileUrl = response.filePath
    },
    removeLicense () {
      this.Form.licenseFileUrl = ''
    },
    removeCompany () {
      this.Form.companyFileUrl = ''
    },
    removeCertificate () {
      this.Form.certificateFileUrl = ''
    },
    removeEquipment () {
      this.Form.equipmentFileUrl = ''
    },
    Submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.Form)
          // 要上传就必须名称 文件具备
          if (!this.Form.licenseFileName || !this.Form.licenseClosingDate || !this.Form.licenseFileUrl) {
            this.$message({
              message: '请将营业执照的信息填写完整!',
              type: 'warning'
            })
            return false
          }
          if ((!this.Form.companyFileName && this.Form.companyFileUrl) || (this.Form.companyFileName && !this.Form.companyFileUrl)) {
            this.$message({
              message: '若要上传公司简介，请将信息补充完整!',
              type: 'warning'
            })
            return false
          }
          if ((!this.Form.certificateFileName && !this.Form.certificateClosingDate && !this.Form.certificateFileUrl) || (this.Form.certificateFileName && this.Form.certificateClosingDate && this.Form.certificateFileUrl)) {
            // ok
          } else {
            this.$message({
              message: '若要上传质量证书，请将信息补充完整!',
              type: 'warning'
            })
            return false
          }
          if ((!this.Form.equipmentFileName && this.Form.equipmentFileUrl) || (this.Form.equipmentFileName && !this.Form.equipmentFileUrl)) {
            this.$message({
              message: '若要上传设备列表，请将信息补充完整!',
              type: 'warning'
            })
            return false
          }
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
      // this.toggleLoadingBt(true)
      let Data = {
        jsonPost: {
          id: this.userId,
          code: this.userCode,
          fname: this.userName,
          fpeople: this.Form.contacts,
          fphone: this.Form.phone,
          fphone1: this.Form.fixedPhone,
          fax: this.Form.fax,
          address: this.Form.address,
          bank: this.Form.bank,
          bankaccount: this.Form.bankAccount,
          emil: this.Form.mail,
          emil1: this.Form.mail1,
          emil2: this.Form.mail2,
          institution: this.Form.creditInstitutionNumber,
          gysfiles: [{
            forder: 1,
            imagename: this.Form.licenseFileName,
            image: this.Form.licenseFileUrl,
            effective_date: this.Form.licenseClosingDate
          }, {
            forder: 2,
            imagename: this.Form.companyFileName,
            image: this.Form.companyFileUrl,
            effective_date: ''
          }, {
            forder: 3,
            imagename: this.Form.certificateFileName,
            image: this.Form.certificateFileUrl,
            effective_date: this.Form.certificateClosingDate
          }, {
            forder: 4,
            imagename: this.Form.equipmentFileName,
            image: this.Form.equipmentFileUrl,
            effective_date: ''
          }]
        }
      }
      this.Http.post('updategys', Data
      ).then(res => {
        switch (res.data.result) {
          case '1':
            this.$message({
              message: '信息提交成功!',
              type: 'success'
            })
            this.$router.push({name: 'Login'})
            // 刷新信息
            // this.getInformaion()
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
      this.Http.get('sergys', {gysid: this.userId}
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
    /**
    max-width: 650px;
    **/
    width: 95%;
    max-width: 588px;
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
