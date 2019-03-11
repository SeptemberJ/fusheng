<template>
  <div class="hello">
    <div class="inner" style="">FLEX</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  width: 400px;
  height: 400px;
  background: #ccc;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.inner {
  width: 200px;
  height: 200px;
  background: pink;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  /*display: flex;
  justify-content: center;
  align-items: center;*/
}
</style>
