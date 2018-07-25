<template>
  <div class="back" @click='back' v-if='isShow'></div>
</template>
<script>
export default {
  data () {
    return {
      msg: '返回',
      isShow: true
    }
  },
  computed: {
    current () {
      return this.$router.history.current.fullPath
    }
  },
  created () {
    if (this.current === '/' || this.current.includes('home')) {
      this.isShow = false
    }
  },
  methods: {
    back () {
      if (this.current.includes('shop')) {
        this.$router.push({'path': '/'})
      } else {
        this.$router.history.go(-1)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mixin'
.back
  position: fixed
  top: 0.2rem
  left: 0.2rem
  z-index: 5
  width: 0.5rem
  height: 0.5rem
  border-radius 0.5rem
  background-position: center
  background-repeat: no-repeat
  background-size: 60%
  bg-back('black')
  background-color rgba(255,255,255,0.8)
  z-index: 8
</style>
