<template>
  <div>
    <section ref="print">
    <div id="printTest" style="background-color:pink;">
      <p :class="{'red': con1}" style="color: #000">锄禾日当午</p>
      <p>汗滴禾下土 </p>
      <p>谁知盘中餐</p>
      <p>粒粒皆辛苦</p>
    </div>
    <div style="width:100%;overflow:scroll;" class="overflowbox">
      <div v-for="(item2, i) in 5" :class="{'rbged':i !== 0}" :key="i" style="width: 300px;display:inline;float:left"><span v-if='item2 !== 8' style="width: 100%;">{{item2}}</span><span v-else>==</span></div>
    </div>
    <div class="no-print">不要打印我</div>
  </section>
  <button @click="GoPrint">打印</button>
  </div>
</template>

<script>
// import Vue from 'vue'
// import Print from '../plugs/print'
// Vue.use(Print)

export default {
  name: 'Print',
  data () {
    return {
      con1: true,
      con2: true
    }
  },
  created () {
    // setTimeout(() => {
    //   console.log(this.$refs.print)
    //   this.$print(this.$refs.print)
    // }, 3000)
  },
  methods: {
    GoPrint () {
      window.print()
      // this.$print(this.$refs.print)
    }
  }
}
</script>
<style>
  .red{
    color: red !important;
  }
  .rbged{
    background-color: red !important;
  }
</style>
