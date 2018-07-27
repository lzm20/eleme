<template>
  <div class="share"></div>
</template>
<script>
import AppWeixinShareUtil from './ApplicationShare'
export default {
  data () {
    return {
      msg: 'wxShare'
    }
  },
  created () {
    let config = {
      appid: 'wxbf477afaf3834a37',
      debug: false,
      timestamp: '1532573429',
      nonceStr: '',
      signature: '2da7a00eed0edd6b3565b38f81fac82a'
    }
    let sharedata = {
      title: '分享标题',
      desc: '分享描述',
      link: 'http://www.baidu.com',
      imgUrl: 'http://qing.huandengpai.com/tem/sap/sapworldcup/images/share.jpg'
    }
    AppWeixinShareUtil.setupWeixinShare(config, sharedata)
  }
}
</script>
