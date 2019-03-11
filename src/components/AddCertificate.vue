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
          placeholder="选择有效期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="证件资料" prop="certificatePicture">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="beforeUpload">
          <img v-if="Form.certificatePicture" :src="Form.certificatePicture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
import { dateToFormat } from '../util/utils'
export default {
  name: 'AddCertificate',
  // props: ['dialogFormVisible'],
  data () {
    return {
      dialogFormVisible: true,
      formDataImage: '',
      Form: {
        certificateName: '',
        certificateValidity: '',
        certificatePicture: ''
      },
      certificatePictureUrl: '',
      rules: {
        certificateName: [
          { required: true, message: '请输入证件名称', trigger: 'change' }
        ],
        certificateValidity: [
          { required: true, message: '请选择证件有效期', trigger: 'change' }
        ],
        certificatePicture: [
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
      this.toggleLoadingBt(true)
      axios.post(encodeURI('http://plant.fs-elliott.cn:8082/fushengJK/insertphoto?imagename=' + this.Form.certificateName + '&effectivedate=' + dateToFormat(this.Form.certificateValidity) + '&gysid=' + this.userId), this.formDataImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this.$message({
          message: '新增成功!',
          type: 'success'
        })
        this.$emit('toggleAddDialog', false)
        this.$emit('refresh')
        this.toggleLoadingBt(false)
      }).catch((error) => {
        this.toggleLoadingBt(false)
        console.log(error)
      })
    },
    beforeUpload (file) {
      if (file.size > 1024000 * 2) {
        this.$message({
          message: '您上传的图片太大了, 请不要超过2M!',
          type: 'warning'
        })
        return false
      }
      let Image = new FormData()
      Image.append('file', file)
      this.formDataImage = Image
      var _this = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        _this.Form.certificatePicture = this.result
      }
    },
    uploadImg (property, img) {
      // axios.get('http://plant.fs-elliott.cn:8082/fushengJK/uploadBase64?imgStr=' + img, {imgStr: img}, {
      axios.get('http://plant.fs-elliott.cn:8082/fushengJK/uploadBase64', img, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this[property] = res.data.fileName
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
