<template>
  <div id="app">
    <v-header :seller="seller" v-if='flat'></v-header>
    <div class="tab-wrapper">
      <div class="tab-item">
        <router-link to='/goods' :class="{'active':$router.name=='goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/comment' :class="{'active':$router.name=='comment'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/merchant' :class="{'active':$router.name=='merchant'}">商家</router-link>
      </div>
    </div>
    <div class="contain-main">
      <router-view :seller="seller" v-if='flat'/>
    </div>
  </div>
</template>

<script>
import Header from './components/header/Header'
const ERROR_OK = 0
export default {
  name: 'App',
  components: {
    'v-header': Header
  },
  data () {
    return {
      seller: {},
      flat: false
    }
  },
  created () {
    this.$router.push({path: '/goods'})
    this.$http.get('api/seller').then((response) => {
      response = response.body
      if (response.errno === ERROR_OK) {
        this.seller = response.data
        this.flat = true
      }
    })
  }
}
</script>
<style lang="stylus">
  #app
    width:100%
    height:100%
  .tab-wrapper
    width:100%
    height 0.8rem
    display:flex
    line-height:0.8rem
    .tab-item
      flex:1
      text-align:center
      .router-link-active
        color:#ff0000
  .contain-main{
    width 100%
    overflow-x hidden
    border-top 1px solid rgba(7,17,27,0.2)
    position absolute
    top:3.48rem
    left:0rem
    width 100%
    bottom 0.92rem
    overflow hidden
  }
</style>

<style>
  @import './assets/css/reset.css'
</style>
