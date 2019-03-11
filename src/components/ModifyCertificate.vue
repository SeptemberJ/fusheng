<template>
  <el-dialog title="修改证件信息" :visible.sync="dialogFormVisible" class="AddCertificate" width="450px">
    <el-form :model="Form" :rules="rules" ref="Form" label-width="80px" label-position="left">
      <el-form-item label="证件名称" prop="certificateName">
        <el-input v-model="Form.certificateName" placeholder="请输入证件名称" disabled></el-input>
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
      <el-button type="primary" :loading="btLoading" @click="Submit('Form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import { dateToFormat } from '../util/utils'
export default {
  name: 'AddCertificate',
  props: ['detailInfo'],
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
      userId: state => state.userId,
      btLoading: state => state.btLoading
    })
  },
  created () {
    console.log(this.detailInfo)
    this.Form.certificateName = this.detailInfo.imagename
    this.Form.certificateValidity = new Date(this.detailInfo.effective_date)
    this.Form.certificatePicture = this.detailInfo.imagelist
  },
  watch: {
    dialogFormVisible: function (newVal, oldVal) {
      this.$emit('toggleAddDialog', newVal)
    }
    // ,
    // detailInfo: function (newVal, oldVal) {
    //   this.Form.certificateName = newVal.imagename
    //   this.Form.certificateValidity = new Date(newVal.effective_date)
    //   this.Form.certificatePicture = newVal.imagelist
    // }
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
      axios.post('http://plant.fs-elliott.cn:8082/fushengJK/updatephoto', {photoid: this.detailInfo.id, effectivedate: dateToFormat(this.Form.certificateValidity), image: this.formDataImage ? this.formDataImage : this.detailInfo.image, gysid: this.userId}
      ).then((res) => {
        switch (res.data.result) {
          case '2':
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
            this.$emit('toggleModifyDialog', false)
            this.$emit('refresh')
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
    },
    beforeUpload (file) {
      console.log(file)
      if (file.size > 1024000 * 2) {
        this.$message({
          message: '您上传的图片太大了, 请不要超过2M!',
          type: 'warning'
        })
        return false
      }
      let Image = new FormData()
      Image.append('file', file)
      this.uploadFile(Image)
      // this.formDataImage = Image
      var _this = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        console.log(this.result)
        _this.Form.certificatePicture = this.result
      }
    },
    uploadFile (IMAGE) {
      axios.post('http://plant.fs-elliott.cn:8082/fushengJK/sctp', IMAGE, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this.formDataImage = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
