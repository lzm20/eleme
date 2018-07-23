<template>
  <div class="carcontrol clearfix">
    <transition name='move' enter-active-class='move-enter' leave-active-class="move-leave-to">
      <div class="decrease" @click.stop='decrease' v-show="food.count>0">
        <div class="icon-decrease"></div>
      </div>
    </transition>
    <div class="count" v-show='food.count>0'>{{food.count}}</div>
    <div class="add" v-on:click.stop.prevent='add'></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'carcontrol',
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    add (event) {
      console.log(event)
      if (!event._constructed) {
        return false
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count += 1
      }
    },
    decrease (event) {
      if (!event._constructed) {
        return false
      }
      if (this.food.count) {
        this.food.count -= 1
      }
    }
  },
  created () {
    // console.log(this.food)
  }
}
</script>
<style lang="stylus" scoped>
.carcontrol
  width 1.5rem
  .decrease
    float left
    width 0.5rem
    display inline-block
    height 0.7rem
    transition all 0.5s
    .icon-decrease
      width 0.5rem
      height 0.7rem
      background-image url('./decrease.png')
      background-position center
      background-size 90%
      background-repeat no-repeat
    &.move-transition
      opacity: 1
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave-to
      opacity: 0
      transform: translate3d(0.48rem, 0, 0)
  .count
    width 0.5rem
    display inline-block
    height 0.7rem
    line-height 0.7rem
    text-align center
    color #93999f
    font-size 0.2rem
  .add
    height 0.7rem
    width 0.5rem
    display inline-block
    float right
    background-image url('./add.png')
    background-position center
    background-size 90%
    background-repeat no-repeat
</style>
