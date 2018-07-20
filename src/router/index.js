import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/good/Goods'
import Comment from '@/components/comment/Comment'
import Merchant from '@/components/merchant/Merchant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods,
      meta: {
        title: '商品'
      }
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment,
      meta: {
        title: '评论'
      }
    },
    {
      path: '/merchant',
      name: 'Merchant',
      component: Merchant,
      meta: {
        title: '商家'
      }
    }
  ]
})
