<template>
  <div id="app">
    <wxshare></wxshare>
    <div class="contain">
      <router-view/>
    </div>
  </div>
</template>

<script>
import wxshare from './components/wxshare/WxShare'
import {getLocalStorage} from './assets/js/base'
import {UserKey} from './assets/js/initData'
export default {
  name: 'App',
  data () {
    return {
      msg: 'App'
    }
  },
  components: {
    wxshare
  },
  watch: {
    '$route' (to, from) {
      let userData = getLocalStorage(UserKey)
      if (!userData) {
        let path = to.path
        if (path !== '/home' && path !== '/my') {
          this.$router.push({'path': '/login'})
        }
      }
    }
  }
}
</script>
<style lang="stylus">
  #app
    width:100%
    height:100%
  .contain
    padding-top 0.96rem
    height 100%
    overflow hidden
</style>
<style>
  @import './assets/css/reset.css'
</style>
