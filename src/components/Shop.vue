<template>
  <transition name='fade'>
    <div class="shop">
      <back></back>
      <v-header :seller="seller" v-if='flat'></v-header>
      <div class="tab-wrapper">
        <div class="tab-item">
          <router-link :to="{'path':'goods','query':{id:queryId}}" :class="{'active':$router.name=='goods'}">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link :to="{'path':'comment','query':{id:queryId}}" :class="{'active':$router.name=='comment'}">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link :to="{'path':'merchant','query':{id:queryId}}" :class="{'active':$router.name=='merchant'}">商家</router-link>
        </div>
      </div>
      <div class="contain-main">
        <router-view :seller="seller" v-if='seller' keep-alive/>
      </div>
    </div>
  </transition>
</template>

<script>
import Header from './header/Header'
import Back from './back/Back'
const ERROR_OK = 0
export default {
  name: 'App',
  components: {
    'v-header': Header,
    Back
  },
  data () {
    return {
      seller: null,
      flat: false,
      queryId: 0
    }
  },
  created () {
    this.queryId = this.$route.query.id
    this.$router.push({'path': '/shop/goods', 'query': {id: this.queryId}})
    this.$http.get('/api/seller').then((response) => {
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
  .shop
    width:100%
    height:100%
    position absolute
    top:0rem
    left 0rem
    &.fade-enter-active,&.fade-leave-active
      transition opacity 0.5s
    &.fade-enter,&.fade-leave-to
      opacity 0
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
    border-top 1px solid rgba(7,17,27,0.2)
    position absolute
    top:3.48rem
    left:0rem
    width 100%
    bottom 0rem
    overflow hidden
  }
</style>

<style>
  @import '../assets/css/reset.css'
</style>
