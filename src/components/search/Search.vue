<template>
  <div class="search">
    <v-head></v-head>
    <div class="search-wrapper">
      <div class="s-top">
        <input type="text" id='search-input' class="search-input" placeholder="搜索">
      </div>
    </div>
  </div>
</template>
<script>
import head from '../common/Head'
export default {
  name: 'search',
  data () {
    return {
      msg: '搜索'
    }
  },
  components: {
    'v-head': head
  }
}
</script>
<style lang="stylus" scoped>
  .search-wrapper
    padding 0.36rem
    .s-top
      width 100%
      height 0.8rem
      border 1px solid #afafaf
      font-size: 0.28rem
      color: #000
      input
        width 100%
        height 100%
        padding-left 0.2rem
        &:focus，&:active
          border-color: rgba(82, 168, 236, 0.8);
          outline: 0;
          outline: thin dotted \9;
          -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
          -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
</style>
