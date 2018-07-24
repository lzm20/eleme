<template>
  <div id="app">
    <router-view/>
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
    console.log(this.msg)
  }
}
</script>
<style lang="stylus">
  #app
    width:100%
    height:100%
</style>

<style>
  @import './assets/css/reset.css'
</style>
