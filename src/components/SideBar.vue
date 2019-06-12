<template>
  <div class="SideBar">
    <!-- #545c64  #001529-->
    <el-menu :default-active="menuIdx" class="el-menu-vertical-demo" @select="changeMenu" background-color="#001529" text-color="hsla(0,0%,100%,.65)" :collapse="isCollapse">
      <el-menu-item index="0">
        <!-- 146 32 -->
        <img style="width:30px;height:30px;margin:0 auto;" src="../../static/images/Logo.png">
        <span slot="title" style="padding-left: 10px;font-size:24px;color:#fff;font-weight:bold;">复 盛</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-third-dingdan2"></i>
          <span slot="title">采购管理</span>
        </template>
        <!-- <el-menu-item index="1-1">订单列表</el-menu-item> -->
        <el-menu-item index="1-2">采购单</el-menu-item>
        <el-menu-item index="1-3">送货单</el-menu-item>
        <!-- <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-third-caidan07"></i>
          <span slot="title">个人页</span>
        </template>
        <el-menu-item index="2-1">基本信息</el-menu-item>
        <el-menu-item index="2-2">证件资料</el-menu-item>
        <!-- <el-menu-item index="2-3">日常安排</el-menu-item> -->
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">日常安排</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SideBar',
  props: ['isCollapse'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      menuIdx: state => state.menuIdx
    })
  },
  methods: {
    ...mapActions([
      'changeMenuIdx',
      'changeModuleIdx'
    ]),
    changeMenu (index, keyPath) {
      // console.log(index, keyPath)
      this.changeModuleIdx(keyPath[0])
      if (index === '0') { // 点击Logo显示主界面
        this.changeMenuIdx('1-1')
      } else {
        this.changeMenuIdx(index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.SideBar{
  height: 100%;
  .el-menu-item{
    text-align: left;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
