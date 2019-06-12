<template>
  <el-dialog title="新增证件" :visible.sync="dialogFormVisible" class="AddCertificate" width="450px">
    <el-form :model="Form" :rules="rules" ref="Form" label-width="80px" label-position="left">
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
      <el-form-item label="证件" prop="file">
        <el-upload
          class="upload-demo TextAlignR"
           action=""
          :before-upload="beforeUpload"
          :limit="1">
          {{originFileName}}
          <el-button size="small">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <!-- action="http://plant.fs-elliott.cn:8082/fushengJK/uploadFile" -->
      <!-- <el-form-item label="证件资料" prop="certificatePicture">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="beforeUpload">
          <img v-if="Form.certificatePicture" :src="Form.certificatePicture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="Cancel">取 消</el-button> -->
      <el-button type="primary" @click="Submit('Form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddCertificate',
  props: ['maxforder'],
  data () {
    return {
      dialogFormVisible: true,
      Form: {
        certificateName: '',
        certificateValidity: '',
        file: ''
        // fileUrl: ''
      },
      originFileName: '',
      rules: {
        certificateName: [
          { required: true, message: '请输入证件名称', trigger: 'change' }
        ],
        certificateValidity: [
          { required: true, message: '请选择证件有效期', trigger: 'change' }
        ],
        file: [
          { required: true, message: '请选择要上传的证件资料', trigger: 'change' }
        ]
      }
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
    }
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
    sureSubmit () {
      let curForder = this.maxforder + 1
      this.toggleLoadingBt(true)
      this.Http.post('insertphoto?imagename=' + this.Form.certificateName + '&effectivedate=' + this.Form.certificateValidity + '&gysid=' + this.userId + '&forder=' + curForder, this.Form.file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      ).then(res => {
        if (res.data === 1) {
          this.$message({
            message: '新增成功!',
            type: 'success'
          })
          this.$emit('toggleAddDialog', false)
          this.$emit('refresh')
          this.toggleLoadingBt(false)
        } else {
          this.$message({
            message: '新增失败!',
            type: 'error'
          })
          this.toggleLoadingBt(false)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    sureSubmit2 () {
      let curForder = this.maxforder + 1
      this.toggleLoadingBt(true)
      axios.post(encodeURI('http://plant.fs-elliott.cn:8082/fushengJK/insertphoto?imagename=' + this.Form.certificateName + '&effectivedate=' + this.Form.certificateValidity + '&gysid=' + this.userId + '&forder=' + curForder), this.Form.file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if (res.data === 1) {
          this.$message({
            message: '新增成功!',
            type: 'success'
          })
          this.$emit('toggleAddDialog', false)
          this.$emit('refresh')
          this.toggleLoadingBt(false)
        } else {
          this.$message({
            message: '新增失败!',
            type: 'error'
          })
          this.toggleLoadingBt(false)
        }
      }).catch((error) => {
        this.toggleLoadingBt(false)
        console.log(error)
      })
    },
    beforeUpload (file) {
      this.originFileName = file.name
      let File = new FormData()
      File.append('file', file)
      this.Form.file = File
    }
  }
}
</script>

<style lang="less" scoped>
</style>
