<template>
  <div class="shopcar">
    <div class="shopcar-wrapper">
      <div class="wrapper-left" @click="toggle">
        <div class="logo-wrapper" >
          <div class="logo" :class="{'heightlight': totalCount>0}">
            <span class="icon icon-shopcar"></span>
          </div>
          <div class="num" v-if='totalCount>0'>{{totalCount}}</div>
        </div>
        <div class="price" :class="{'heightlight': price>0}">￥{{price}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="wrapper-right">
        <div class="pay" @click='pay' :class='payClass'>
          {{payDesc}}
        </div>
      </div>
    </div>
    <transition name='fade'>
      <div class="list-mask" v-show='showMask' @click='hidelist'></div>
    </transition>
    <transition name='slide-fade'>
      <div class="show-select-foods" v-show='showMask'>
        <div class="s-food-title">
          <span class="title">购物车</span>
          <span class="close-car" @click='clearCar'>清空</span>
        </div>
        <div class="show-select-content" ref='selectcontent'>
          <ul>
            <li class='car-item border-bot1px' :key="index" v-for='(food,index) in selectFoods'>
              <span class="food-name">{{food.name}}</span>
              <span class="foot-price">￥{{food.count*food.price}}</span>
              <div class="carcontrol">
                <carcontrol :food='food'></carcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import carcontrol from '../carcontrol/Carcontrol'
export default {
  name: 'shopcar',
  data () {
    return {
      fold: true
    }
  },
  components: {
    carcontrol
  },
  props: {
    selectFoods: {
      type: Array
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    price () {
      let price = 0
      this.selectFoods.forEach((val) => {
        price += val.price * val.count
      })
      return price
    },
    payDesc () {
      if (this.price === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.price < this.minPrice) {
        let diff = this.minPrice - this.price
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.price < this.minPrice) {
        return 'no-enough'
      } else {
        return 'enough'
      }
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((val) => {
        count += val.count
      })
      return count
    },
    sele () {
      return this.selectFoods
    },
    showMask () {
      if (this.totalCount === 0) {
        return false
      } else {
        return !this.fold
      }
    }
  },
  methods: {
    clearCar () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    toggle () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    hidelist () {
      this.fold = !this.fold
    },
    pay () {
      alert('去支付')
    }
  },
  created () {
    this.$nextTick(() => {
      this.selectScroll = new this.BScroll(this.$refs.selectcontent, {
        click: true
      })
    })
  }
}
</script>
<style lang="stylus">
  .shopcar
    position fixed
    left 0rem
    bottom 0rem
    width 100%
    height 0.96rem
    z-index 9
    .shopcar-wrapper
      position absolute
      top 0rem
      left 0rem
      width 100%
      height 0.96rem
      z-index 5
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255,255,255,0.4)
      .wrapper-left
        flex 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -0.2rem
          margin: 0 0.24rem
          padding: 0.12rem
          width:1.12rem
          height: 1.12rem
          box-sizing: border-box
          border-radius: 50%
          background-color: #141d27
          .logo
            width 100%
            height 100%
            text-align center
            border-radius 50%
            background-image url(./car.png)
            background-repeat no-repeat
            background-size 60%
            background-position center
            &.heightlight
              background-color #00a0dc
              background-image url(./car-height.png)
          .num
            position absolute
            top 0rem
            right 0rem
            height 0.3rem
            line-height 0.3rem
            padding 0rem 0.15rem
            background-color #ff0000
            color #ffffff
            font-size 0.18rem
            border-radius 0.2rem
        .price
          display: inline-block
          vertical-align: top
          margin-top: 0.24rem
          line-height: 0.48rem
          padding-right:0.24rem
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 0.32rem
          font-weight: 700
          &.heightlight
            color:#ffffff
        .desc
          display: inline-block
          vertical-align: top
          margin: 0.24rem 0 0 0.24rem
          line-height: 0.48rem
          font-size: 0.2rem
      .wrapper-right
        flex 0 0  2.1rem
        width 2.1rem
        .pay
          height: 0.96rem
          line-height: 0.96rem
          text-align: center;
          font-size: 0.24rem
          font-weight: 700;
          &.no-enough
            background-color #2b333b
          &.enough
            background-color #00b43c
            color #fff
    .list-mask
      position fixed
      top 0rem
      right 0rem
      left 0rem
      bottom 0rem
      background-color rgba(0,0,0,0.6)
      transition all 0.5s
      &.fade-enter-active,&.fade-leave-active
        transition: opacity .5s;
      &.fade-enter, .fade-leave-to
        opacity 0
    .show-select-foods
      position absolute
      bottom 0.96rem
      background-color #fff
      width 100%
      z-index 4
      transition all 0.5s
      &.slide-fade-enter-active
        transition: all 0.5s ease
      &.slide-fade-leave-active
        transition: all 0.5s ease
      &.slide-fade-enter,&.slide-fade-leave-to
        transform: translateY(100%)
        opacity: 0
      .s-food-title
        width 100%
        height 0.8rem
        line-height 0.8rem
        padding-left 0.36rem
        background: #f3f5f7
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .title
          float left
          font-size:0.28rem
          color: #07111b
        .close-car
          float right
          padding 0rem 0.2rem
          font-size 0.24rem
          color: #00a0dc
      .show-select-content
        height: 4.34rem
        overflow: hidden
        background: #fff
      .car-item
        margin auto 0.36rem
        padding 0.24rem 0rem
        position relative
        .carcontrol
          float right
          position absolute
          top 0rem
          right 0rem
</style>
