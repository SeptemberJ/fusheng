<template>
  <el-dialog class="AddDialog" title="采购订单计划安排" :visible.sync="dialogFormVisible" @close="close" fullscreen>
    <el-row style="background: #fff;padding: 5px 0;margin-top: 10px;">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!-- 备料 -->
        <section>
          <el-col :span="24" class="TextAlignL">
            <el-divider content-position="left"><h4>备料</h4></el-divider>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="预计完成时间" prop="yuji_date_bl" size="mini">
              <el-date-picker
                v-model="form.yuji_date_bl"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="实际完成时间" prop="shiji_date_bl" size="mini">
              <el-date-picker
                v-model="form.shiji_date_bl"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="备注" prop="fnote_bl" size="mini">
              <el-input size="mini" type="textarea" v-model="form.fnote_bl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="TextAlignR MarginB_10">
            <el-button type="danger" size="mini" @click="Upadte('bl')" v-if="isUpdate">保存</el-button>
          </el-col>
        </section>
        <!-- 生产 -->
        <section>
          <el-col :span="24" class="TextAlignL">
            <el-divider content-position="left"><h4>生产</h4></el-divider>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="预计完成时间" prop="yuji_date_sc" size="mini">
              <el-date-picker
                v-model="form.yuji_date_sc"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="实际完成时间" prop="shiji_date_sc" size="mini">
              <el-date-picker
                v-model="form.shiji_date_sc"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="备注" size="mini" prop="fnote_sc">
              <el-input size="mini" type="textarea" v-model="form.fnote_sc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="TextAlignR MarginB_10">
            <el-button type="danger" size="mini" @click="Upadte('sc')" v-if="isUpdate">保存</el-button>
          </el-col>
        </section>
        <!-- 检验完工 -->
        <section>
          <el-col :span="24" class="TextAlignL">
            <el-divider content-position="left"><h4>检验完工</h4></el-divider>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="预计完成时间" prop="yuji_date_jy" size="mini">
              <el-date-picker
                v-model="form.yuji_date_jy"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="实际完成时间" prop="shiji_date_jy" size="mini">
              <el-date-picker
                v-model="form.shiji_date_jy"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="备注" prop="fnote_jy" size="mini">
              <el-input type="textarea" v-model="form.fnote_jy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="文件">
              <el-upload
                class="upload-demo"
                :on-success="uploadFile"
                :on-remove="removeFile"
                :action="urlPre + 'uploadFile'">
                <el-button size="small">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="TextAlignR MarginB_10">
            <el-button type="danger" size="mini" @click="Upadte('jy')" v-if="isUpdate">保存</el-button>
          </el-col>
        </section>
        <!-- 发货 -->
        <section>
          <el-col :span="24" class="TextAlignL">
            <el-divider content-position="left"><h4>发货</h4></el-divider>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="预计完成时间" prop="yuji_date_fh" size="mini">
              <el-date-picker
                v-model="form.yuji_date_fh"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="实际完成时间" prop="shiji_date_fh" size="mini">
              <el-date-picker
                v-model="form.shiji_date"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="TextAlignL">
            <el-form-item label="备注" prop="fnote_fh" size="mini">
              <el-input type="textarea" v-model="form.fnote_fh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="TextAlignR MarginB_10">
            <el-button type="danger" size="mini" @click="Upadte('sh')" v-if="isUpdate">保存</el-button>
          </el-col>
        </section>
      </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer TextAlignC" v-if="!isUpdate">
      <el-button type="primary" @click="Submit('Form')">提交{{curCgorderId}}</el-button>
      <el-button @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {secondToFormat} from '../../util/utils'
export default {
  name: 'Plant',
  props: ['curCgorderId'],
  data () {
    return {
      dialogFormVisible: true,
      isUpdate: false,
      form: {
        yuji_date_bl: '',
        shiji_date_bl: '',
        fnote_bl: '',
        id_bl: '',
        yuji_date_sc: '',
        shiji_date_sc: '',
        fnote_sc: '',
        id_sc: '',
        yuji_date_jy: '',
        shiji_date_jy: '',
        fnote_jy: '',
        fileUrl_jy: '',
        id_jy: '',
        yuji_date_fh: '',
        shiji_date_fh: '',
        fnote_fh: '',
        id_fh: ''
      },
      rules: {
        // yuji_date_bl: [
        //   { required: true, message: '请选择预计完成时间', trigger: 'change' }
        // ],
        // shiji_date_bl: [
        //   { required: true, message: '请选择实际完成时间', trigger: 'change' }
        // ],
        // yuji_date_sc: [
        //   { required: true, message: '请选择预计完成时间', trigger: 'change' }
        // ],
        // shiji_date_sc: [
        //   { required: true, message: '请选择实际完成时间', trigger: 'change' }
        // ],
        // yuji_date_jy: [
        //   { required: true, message: '请选择预计完成时间', trigger: 'change' }
        // ],
        // shiji_date_jy: [
        //   { required: true, message: '请选择实际完成时间', trigger: 'change' }
        // ],
        // yuji_date_fh: [
        //   { required: true, message: '请选择预计完成时间', trigger: 'change' }
        // ],
        // shiji_date_fh: [
        //   { required: true, message: '请选择实际完成时间', trigger: 'change' }
        // ]
      }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      urlPre: state => state.urlPre
    })
  },
  created () {
    this.getPlantDetail()
  },
  methods: {
    ...mapActions([
      'toggleLoadingBt'
    ]),
    uploadFile (response, file, fileList, pp) {
      this.form.fileUrl_jy = response.filePath
    },
    removeFile () {
      this.from.fileUrl_jy = ''
    },
    Submit () {
      let DATA = {
        planlist: [
          {
            paixu: 1,
            gongxu: '备料',
            cgorderentryid: this.curCgorderId,
            yuji_date: this.form.yuji_date_bl,
            shiji_date: this.form.shiji_date_bl,
            fnote: this.form.fnote_bl,
            files: ''
          },
          {
            paixu: 2,
            gongxu: '生产',
            cgorderentryid: this.curCgorderId,
            yuji_date: this.form.yuji_date_sc,
            shiji_date: this.form.shiji_date_sc,
            fnote: this.form.fnote_sc,
            files: ''
          },
          {
            paixu: 3,
            gongxu: '检验完工',
            cgorderentryid: this.curCgorderId,
            yuji_date: this.form.yuji_date_jy,
            shiji_date: this.form.shiji_date_jy,
            fnote: this.form.fnote_jy,
            files: this.form.fileUrl_jy
          },
          {
            paixu: 4,
            gongxu: '发货',
            cgorderentryid: this.curCgorderId,
            yuji_date: this.form.yuji_date_fh,
            shiji_date: this.form.shiji_date_fh,
            fnote: this.form.fnote_fh,
            files: ''
          }
        ]
      }
      console.log(JSON.stringify(DATA))
      this.Http.post('insertCgorderentryPlan', JSON.stringify(DATA)
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.$message({
              message: '采购订单计划安排成功!',
              type: 'success'
            })
            this.close()
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
    Upadte (kind) {
      switch (kind) {
        case 'bl':
          this.sureUpadte(this.form.id_bl, this.form.yuji_date_bl ? this.form.yuji_date_bl : '', this.form.shiji_date_bl ? this.form.shiji_date_bl : '', this.form.fnote_bl, '')
          break
        case 'sc':
          this.sureUpadte(this.form.id_sc, this.form.yuji_date_sc ? this.form.yuji_date_sc : '', this.form.shiji_date_sc ? this.form.shiji_date_sc : '', this.form.fnote_sc, '')
          break
        case 'jy':
          this.sureUpadte(this.form.id_jy, this.form.yuji_date_jy ? this.form.yuji_date_jy : '', this.form.shiji_date_jy ? this.form.shiji_date_jy : '', this.form.fnote_jy, this.form.fileUrl_jy)
          break
        case 'fh':
          this.sureUpadte(this.form.id_fh, this.form.yuji_date_fh ? this.form.yuji_date_fh : '', this.form.shiji_date_fh ? this.form.shiji_date_fh : '', this.form.fnote_fh, '')
          break
      }
    },
    sureUpadte (id, yujiDate, shijiDate, fnote, files) {
      this.Http.post('updatePlan?id=' + id + '&yuji_date=' + yujiDate + '&shiji_date=' + shijiDate + '&fnote=' + fnote + '&files=' + files
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.$message({
              message: '计划更新成功!',
              type: 'success'
            })
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
    close () {
      this.$emit('togglePlantDialog', false)
    },
    getPlantDetail () {
      this.Http.get('cgorderPlanList', {cgorderentryid: this.curCgorderId}
      ).then(res => {
        if (res.data.code === 1) {
          let Info = res.data.cgorderPlanlist
          if (Info.length === 0) {
            this.isUpdate = false
          } else {
            this.isUpdate = true
            this.form.yuji_date_bl = Info[0].yuji_date ? secondToFormat(Info[0].yuji_date.time) : ''
            this.form.shiji_date_bl = Info[0].shiji_date ? secondToFormat(Info[0].shiji_date.time) : ''
            this.form.fnote_bl = Info[0].fnote
            this.form.id_bl = Info[0].id
            this.form.yuji_date_sc = Info[1].yuji_date ? secondToFormat(Info[1].yuji_date.time) : ''
            this.form.shiji_date_sc = Info[1].shiji_date ? secondToFormat(Info[1].shiji_date.time) : ''
            this.form.fnote_sc = Info[1].fnote
            this.form.id_sc = Info[1].id
            this.form.yuji_date_jy = Info[2].yuji_date ? secondToFormat(Info[2].yuji_date.time) : ''
            this.form.shiji_date_jy = Info[2].shiji_date ? secondToFormat(Info[2].shiji_date.time) : ''
            this.form.fnote_jy = Info[2].fnote
            this.form.fileUrl_jy = Info[2].files
            this.form.id_jy = Info[2].id
            this.form.yuji_date_fh = Info[3].yuji_date ? secondToFormat(Info[3].yuji_date.time) : ''
            this.form.shiji_date_fh = Info[3].shiji_date ? secondToFormat(Info[3].shiji_date.time) : ''
            this.form.fnote_fh = Info[3].fnote
            this.form.id_fh = Info[3].id
          }
        } else {
          this.$message({
            message: '采购订单计划信息获取失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message({
          message: 'interface error!',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
