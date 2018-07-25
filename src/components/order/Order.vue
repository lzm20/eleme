<template>
  <div class="order">
    <v-head></v-head>
    {{msg}}
  </div>
</template>
<script>
import head from '../common/Head'
export default {
  data () {
    return {
      msg: '订单'
    }
  },
  components: {
    'v-head': head
  }
}
</script>
