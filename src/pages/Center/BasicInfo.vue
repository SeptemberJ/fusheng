<template>
  <div class="BasicInfo">
    <el-form label-position="top" label-width="95px" :model="basicInfo">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="当前账号" prop="fname">
            <el-input v-model="basicInfo.fname" placeholder="请输入用户名" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" class="TextAlignL">
          <el-form-item label="密码" prop="">
            <el-button type="primary" icon="el-icon-edit" @click="showModify">修改密码</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="联系人" prop="fpeople">
            <el-input v-model="basicInfo.fpeople" placeholder="请输入联系人" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="手机号" prop="fphone">
            <el-input v-model="basicInfo.fphone" placeholder="请输入手机号" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="开户银行" prop="bank">
            <el-input v-model="basicInfo.bank" placeholder="请输入开户银行" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="银行账号" prop="bank_account">
            <el-input v-model="basicInfo.bank_account" placeholder="请输入银行账号" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="税号" prop="taxnumber">
            <el-input v-model="basicInfo.taxnumber" placeholder="请输入税号" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="信用机构号" prop="institution">
            <el-input v-model="basicInfo.institution" placeholder="请输入信用机构号" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="传真" prop="fax">
            <el-input v-model="basicInfo.fax" placeholder="请输入传真" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="邮箱" prop="emil">
            <el-input v-model="basicInfo.emil" placeholder="请输入邮箱" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="地址" prop="address">
            <el-input v-model="basicInfo.address" placeholder="请输入地址" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      title="修改密码"
      :close-on-click-modal="false"
      :visible.sync="ifModifyPsd"
      width="450px"
      center>
      <div>
        <el-form :model="formModify" :rules="rulesModify" ref="formModify" label-width="100px" class="demo-ruleForm">
          <el-form-item label="新密码" prop="psd">
            <el-input type="password" v-model="formModify.psd" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="psdAgain">
            <el-input type="password" v-model="formModify.psdAgain" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifyPsd('formModify')">确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {clearCookie} from '../../util/utils'
export default {
  name: 'BasicInfo',
  data () {
    return {
      ifModifyPsd: false,
      formModify: {
        psd: '',
        psdAgain: ''
      },
      rulesModify: {
        psd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        psdAgain: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ]
      },
      basicInfo: {}
    }
  },
  created () {
    this.getBasicInfo()
  },
  computed: {
    ...mapState({
      userCode: state => state.userCode
    })
  },
  methods: {
    getBasicInfo () {
      this.Http.get('sergys', {code: this.userCode}
      ).then(res => {
        this.basicInfo = res.data.arr
      }).catch((error) => {
        console.log(error)
      })
    },
    showModify () {
      this.ifModifyPsd = true
    },
    checkPsd (PSD) {
      var regu = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/
      // var re = new RegExp(regu)
      if (PSD.length < 6) {
        return false
      }
      if (regu.test(PSD)) {
        return true
      } else {
        return false
      }
    },
    modifyPsd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.checkPsd(this.formModify.psd)) {
            this.$message({
              message: '密码长度不能少于6位,并且必须包含数字和字母!',
              type: 'warning'
            })
            return false
          }
          if (this.formModify.psd === this.formModify.psdAgain) {
            this.sureModify()
          } else {
            this.$message({
              message: '两次输入的密码不一致!',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '请将信息填写完整!',
            type: 'warning'
          })
          return false
        }
      })
    },
    sureModify () {
      this.Http.post('updatepassword', {code: this.userCode, password: this.formModify.psd}
      ).then(res => {
        switch (res.data.result) {
          case '1':
            this.$message({
              message: '密码修改成功!',
              type: 'success'
            })
            // 退出登陆
            localStorage.clear('vuex-along')
            this.$router.push({name: 'Login'})
            clearCookie('Fs_14a808c40bba58c2c')
            this.hideNotice()
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
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.BasicInfo{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: @Padding;
}
</style>
