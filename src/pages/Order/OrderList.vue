<template>
  <div class="OrderList">
    OrderList
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.OrderList{
  width: calc(100% - 2*@Padding);
  height: 200px;
  background: #fff;
  padding: @Padding;
}
</style>
