<template>
  <div class="order">
    <v-head></v-head>
    <div class="order-list" v-if='orders' ref='orderwrapper'>
      <div class="order-contain">
        <div class="order-tab-status">
           <div class="tab-item">待付款</div>
           <div class="tab-item">待使用</div>
           <div class="tab-item">待评价</div>
           <div class="tab-item">退款/售后</div>
        </div>
        <split></split>
        <ul>
          <li class='order-item border-bot1px' :key='index' v-for='(order,index) in orders'>
            <div class="top">
              <div class="left">
                <img :src="order.seller.avatar" alt="">
              </div>
              <div class="right">
                <div class="title">{{order.seller.name}}</div>
              </div>
            </div>
            <ul class="middle">
              <li :key='index' v-for='(ord,index) in order.order'>
                <span class="name">{{ord.name}}*</span>
                <span class='count'>{{ord.count}}个</span>
                <span class="price" >单价：<span>{{ord.price}}</span></span>
              </li>
            </ul>
            <div class="bot clearfix">
              <div class="all-price" >总价<span>{{allPrice[index]}}</span></div>
              <div class="pay-status clearfix">
                <span class="paid" v-if='order.Paid === true'>已支付</span>
                <span class="unpaid" v-if='order.Paid !==true'>未支付</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="order-null" v-else>
      <span> 您还没有订单呢，<router-link to='/shop'>去购买</router-link>吧</span>
    </div>
  </div>
</template>
<script>
import head from '../common/Head'
import {getLocalStorage} from '../../assets/js/base'
import {localStorageKey} from '../../assets/js/initData'
import split from '../split/Split'
export default {
  data () {
    return {
      msg: '订单',
      orders: null
    }
  },
  components: {
    'v-head': head,
    split
  },
  computed: {
    allPrice () {
      let priceArr = []
      this.orders.forEach((val) => {
        let price = 0
        val.order.forEach((pre) => {
          price += pre.count * pre.price
        })
        priceArr.push(price)
      })
      return priceArr
    }
  },
  mounted () {
    let order = getLocalStorage(localStorageKey)
    // console.log(JSON.parse(order))
    if (order) {
      this.orders = JSON.parse(order)
      this.$nextTick(() => {
        this.orderBScroll = new this.BScroll(this.$refs.orderwrapper, {
          click: true
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/css/mixin'
  .order-null
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
    box-pack: center;
    font-size 0.3rem
    a
     color #ff0000
  .order
    position absolute
    top:0.96rem
    bottom 0rem
    width 100%
    overflow hidden
    .order-tab-status
      display flex
      height 0.8rem
      text-align center
      line-height 0.8rem
      .tab-item
        flex 1
    .order-list
      position absolute
      top:0rem
      left 0rem
      bottom 0rem
      width 100%
      .order-item
        padding 0.36rem
        font-size 0.3rem
        .top
          display flex
          .left
            flex 0 0 0.8rem
            width 0.8rem
            img
              width 0.8rem
          .right
            flex 1
            margin-left 0.2rem
            line-height 0.8rem
            font-size 0.3rem
        .middle
          margin-top 0.3rem
          li
            border-bottom 1px solid #cdcdcd
            padding 0.1rem 0rem
            color #989898
            .count
              color #000
              font-size 0.32rem
            .price
              span
                color #000
                font-size 0.32rem
        .bot
          margin-top 0.2rem
          .all-price
            float left
            span
              color #ff0000
              padding-left 0.2rem
          .pay-status
            span
              float right
            .paid
              color #bbb5b5
              padding 0.05rem 0.2rem
            .unpaid
              color #ff0000
              padding 0.05rem 0.2rem
</style>
