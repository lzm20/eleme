<template>
  <div class='eval-tab'>
    <button class='btn-sort' @click='selectType(btn.type)' :class="{'cur':btn.type==type}" :key='index' :type='btn.type' v-for='(btn,index) in btnList'>{{btn.text}}{{ratingsCount(btn.type)}}</button>
  </div>
</template>
<script>
import {ALL, REC, COM} from '../../assets/js/initData'
export default {
  props: {
    type: {
      type: Number
    },
    ratings: {
      type: Array
    }
  },
  data () {
    return {
      btnList: [
        {type: ALL, text: '全部'},
        {type: REC, text: '推荐'},
        {type: COM, text: '吐槽'}
      ]
    }
  },
  methods: {
    selectType (tp) {
      this.$emit('changeType', tp)
    },
    ratingsCount (type) {
      if (type === ALL) {
        return this.ratings.length
      } else {
        return this.ratings.filter((val) => {
          return val.rateType === type
        }).length
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
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
</style>
