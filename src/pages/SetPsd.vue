<template>
	<div class="wrap">
    <div class="SetPsd">
      <div class="MarginB_20"><h2 class="ColorWhite" style="letter-spacing: .34em;">修改密码</h2></div>
      <el-form :model="Form" :rules="rules" ref="Form" label-width="0px" class="demo-ruleForm">
        <el-form-item label="" prop="accountPsd">
          <el-input v-model="Form.accountPsd" type="password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="accountPsdAgain">
          <el-input v-model="Form.accountPsdAgain" type="password" placeholder="确认密码" clearable></el-input>
        </el-form-item>
        <el-button type="primary" :loading="btLoading" class="bt" @click="ModifyPsd('Form')">保存</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SetPsd',
  data () {
    var validatePsd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePsdAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.Form.accountPsd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      Form: {
        accountPsd: '',
        accountPsdAgain: ''
      },
      rules: {
        accountPsd: [
          { validator: validatePsd, trigger: 'change' }
        ],
        accountPsdAgain: [
          { validator: validatePsdAgain, trigger: 'change' }
        ]
      }

    }
  },
  computed: {
    ...mapState({
      userCode: state => state.userCode,
      btLoading: state => state.btLoading
    })
  },
  methods: {
    ...mapActions([
      'toggleLoadingBt'
    ]),
    checkPsd (PSD) {
      var regu = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/
      if (PSD.length < 6) {
        return false
      }
      if (regu.test(PSD)) {
        return true
      } else {
        return false
      }
    },
    ModifyPsd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.checkPsd(this.Form.accountPsd)) {
            this.$message({
              message: '密码长度不能少于6位,并且必须包含数字和字母!',
              type: 'warning'
            })
            return false
          }
          if (this.Form.accountPsd === this.Form.accountPsdAgain) {
            this.sureModify()
          } else {
            this.$message({
              message: '两次输入的密码不一致!',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '请确认您输入的信息!',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 修改密码
    sureModify () {
      this.toggleLoadingBt(true)
      this.Http.post('updatepassword', {code: this.userCode, password: this.Form.accountPsd}
      ).then(res => {
        switch (res.data.result) {
          case '1':
            this.$message({
              message: '密码修改成功!',
              type: 'success'
            })
            this.$router.push({name: 'Information'})
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
  .SetPsd{
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
