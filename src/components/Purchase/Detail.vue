<template>
  <el-dialog title="采购单录入" :visible.sync="dialogFormVisible" fullscreen>
    <!-- <el-form :model="Form" :rules="rules" ref="Form" label-width="80px" label-position="left">
      <el-form-item label="证件名称" prop="certificateName">
        <el-input v-model="Form.certificateName" placeholder="请输入证件名称"></el-input>
      </el-form-item>
      <el-form-item label="有效期" prop="certificateValidity">
        <el-date-picker style="width: 100%;"
          v-model="Form.certificateValidity"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择有效期">
        </el-date-picker>
      </el-form-item>
    </el-form> -->
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="Submit('Form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddCertificate',
  props: ['maxforder'],
  data () {
    return {
      dialogFormVisible: true
      // Form: {
      //   certificateName: '',
      //   certificateValidity: '',
      //   file: ''
      //   // fileUrl: ''
      // },
      // originFileName: '',
      // rules: {
      //   certificateName: [
      //     { required: true, message: '请输入证件名称', trigger: 'change' }
      //   ],
      //   certificateValidity: [
      //     { required: true, message: '请选择证件有效期', trigger: 'change' }
      //   ],
      //   file: [
      //     { required: true, message: '请选择要上传的证件资料', trigger: 'change' }
      //   ]
      // }
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
    Submit () {}
  }
}
</script>

<style lang="less" scoped>
</style>
