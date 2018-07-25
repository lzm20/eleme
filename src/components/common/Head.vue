<template>
  <div id="head">
    <back></back>
    <div class="middle">
      <span class="title">{{title}}</span>
    </div>
  </div>
</template>
<script>
import Back from '../back/Back'
export default {
  data () {
    return {
      title: ''
    }
  },
  components: {
    Back
  },
  created () {
    this.title = this.$route.meta.title
  }
}
</script>
<style lang="stylus" scoped>
  #head
    position fixed
    top 0rem
    left 0rem
    width 100%
    height 0.96rem
    background-color #fff
    .middle
      width 100%
      height 100%
      text-align center
      line-height 0.96rem
      color #000
      font-size 0.3rem
</style>
