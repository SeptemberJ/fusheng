<template>
<!--startprint-->
  <div class="PrintSH" id="PrintSH">
    <el-row>
      <el-col :span="8" class="MarginB_10">送货单号：{{basicInfo.songhuono}}</el-col>
      <el-col :span="8" class="MarginB_10">送货日期：{{basicInfo.songhuodateTxt}}</el-col>
      <el-col :span="8" class="MarginB_10">供应商名称：{{basicInfo.providerfullname}}</el-col>
    </el-row>
    <el-row class="MarginB_10 MarginT_20" style="border-bottom: 1px solid #ddd;padding-bottom: 10px;">
      <el-col :span="1">#</el-col>
      <el-col :span="3">物料编号</el-col>
      <el-col :span="4">规格</el-col>
      <el-col :span="3">版本号</el-col>
      <el-col :span="2">单位</el-col>
      <el-col :span="3">材质</el-col>
      <el-col :span="2">送货数量</el-col>
      <el-col :span="6">备注</el-col>
    </el-row>
    <el-row v-for="(CgItem, idx) in cgList" :key="idx" class="MarginB_10">
      <el-col :span="1">{{idx + 1}}</el-col>
      <el-col :span="3">{{CgItem.matcode}}</el-col>
      <el-col :span="4">{{CgItem.norms}}</el-col>
      <el-col :span="3">{{CgItem.version}}</el-col>
      <el-col :span="2">{{CgItem.units}}</el-col>
      <el-col :span="3">{{CgItem.stuff}}</el-col>
      <el-col :span="2">{{CgItem.shnum}}</el-col>
      <el-col :span="6">{{CgItem.fnote}}</el-col>
    </el-row>
  </div>
<!--endprint-->
</template>

<script>
import {secondToFormat} from '../../util/utils'
export default {
  name: 'PrintSH',
  props: ['curSongHuoId', 'curTimestamp'],
  data () {
    return {
      basicInfo: '',
      cgList: []
    }
  },
  computed: {
  },
  created () {
    this.getInfo()
  },
  watch: {
    curTimestamp: function (val) {
      this.getInfo()
    }
  },
  methods: {
    print () {
      window.print()
      this.$emit('closePrintDialog')
      // setTimeout(() => {
      //   document.getElementById('printBt').style.display = 'none'
      //   let bdhtml = document.getElementById('PrintSH').innerHTML
      //   let sprnstr = '<!--startprint-->'
      //   let eprnstr = '<!--endprint-->'
      //   let prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17)
      //   prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr))
      //   window.document.getElementById('PrintSH').innerHTML = prnhtml
      // }, 0)
    },
    getInfo () {
      this.Http.get('printShorder', {id: this.curSongHuoId}
      ).then(res => {
        if (res.data.code === 1) {
          this.basicInfo = res.data.shorderdetail
          this.basicInfo.songhuodateTxt = secondToFormat(res.data.shorderdetail.songhuodate.time)
          this.cgList = res.data.shorderentrylist
          setTimeout(() => {
            this.print()
          }, 200)
        } else {
          this.$message({
            message: '获取送货单信息失败!',
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
.PrintSH{
  text-align: left;
}
</style>
