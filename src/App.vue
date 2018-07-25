<template>
  <div id="app">
    <div class="contain">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'App'
    }
  },
  created () {
    // console.log(this.msg)
  }
}
</script>
<style lang="stylus">
  #app
    width:100%
    height:100%
  .contain
    padding-top 0.96rem
</style>
<style>
  @import './assets/css/reset.css'
</style>
