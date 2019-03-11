<template>
  <div class="BasicInfo">
    <el-form label-position="top" label-width="95px" :model="basicInfo">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BasicInfo',
  data () {
    return {
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
