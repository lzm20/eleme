<template>
  <div class="merchant" ref='merchantwrapper'>
    <div class="merchant-contain">
      <div class="overview">
        <div class='border-bot1px'>
          <div class="title">{{seller.name}}</div>
          <div class="ov-middle clearfix">
            <div class="star-wrapper">
              <star :size='36' :score='seller.foodScore'></star>
            </div>
            <span class='count'>({{seller.ratingCount}})</span>
            <span class='sale'>月售{{seller.sellCount}}单</span>
          </div>
          <div class="collection" @click='collection'>
            <i class='icon-keep' :class="{'active':isKeep}"></i>
            <span v-if='!isKeep'>收藏</span>
            <span v-if='isKeep'>已收藏</span>
          </div>
        </div>
      </div>
      <div class="remark">
        <ul>
          <li>
            <div class="re-title">起送价</div>
            <div class="remark-count"><span>{{seller.minPrice}}</span>元</div>
          </li>
          <li>
            <div class="re-title">商家配送</div>
            <div class="remark-count"><span>{{seller.deliveryPrice}}</span>元</div>
          </li>
          <li>
            <div class="re-title">平均配送时间</div>
            <div class="remark-count"><span>{{seller.deliveryTime}}</span>分钟</div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="announcement">
        <div class="title">公告与活动</div>
        <p>{{seller.bulletin}}</p>
      </div>
      <div class="preferential">
        <ul>
          <li class='border-top1px' :key='index' v-for='(preItem,index) in seller.supports'>
            <i class="icon" :class="classMap[preItem['type']]"></i>
            <span class='desc'>{{preItem.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="merchant-scene">
        <div class="title">商家实景</div>
        <div class="scene-wrapp" ref='scenewrapper'>
          <ul ref='innerwrapper'>
              <li :key='index' v-for='(sceneIten,index) in seller.pics' ref='liitem'>
                <img :src="sceneIten" alt="">
              </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="merchant-news">
        <div class="title">商家信息</div>
        <ul>
          <li class='border-top1px' :key='index' v-for='(infor,index) in seller.infos'>
            {{infor}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import star from '@/components/star/Star'
import split from '../split/Split'
export default {
  data () {
    return {
      msg: '商家',
      isKeep: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  components: {
    star,
    split
  },
  props: {
    seller: {
      type: Object
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.merchantScroll = new this.BScroll(this.$refs.merchantwrapper, {
        click: true
      })
      let width = 0
      for (let i = 0; i < this.seller.pics.length; i++) {
        width += this.$refs.liitem[0].getBoundingClientRect().width
      }

      this.$refs.innerwrapper.style.width = width + 'px'
      this.sceneScroll = new this.BScroll(this.$refs.scenewrapper, {
        scrollX: true,
        eventPassthrough: 'vertical'
      })
    })
  },
  methods: {
    collection () {
      this.isKeep = !this.isKeep
      if (this.isKeep) {
        console.log('push 收藏列表')
      } else {
        console.log('从收藏列表中 delete')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/css/mixin'
  .merchant
    position absolute
    top 0rem
    bottom 0rem
    width 100%
    overflow hidden
    .overview
      padding 0.36rem 0.36rem 0rem 0.36rem
      position relative
      .title
        margin-bottom: 0.16rem
        line-height: 0.28rem
        color: #07111b
        font-size:0.28rem
      .ov-middle
        padding-bottom 0.36rem
        font-size 0.36rem
        .star-wrapper
          float left
          margin-right 0.24rem
          line-height 0.36rem
          vertical-align: top
        .count
          float left
          margin-right: 0.24rem
          vertical-align: top
          font-size: 0.2rem
          color: #4d555d
        .sale
          float left
          margin-right:0.24rem
          vertical-align: top
          font-size: 0.2rem
          color: #4d555d
      .collection
        position absolute
        top:0.36rem
        right 0.36rem
        width 1rem
        text-align center
        .icon-keep
          display block
          margin 0 auto
          width 0.6rem
          height 0.6rem
          bg-keep('keep')
          background-repeat no-repeat
          background-size 100%
          background-position center
          &.active
            bg-keep("keep-active")
        span
          font-size:0.2rem
          color: #4d555d
    .remark
      padding 0.36rem
      ul
        display flex
        li
          flex 1
          border-right 1px solid rgba(7,17,27,0.1)
          text-align center
          .re-title
            margin-bottom: 0.08rem
            line-height: 0.2rem
            font-size: 0.2rem
            color: #93999f
          .remark-count
            line-height: 0.48rem
            font-size: 0.2rem
            color: #07111b
            span
              font-size 0.48rem
          &:nth-last-child(1)
            border none
    .announcement
      padding 0.36rem 0.36rem 0rem 0.36rem
      .title
        margin-bottom: 0.16rem
        line-height:0.28rem
        color: #07111b
        font-size:0.28rem
      p
        line-height: 0.48rem
        font-size: 0.24rem
        color: #f01414
    .preferential
      padding 0.36rem
      li
        padding 0.32rem 0.24rem
        .icon
          display: inline-block
          width: 0.32rem
          height: 0.32rem
          vertical-align: top;
          margin-right: 0.12rem
          background-size:100%
          background-repeat: no-repeat
          &.decrease
            bg-text('decrease_3')
          &.discount
            bg-text('discount_3')
          &.special
            bg-text('special_3')
          &.invoice
            bg-text('invoice_3')
          &.guarantee
            bg-text('guarantee_3')
        .desc
          line-height:0.32rem
          font-size: 0.24rem
          color: #07111b
    .merchant-scene
      padding 0.36rem
      .title
        margin-bottom: 0.24rem
        line-height: 0.28rem
        color: #07111b
        font-size: 0.28rem
      .scene-wrapp
        overflow hidden
        width 100%
        height 1.8rem
        ul
          display flex
          flex-wrap nowrap
          justify-content space-between
          li
            flex 1
            width 2.4rem
            margin-right 0.2rem
            img
              width 2.4rem
    .merchant-news
      padding 0.36rem
      .title
        margin-bottom: 0.24rem
        line-height: 0.28rem
        color: #07111b
        font-size: 0.28rem
      li
        padding: 0.32rem 0.24rem
        line-height:0.32rem
        font-size: 0.24rem
</style>
