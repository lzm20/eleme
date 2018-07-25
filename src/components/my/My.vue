<template>
  <div class="my">
    <v-head></v-head>
    {{msg}}
  </div>
</template>
<script>
import head from '../common/Head'
export default {
  data () {
    return {
      msg: '我的'
    }
  },
  components: {
    'v-head': head
  }
}
</script>
