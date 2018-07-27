<template>
  <div class="position">{{address}}</div>
</template>
<script>
function showPosition (position) {
  console.log(position)
}
function showError (error) {
  console.log(error)
}
export default {
  name: 'position',
  data () {
    return {
      msg: 'address',
      address: ''
    }
  },
  methods: {
    showPosition (position) {
      console.log(position)
      this.address = position.coords.latitude + '-----' + position.coords.longitude
    }
  },
  created () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError)
    } else {
      console.log('不支持')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .position
    color #ffffff
    font-size 0.3rem
</style>
