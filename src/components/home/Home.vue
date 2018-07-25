<template>
  <div class="home">
    <v-head></v-head>
    <div class="shop-list">
      <router-link :to="{'path':'/shop','query':{id:'0'}}">去店铺</router-link>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import head from '../common/Head'
import foot from '../foot/Foot'
export default {
  components: {
    foot,
    'v-head': head
  }
}
</script>
