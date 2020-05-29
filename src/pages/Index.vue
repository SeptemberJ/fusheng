<template>
  <div class="Index">
    <el-row>
      <el-col :sm="24" :md="12"><Calendar/></el-col>
      <el-col :sm="24" :md="12"><Message/></el-col>
    </el-row>
  </div>
</template>

<script>
import Calendar from '../components/Calendar/Calendar.vue'
import Message from '../components/Message/Message.vue'
export default {
  name: 'Index',
  data () {
    return {
    }
  },
  components: {
    Calendar,
    Message
  }
}
</script>
<style lang="less" scoped>
@Padding: 0px;
.Index{
  width: calc(100% - 2*@Padding);
  /*background: #fff;*/
  padding: @Padding;
}
</style>
