<template>
	<div class="wrap">
    <div class="Login">
      <div class="MarginB_20"><h2 class="ColorWhite" style="letter-spacing: .34em;">用户登陆</h2></div>
      <el-form :model="Form" :rules="rules" ref="Form" label-width="0px" class="demo-ruleForm">
        <el-form-item label="" prop="accountName">
          <el-input v-model="Form.accountName" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="accountPsd">
          <el-input v-model="Form.accountPsd" type="password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-button type="primary" :loading="btLoading" class="bt" @click="Login('Form')">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {setCookie} from '../util/utils'
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
      Form: {
        accountName: 'fushen11', // fushen11
        accountPsd: '111111' // 111111
      },
      rules: {
        accountName: [
          { validator: validateName, trigger: 'change' }
        ],
        accountPsd: [
          { validator: validatePsd, trigger: 'change' }
        ]
      }

    }
  },
  computed: {
    ...mapState({
      btLoading: state => state.btLoading
    })
  },
  methods: {
    ...mapActions([
      'unitUserInfo',
      'toggleLoadingBt'
    ]),
    Login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sureLogin()
        } else {
          this.$message({
            message: '请输入用户名或密码!',
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
        switch (res.data.result) {
          case 1:
            setCookie('btwccy_cookie', res.data.token, 6)
            let Info = res.data.loginlist[0]
            console.log(Info)
            this.unitUserInfo({code: Info.code, name: Info.fname, id: Info.id})
            // this.unitCode(Info.code)
            // this.unitUserName(Info.fname)
            // 强制修改密码 checkstatus 0 未改过密码 1 已修改
            if (Info.checkstatus === '0') {
              this.$router.push({name: 'SetPsd'})
            }
            // 已修改过密码
            if (Info.checkstatus === '1') {
              // 补充信息 ishege 0 补充信息 1 正在审核 2 未通过重新提交 3 已通过
              if (Info.ishege === '3') {
                // 审核通过进入主页
                this.$router.push({name: 'Home'})
              } else {
                this.$router.push({name: 'Information'})
              }
            }
            this.toggleLoadingBt(false)
            break
          default:
            this.$message({
              message: res.data.message + '!',
              type: 'error'
            })
            this.toggleLoadingBt(false)
        }
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
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    .bt{
      width: 100%;
      font-weight: 400;
      letter-spacing: .34em;
    }
  }
}
</style>
