<template>
<transition name='slide-fade'>
  <div class="foods-wrapper" ref='foodswrpper' v-if='food'>
      <div class='foods-contain'>
        <div class='food-img'>
          <img :src="food.image" alt="">
        </div>
        <div class='contain-news'>
          <div class="food-name">{{food.name}}</div>
          <div class="food-detail">
            <span >月售{{food.sellCount}}份</span>
            <span style='padding-left:0.2rem'>好评率{{food.rating}}%</span>
          </div>
          <div class="food-contant clearfix">
            <div class="food-price">￥{{food.price}}</div>
            <div class="join-car">
              <span v-show='!food.count' @click='joinCar' class='join-text'>加入购物车</span>
              <div v-show='food.count'>
                <carcontrol ref='carcontrol' :food='food' ></carcontrol>
              </div>
            </div>
          </div>
        </div>
        <split></split>
        <div class="food-more-new">
          <h1 class='title'>商品信息</h1>
          <p class='desc' v-if='food.info'>{{food.info}}</p>
          <p class='desc' v-else>暂无食物信息</p>
        </div>
        <split></split>
        <div class="food-evaluation border-bot1px">
          <h1 class="title">商品评价</h1>
          <ratingselect v-if='food.ratings' :ratings='food.ratings' :type='commentType' v-on:changeType='changeType'></ratingselect>
        </div>
        <div class="evaluation-list" v-if="ratings">
            <ul>
              <li class='border-bot1px evaluation-item' :key='index' v-for='(rate,index) in ratings'>
                <div class="rate-time-name clearfix">
                  <!-- <span class="time">{{rate.rateTime}}</span> -->
                  <span class="time">{{times(rate.rateTime)}}</span>
                  <span class="name">{{rate.username}}</span>
                </div>
                <div class="rate-text">{{rate.text}}</div>
              </li>
            </ul>
          </div>
      </div>
      <div class="back" @click='back'></div>
  </div>
</transition>
</template>
<script>
import {formatDate} from '@/assets/js/base'
import Vue from 'vue'
import carcontrol from '../carcontrol/Carcontrol'
import ratingselect from '../ratingselect/Ratingselect'
import {ALL} from '../../assets/js/initData'
import split from '../split/split'
export default {
  name: 'food',
  data () {
    return {
      carTant: {}
    }
  },
  components: {
    carcontrol,
    ratingselect,
    split
  },
  props: {
    food: {
      type: Object
    }
  },
  computed: {
    count () {
      return this.food.count
    },
    ratings () {
      if (this.commentType === ALL) {
        return this.food.ratings
      } else {
        return this.food.ratings.filter((val) => val.rateType === this.commentType)
      }
    },
    commentType () {
      return this.$store.state.commentType
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.foodBScroll = new this.BScroll(this.$refs.foodswrpper, {
        click: true
      })
    })
  },
  methods: {
    back () {
      this.$emit('back')
    },
    joinCar () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      }
    },
    times (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    },
    changeType (tp) {
      this.$store.commit('changeCommentType', tp)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/css/mixin'
  img
    max-width 100%
  .title
    line-height:0.28rem
    margin-bottom:0.12rem
    font-size: 0.28rem
    color: #07111b
  .foods-wrapper
    position fixed
    top 0rem
    left 0rem
    width 100%
    bottom 0.96rem
    overflow hidden
    background-color #ffffff
    z-index 8
    transition all 0.5s
    &.slide-fade-enter-active
      transition: all .5s ease
    &.slide-fade-.leave-active
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    &.slide-fade-enter,&.slide-fade-leave-to
      transform: translateX(100%)
    .back
      position absolute
      top 0.2rem
      left 0.2rem
      z-index 5
      width 0.5rem
      height 0.5rem
      border-radius 0.5rem
      background-color rgba(255,255,255,0.8)
      background-position center
      background-repeat no-repeat
      background-size 60%
      bg-back('black')
      z-index 8
    .contain-news
      padding 0.36rem
      position relative
      .food-name
        line-height:0.28rem
        margin-bottom:0.16rem
        font-size: 0.28rem
        font-weight: 700
        color: #07111b
      .food-detail
        margin-bottom: 0.18rem
        line-height: 0.2rem
        height: 0.2rem
        font-size: 0.2rem;
        color #93999f
      .food-price
        margin-right: 0.16rem
        font-size: 0.28rem
        height 0.7rem
        line-height 0.7rem
        color: #f01414
        float left
      .join-car
        float right
        width 1.5rem
        height 0.7rem
        line-height 0.7rem
        .join-text
          padding 0.05rem 0.15rem
          width 100%
          text-align center
          background-color #00a0dc
          border-radius 0.24rem
          color #fff
    .food-more-new
      padding 0.36rem
      .desc
        line-height: 0.48rem
        padding: 0 0.16rem
        font-size: 0.24rem
        color: #4d555d
    .food-evaluation
      padding 0.36rem
      .eval-tab
        margin-top 0.36rem
        .btn-sort
          display: inline-block
          padding: 0.16rem 0.24rem
          margin-right: 0.16rem
          line-height: 0.32rem
          border-radius: 0.02rem
          font-size: 0.24rem
          &.cur
            color #fff
            background: #00a0dc !important
          &[type='2']
            background: rgba(0,160,220,0.2)
          &[type='1']
            background: rgba(0,160,220,0.2)
          &[type='0']
            background: rgba(77,85,93,0.2)
    .evaluation-list
      overflow-x hidden
      .evaluation-item
        padding 0.25rem 0.36rem
        .rate-time-name
          margin-bottom: 0.12rem
          line-height: 0.24rem
          font-size: 0.2rem
          color: #93999f
          .time
            float left
          .name
            float right
</style>
