<template>
  <div class="home">
    <v-head></v-head>
    <div class="home-contain" ref='homewrapper'>
      <div class="content">
        <div class="content-top">
          <div class="address-position">
            <v-address></v-address>
          </div>
          <div class="search">
            <router-link to='/search'>搜索商家，店铺</router-link>
          </div>
        </div>
        <div class="shop-list" v-if='merchants'>
          <div class="list-item border-bot1px" :key='index' v-for="(merchant,index) in merchants">
            <router-link :to="{'path':'/shop','query':{id:'0'}}">
              <div class="left">
                <img :src="merchant.avatar" alt="">
              </div>
              <div class="right">
                <h2 class="title">{{merchant.name}}</h2>
                <div class="middle">
                  <div class="star-wrapper">
                    <star :size='24' :score='merchant.score'></star>
                  </div>
                  <div class="sale-count">
                    月售{{merchant.sellCount}}笔
                  </div>
                </div>
                <div class="detail">
                  <span class="minprice">起送{{merchant.minPrice}}元</span> ||
                  <span class="deliveryTime">配送{{merchant.deliveryPrice}}元</span>
                </div>
                <marquee class="offer" direction="left" behavior="scroll" scrollamount="5" scrolldelay="1" loop="-1">
                  <span :key="index" v-for='(offer,index) in merchant.supports'>
                    {{offer.description}}
                  </span>
                </marquee>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import head from '../common/Head'
import foot from '../foot/Foot'
import star from '../star/Star'
import address from '../address/Address'
const ERROR_OK = 0
export default {
  data () {
    return {
      merchants: null
    }
  },
  components: {
    foot,
    'v-head': head,
    star,
    'v-address': address
  },
  created () {
    this.$http.get('/api/merchant').then((res) => {
      res = res.body
      if (res.errno === ERROR_OK) {
        this.merchants = res.data
        this.$nextTick(() => {
          this.homeScrole = new this.BScroll(this.$refs.homewrapper, {
            click: true
          })
        })
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/css/mixin'
.home-contain
  position absolute
  top 0.96rem
  bottom 0.96rem
  width 100%
  overflow hidden
  .content-top
    padding 0.2rem
    background-color #559ef5
    .search
      margin-top 0.2rem
      width 7.1rem
      height 0.8rem
      text-align center
      line-height 0.8rem
      background-color #e0e0e0
      a
        display block
        width 100%
        height 100%
  .shop-list
    width 100%
    .list-item
      padding 0.3rem 0.36rem
      a
        width 100%
        height 100%
        display flex
        .left
          width 1.5rem
          flex 0 0 1.5rem
          margin-right 0.2rem
          img
            width 1.5rem
        .right
          flex 1
          .offer
            span
              padding 0.05rem 0.2rem
              border 1px solid #dedede
              margin-right 0.2rem
              display inline-block
          marquee
            margin-top 0.2rem
</style>
