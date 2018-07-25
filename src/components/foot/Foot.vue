<template>
  <div id="foot">
    <div class="foot-item">
      <router-link to='/home'>首页</router-link>
    </div>
    <div class="foot-item">
      <router-link to='/order'>订单</router-link>
    </div>
    <div class="foot-item">
      <router-link to='/my'>我的</router-link>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  #foot
    position fixed
    bottom 0rem
    left 0rem
    z-index 9
    display flex
    width 100%
    height 0.96rem
    border-top 1px solid #cecdcd
    .foot-item
      flex 1
      height 0.96rem
      text-align center
      line-height 0.96rem
      color #000
      font-size 0.3rem
</style>
