<template>
  <div class="comment" ref='commenwrapper'>
    <div class="comment-contain">
      <div class="comment-top">
        <div class="left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="right">
          <div class="server-attitude">
            <div class="title">服务态度</div>
            <star :size='36' :score='seller.serviceScore'></star>
            <div class='count'>{{seller.serviceScore}}</div>
          </div>
          <div class="sceller-score">
            <div class="title">商品评分</div>
            <star :size='36' :score='seller.foodScore'></star>
            <div class='count'>{{seller.foodScore}}</div>
          </div>
          <div class="service-time">
            <span class="title">送达时间</span>
            <span class='delivery'>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="comment-tab">
        <ratingselect v-if='comment' :ratings='comment' :type='commentType' v-on:changeType='change'></ratingselect>
      </div>
      <div class="comment-list border-top1px" v-if='comment'>
        <ul>
          <li class="border-bot1px" :key='index' v-for='(com,index) in initComment'>
            <div class="left">
              <img :src="com.avatar" alt="">
            </div>
            <div class="right">
              <div class="r-t clearfix">
                <span class='username'>{{com.username}}</span>
                <span class="times">{{times(com.rateTime)}}</span>
              </div>
              <div class="r-middle">
                <star :size="24" :score="com.score"></star>
              </div>
              <div class="r-text" v-if='com.text.length>0'>{{com.text}}</div>
              <div class="r-recommend" v-if='com.recommend.length>0'>
                <span :key='indexs' v-for='(reitem,indexs) in com.recommend'>{{reitem}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {formatDate} from '@/assets/js/base'
import star from '../star/Star'
import ratingselect from '../ratingselect/Ratingselect'
import {ALL} from '../../assets/js/initData'
import split from '../split/Split'
const ERROR_OK = 0
export default {
  data () {
    return {
      msg: '评论',
      comment: []
    }
  },
  computed: {
    commentType () {
      return this.$store.state.commentType
    },
    initComment () {
      if (this.commentType === ALL) {
        return this.comment
      } else {
        return this.comment.filter((val) => {
          return val.rateType === this.commentType
        })
      }
    }
  },
  components: {
    star,
    ratingselect,
    split
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    selectType (type) {
      console.log(type)
    },
    times (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    },
    change (tp) {
      this.$store.commit('changeCommentType', tp)
    }
  },
  created () {
    this.$http.get('/api/ratings').then((res) => {
      res = res.body
      if (res.errno === ERROR_OK) {
        this.comment = res.data
      }
    })
    this.$nextTick(() => {
      this.commentScroll = new this.BScroll(this.$refs.commenwrapper, {})
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/css/mixin'
.comment
  position absolute
  top: 0rem
  left: 0rem
  width: 100%
  bottom: 0rem
  overflow: hidden;
  .comment-top
    display flex
    padding 0.36rem 0rem
    .left
      flex 0 0 2.74rem
      padding: 0.12rem 0
      width: 2.74rem
      border-right: 1px solid rgba(7,17,27,0.1)
      text-align: center
      .score
        margin-bottom: 0.12rem
        font-size: 0.48rem
        color: #f90
        font-weight normal
      .title
        margin-bottom: 0.16rem
        line-height:0.24rem
        font-size:0.24rem
        color: #07111b
      .rank
        line-height:0.2rem
        font-size:0.2rem
        color: #93999f
    .right
      flex 1
      padding: 0.12rem 0 0.12rem 0.48rem
      .title
        display inline-block
        line-height: 0.36rem
        vertical-align: top
        font-size:0.24rem
        color: #07111b
      .star
        display inline-block
        vertical-align top
        padding 0rem 0.2rem
      .count
        display: inline-block
        line-height: 0.36rem
        vertical-align: top
        font-size: 0.24rem
        color: #f90
      .server-attitude
        margin-bottom 0.16rem
        font-size 0rem
      .sceller-score
        margin-bottom 0.16rem
        font-size 0rem
      .delivery
        margin-left:0.24rem
        font-size: 0.24rem
        color: #93999f
  .comment-tab
    padding-bottom 0.36rem
    margin 0 0.36rem
  .comment-list
    padding 0rem 0.36rem
    li
      padding 0.36rem 0rem
      display flex
      .left
        flex 0 0 0.58rem
        width 0.58rem
        margin-right 0.32rem
        height 0.58rem
        border-radius 0.58rem
        overflow hidden
        img
          width 0.58rem
      .right
        flex 1
        .r-t
          margin-bottom 0.08rem
          font-size 0.2rem
          color #07111b
          .username
            float left
          .times
            float right
            color: #93999f
        .r-middle
          margin-bottom 0.12rem
          font-size 0rem
        .r-text
          margin-bottom: 0.16rem
          line-height:0.36rem
          color: #07111b
          font-size:0.24rem
        .r-recommend
          span
            display inline-block
            margin 0.05rem 0.08rem
            font-size 0.18rem
            padding: 0 0.12rem
            border: 1px solid rgba(7,17,27,0.1)
            border-radius: 1px
            color: #93999f
            background: #fff

</style>
<style>
  @import url(../../assets/css/icon)
</style>
