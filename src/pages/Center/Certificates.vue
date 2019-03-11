<template>
  <div class="Certificates">
    <el-row>
      <el-col :span="24" class="TextAlignR MarginB_20">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addCertificate">新增</el-button>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="CertificateList"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="imagename"
            label="证件名称">
          </el-table-column>
          <el-table-column
            prop="effective_date"
            label="有效期">
          </el-table-column>
          <!-- <el-table-column
            prop="imagename"
            label="图片">
          </el-table-column> -->
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="TextAlignR MarginT_20" v-if="CertificateList.length > 0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- add -->
    <AddCertificate v-if="ifAdd" :dialogFormVisible="ifAdd" @toggleAddDialog="toggleAddDialog" @refresh="getCertificateList"/>
    <!-- Modify -->
    <ModifyCertificate v-if="ifModify" :dialogFormVisible="ifModify" :detailInfo="detailInfo" @toggleModifyDialog="toggleModifyDialog" @refresh="getCertificateList"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddCertificate from '../../components/AddCertificate.vue'
import ModifyCertificate from '../../components/ModifyCertificate.vue'

export default {
  name: 'Certificates',
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      sum: 0,
      CertificateList: [],
      ifAdd: false,
      ifModify: false,
      detailInfo: ''
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  created () {
    this.getCertificateList()
    this.$emit('refreshOverDate')
  },
  components: {
    AddCertificate,
    ModifyCertificate
  },
  methods: {
    ...mapActions([
      'showNotice'
    ]),
    handleEdit (index, row) {
      this.ifModify = true
      this.detailInfo = row
    },
    handleDelete (index, row) {
      this.$confirm('此操作将删除该证件信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sureDelete(row.id)
      }).catch(() => {
      })
    },
    sureDelete (ID) {
      this.Http.get('delphoto', {gysid: this.userId, photoid: ID}
      ).then(res => {
        switch (res.data.result) {
          case 1:
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getCertificateList()
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
    addCertificate () {
      this.ifAdd = true
    },
    toggleAddDialog (STATUS) {
      this.ifAdd = STATUS
    },
    toggleModifyDialog (STATUS) {
      this.ifModify = STATUS
    },
    getCertificateList () {
      this.Http.get('serzjlist', {gysid: this.userId, pageSize: this.pageSize, pageNo: this.currentPage}
      ).then(res => {
        switch (res.data.result) {
          case 1:
            this.CertificateList = res.data.photolist
            this.sum = res.data.count
            // this.checkOverDate(res.data.photolist)
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
    checkOverDate (List) {
      let overDateStr = ''
      let curTime = (new Date()).getTime()
      List.map(item => {
        let limitTime = (new Date(item.effective_date)).getTime()
        if ((limitTime - curTime) < 7 * 24 * 60 * 60 * 1000) { // 一周前
          overDateStr = overDateStr + item.imagename + '、'
        }
      })
      this.showNotice(overDateStr)
    },
    handleCurrentChange () {
      this.getCertificateList()
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.Certificates{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: @Padding;
}
</style>
