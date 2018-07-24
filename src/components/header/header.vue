<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="header-left">
        <div class="avatar">
          <img :src="seller.avatar" alt="">
        </div>
      </div>
      <div class="header-right">
        <div class="header-title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support">
          <span class="icon" :class="classMap[seller.supports[0]['type']]"></span>
          <span class="text">{{seller.supports[0]['description']}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <div class="support-count" @click="showDetail = !showDetail">
      <span class="count">{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name='fade'>
      <div class="detail" v-show='showDetail'>
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="detail-name">{{seller.name}}</div>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="detail-title">
              <span class="line"></span>
              <span class="text">优惠信息</span>
              <span class="line"></span>
            </div>
            <div class="supports-list" v-if='seller.supports'>
              <div :key='index' v-for="(item,index) in seller.supports" class="supports-item">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="item-text">{{item.description}}</span>
              </div>
            </div>
            <div class="detail-title">
              <span class="line"></span>
              <span class="text">商家公告</span>
              <span class="line"></span>
            </div>
            <div class="detail-desc">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="detail-close"  @click="showDetail = !showDetail">
          <i class="icon-close">X</i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/Star'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      showDetail: false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/css/mixin'
.header
  width:100%
  background-color:rgba(7,17,27,0.5)
  position relative
  overflow hidden
  &>.background
    content ""
    position absolute
    top 0rem
    left 0rem
    width 100%
    height 100%
    -webkit-filter: blur(10px)
    filter: blur(10px)
    z-index -1
  .header-wrapper
    display:flex
    padding:0.48rem 0.24rem 0.36rem 0.48rem
    font-size 0
    position relative
    .header-left
      flex:0 0 1.28rem
      .avatar
        width:1.28rem
        height:1.28rem
        overflow:hidden
        img
          width 1.28rem
    .header-right
      flex:1
      padding-left 0.32rem
      .header-title
        margin:0.04rem 0rem 0.16rem 0rem
        color  #fff
        .brand
          background-image url(../../assets/img/text/brand@2x.png)
          display: inline-block
          vertical-align: top
          width: 0.6rem
          height:0.36rem
          background-size:100%
          background-repeat: no-repeat
        .name
          margin-left 0.12rem
          font-size 0.32rem
          line-height 0.36rem
          font-weight bold
      .description
        margin-bottom 0.2rem
        line-height 0.24rem
        font-size 0.24rem
        color #fff
      .support
        color #fff
        .text
          line-height 0.24rem
          font-size 0.2rem
  .bulletin-wrapper
    width 100%
    height 0.56rem
    line-height 0.56rem
    padding 0rem 0.44rem 0rem 0.24rem
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    background-color rgba(7,17,27,0.2)
    color #fff
    .bulletin-title
      display: inline-block;
      vertical-align: top;
      margin-top: 0.16rem
      width: 0.44rem
      height: 0.24rem
      background-image: url(../../assets/img/text/brand@2x.png)
      background-size:100%
      background-repeat: no-repeat
  .support-count
    position: absolute
    right:0.24rem
    bottom: 0.8rem
    padding: 0 0.32rem
    height: 0.48rem
    line-height: 0.48rem
    border-radius: 0.28rem
    background: rgba(0,0,0,0.2)
    text-align: center
    color #fff
    z-index 2
  .detail
    position fixed
    top 0rem
    left 0rem
    width 100%
    height 100%
    overflow auto
    transition all 0.5s
    background-color rgba(7,17,27,0.8)
    z-index 99
    &..fade-enter-active, &.fade-leave-active
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
    &.fade-enter, &.fade-leave-to
      opacity: 0
      background: rgba(7, 17, 27, 0)
    .detail-wrapper
      width:100%
      min-height:100%
      .detail-main
        margin-top 1.28rem
        padding-bottom:1.28rem
        color #fff
        .star-wrapper
          margin-top 0.36rem
          padding 0.04rem 0rem
          text-align center
        .detail-title
          display flex
          width 80%
          margin 0.56rem auto 0.48rem auto
          .line
            flex 1
            position relative
            &:after
              width 100%
              content ''
              position absolute
              top 50%
              margin-top -0.5px
              height 1px
              background-color rgba(255,255,255,0.2)
          .text
            color #ffffff
            padding: 0 0.24rem
            font-weight: 700
            font-size: 0.28rem
        .detail-desc
          width 80%
          margin 0 auto
          font-size 0.24rem
          line-height 0.48rem
      .supports-list
        width 80%
        margin 0 auto;
        .supports-item
          padding 0 0.24rem
          margin-bottom 0.24rem
          font-size 0
          .icon
            width 0.32rem
            height 0.32rem
            margin-right 0.12rem
          .item-text
            line-height 0.32rem
            font-size 0.24rem
      .detail-name
        line-height 0.32rem
        text-align center
        font-size 0.32rem
        font-weight 700
    .detail-close
      position relative
      text-align center
      color #ffffff
      font-size 0.64rem
      width 0.64rem
      height 0.64rem
      margin:-1.28rem auto 0rem auto
      i
        display inline-block
        font-family '宋体'
        font-style normal
</style>
