<template>
  <div class="BreadcrumbBar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><span class="CursorPointer BoldBread" @click="ToIndex">首页</span></el-breadcrumb-item>
      <el-breadcrumb-item><span class="BoldBread">{{secondBreadMenu}}</span></el-breadcrumb-item>
      <el-breadcrumb-item>{{thirdBreadMenu}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="24">
        <h4>活动详情</h4>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Breadcrumb',
  data () {
    return {
      secondBreadMenu: '',
      thirdBreadMenu: ''
    }
  },
  computed: {
    ...mapState({
      menuIdx: state => state.menuIdx,
      moduleIdx: state => state.moduleIdx
    })
  },
  created () {
    this.diffSecondBreadMenu(this.moduleIdx)
    this.diffThirdBreadMenu(this.menuIdx)
  },
  watch: {
    moduleIdx: function (newVal) {
      this.diffSecondBreadMenu(newVal)
    },
    menuIdx: function (newVal) {
      this.diffThirdBreadMenu(newVal)
    }
  },
  methods: {
    ...mapActions([
      'changeMenuIdx',
      'changeModuleIdx'
    ]),
    diffSecondBreadMenu (IDX) {
      switch (IDX) {
        case '1':
          this.secondBreadMenu = '订单列表'
          break
        case '2':
          this.secondBreadMenu = '基本信息'
          break
      }
    },
    diffThirdBreadMenu (IDX) {
      switch (IDX) {
        case '1-1':
          this.thirdBreadMenu = '订单列表'
          break
        case '2-1':
          this.thirdBreadMenu = '基本信息'
          break
        case '2-2':
          this.thirdBreadMenu = '证件资料'
          break
      }
    },
    ToIndex () {
      this.changeModuleIdx('1')
      this.changeMenuIdx('1-1')
    }
  }
}
</script>

<style lang="less" scoped>
.BreadcrumbBar{
  width: 120%;
  height: 40px;
  line-height: 40px;
  margin-left: -20px;
  margin-bottom: 20px;
  padding-left: 20px;
  border-top:1px solid #e8e8e8;
  padding-top: 20px;
  background: #fff;
  .BoldBread{
    font-weight: 700;
    color:#303133;
  }
}
</style>
