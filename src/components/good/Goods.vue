<template>
  <div class="goods">
    <div class="menu-wrapper" v-if='goods' ref='menuwrapper'>
      <ul>
        <li class="menu-item" :class="{'cur':index == selectIndex}" @click='selectMenu(index,$event)' :key='index' v-for="(item,index) in goods">
          <div class='border-top1px'>
            <span class="icon" :class='classMap[item.type]' v-if='item.type>0 || item.type==0'></span>
            <span class="menu-text">{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref='foodwrapper'>
      <ul>
        <li class='food-list' :key='index' v-for="(fitem,index) in goods">
          <div class="food-list-title">{{fitem.name}}</div>
          <ul>
            <li class='food-list-item border-bot1px' @click='selectFood(iitem)' :key='iidex' v-for="(iitem,iidex) in fitem.foods">
              <div class="i-left">
                <img :src="iitem.image" alt="">
              </div>
              <div class="i-right">
                <div class="i-name">{{iitem.name}}</div>
                <div class="i-description">{{iitem.description}}</div>
                <div class="extra">
                  <span class="sale">月售{{iitem.sellCount}}份</span>
                  <span class="rate">好评率{{iitem.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{iitem.price}}</span>
                  <span class="old" v-if='iitem.oldPrice'>￥{{iitem.oldPrice}}</span>
                </div>
                <div class="carcontrol-wraper">
                  <carcontrol :food='iitem'></carcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcar  :selectFoods='selectFoods' :seller='seller' :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcar>
    <food :food="selFood" v-if='selFood' v-show='showFood' v-on:back='hideFood'></food>
  </div>
</template>
<script>
import shopcar from '../shopcar/Shopcar'
import carcontrol from '../carcontrol/Carcontrol'
import food from '../food/Foods'
const ERROR_OK = 0
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    shopcar,
    carcontrol,
    food
  },
  data () {
    return {
      mes: '商品',
      goods: [],
      selFood: null,
      showFood: false,
      scrollY: 0,
      listHeight: [],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  computed: {
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    },
    selectIndex () {
      if (this.scrollY) {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i]
          let nexHeitht = this.listHeight[i + 1]
          if (!nexHeitht || (this.scrollY > height && this.scrollY < nexHeitht)) {
            return i
          }
        }
      } else {
        return 0
      }
    }
  },
  created () {
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERROR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this.initBerrScroll()
          this.initHeight()
        })
      }
    })
  },
  methods: {
    initBerrScroll () {
      this.meunScroll = new this.BScroll(this.$refs.menuwrapper, {
        click: true
      })
      this.foodScroll = new this.BScroll(this.$refs.foodwrapper, {
        click: true,
        probeType: 3
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    initHeight () {
      let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectFood (food) {
      this.selFood = food
      this.showFood = true
    },
    isEmptyObject (ea) {
      let t
      for (t in ea) {
        return !1
      }
      return !0
    },
    hideFood () {
      this.showFood = false
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return false
      }
      let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list')
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
    }
  }
}
</script>
<style lang="stylus">
@import "../../assets/css/mixin"
  .goods
    position absolute
    top 0rem
    bottom 0.96rem
    display flex
    width 100%
    .menu-wrapper
      flex 0 0 1.6rem
      background #f3f5f7
      .menu-item
        padding 0rem 0.24rem
        height 1.08rem
        display: table
        width 100%
        &.cur
          background-color #fff
        &>div
          display: table-cell
          vertical-align: middle
        &.current
          background-color #fff
        &:nth-of-type(1)>div
          border none
        .menu-text
          line-height 0.28rem
    .food-wrapper
      flex 1
      .food-list
        color #fff
        .food-list-title
          padding-left 0.28rem
          height 0.52rem
          line-height 0.52rem
          border-left 0.04rem solid #dedded
          font-size 0.24rem
          color #93999f
          background-color #f3f5f7
        .food-list-item
          display flex
          margin 0.36rem
          padding-bottom 0.36rem
          position relative
          .i-left
            flex 0 0 1.14rem
            width 1.14rem
            img
              width 1.14rem
              height 1.14rem
          .i-right
            flex 1
            padding-left 0.2rem
            .i-name
              margin: 0.04rem 0 0.16rem 0
              height: 0.28rem
              line-height: 0.28rem
              font-size: 0.28rem
              color: #07111b
            .i-description
              line-height: 0.3rem
              margin-bottom: 0.16rem
              font-size: 0.2rem
              color: #93999f
            .extra
              line-height: 0.2rem
              font-size: 0.2rem
              color: #93999f
            .price
              padding-top 0.1rem
              font-weight: 700
              line-height: 0.48rem
              .now
                margin-right:0.16rem
                font-size: 0.28rem
                color: #f01414
              .old
                text-decoration: line-through
                font-size:0.2rem
                color: #93999f
            .carcontrol-wraper
              position absolute
              right 0rem
              bottom 0.24rem
</style>
