<template>
	<div class="wrap">
    <div class="Login">
      <div class="MarginB_20"><h2 class="ColorWhite" style="letter-spacing: .34em;">用户登陆</h2></div>
      <el-form :model="Form" :rules="rules" ref="Form" label-width="0px" class="demo-ruleForm">
        <el-form-item label="" prop="accountName">
          <el-input v-model="Form.accountName" placeholder="用户名" clearable @keyup.enter.native='enterEvent'></el-input>
        </el-form-item>
        <el-form-item label="" prop="accountPsd">
          <el-input v-model="Form.accountPsd" type="password" placeholder="密码" clearable @keyup.enter.native='enterEvent'></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <el-row>
            <el-col :span="12">
              <el-input v-model="Form.code" placeholder="验证码" clearable @keyup.enter.native='enterEvent' style="width: 200px"></el-input>
            </el-col>
            <el-col :span="12">
              <div class="codeBlock" @click="createCode">{{realCode}}</div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-button type="primary" :loading="btLoading" class="bt" @click="Login('Form')">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {setCookie} from '../util/utils'
import CryptoJS from 'crypto-js'
export default {
  name: 'Login',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePsd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      realCode: '', // 随机验证码
      Form: {
        accountName: '', // SC08A013
        accountPsd: '', // SC08A013
        code: ''
      },
      rules: {
        accountName: [
          { validator: validateName, trigger: 'change' }
        ],
        accountPsd: [
          { validator: validatePsd, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    ...mapState({
      btLoading: state => state.btLoading
    })
  },
  created () {
    this.createCode()
  },
  methods: {
    ...mapActions([
      'unitUserInfo',
      'toggleLoadingBt'
    ]),
    enterEvent () {
      let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode
      if (keyCode === 13) {
        this.Login('Form')
      }
    },
    Login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.Form.code.toUpperCase() === this.realCode.toUpperCase()) {
            this.sureLogin()
          } else {
            this.$message({
              message: '输入的验证码不正确!',
              type: 'warning'
            })
            // 刷新验证码
            this.createCode()
            return false
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
    // 登陆
    sureLogin () {
      this.toggleLoadingBt(true)
      this.Http.get('login', {username: this.Form.accountName, pwd: this.Form.accountPsd}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            let cookieStr = CryptoJS.HmacSHA256((this.Form.accountName + this.Form.accountPsd).toString(), '14a808c40bba58c2c')
            setCookie('Fs_14a808c40bba58c2c', cookieStr, 6)
            let Info = res.data.memberInfo
            this.unitUserInfo({code: Info.code, name: Info.fname, id: Info.id, zdrName: Info.fpeople})
            // 强制修改密码 checkstatus 0 未改过密码 1 已修改
            if (Info.checkstatus === '0') {
              this.$router.push({name: 'SetPsd'})
            } else if (Info.checkstatus === '1') {
              // 已修改过密码未补充信息
              this.$router.push({name: 'Information'})
              // this.$router.push({name: 'Home'})
            } else {
              this.$router.push({name: 'Home'})
            }
            // 已修改过密码
            // if (Info.checkstatus === '1') {
            //   // 补充信息 ishege 0 补充信息 1 正在审核 2 未通过重新提交 3 已通过
            //   if (Info.ishege === '3') {
            //     // 审核通过进入主页
            //     this.$router.push({name: 'Home'})
            //   } else {
            //     this.$router.push({name: 'Information'})
            //   }
            // }
            this.toggleLoadingBt(false)
            break
          default:
            this.$message({
              message: res.data.message + '!',
              type: 'error'
            })
            this.toggleLoadingBt(false)
            // 刷新验证码
            this.createCode()
        }
      }).catch((error) => {
        this.toggleLoadingBt(false)
        console.log(error)
      })
    },
    createCode () {
      let code = ''
      let codeLength = 4
      let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      // let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 10)
        code += random[index]
      }
      this.realCode = code
    }
  }
}
</script>
<style lang="less" scoped>
.wrap{
  width: 100vw;
  height: 100vh;
  background: url('../../static/images/bg.jpg') no-repeat center/cover;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  .Login{
    max-width: 388px;
    width: 70%;
    margin: 0 auto;
    background: transparent;
    padding: 16px 32px 32px 32px;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.3);
    .bt{
      width: 100%;
      font-weight: 400;
      letter-spacing: .34em;
    }
    .codeBlock{
      width: 100px;
      height: 35px !important;
      line-height: 35px;
      float: right;
      border: 1px solid #eee;
      font-family:Arial,宋体;
      font-style:italic;
      color:#fff;
      padding:2px 3px;
      letter-spacing:3px;
      font-weight:bolder;
      cursor: pointer;
    }
  }
}
</style>
