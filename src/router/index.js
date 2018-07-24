import Vue from 'vue'
import Router from 'vue-router'
import Shop from '../Shop'
import Home from '@/components/home/Home'
import Goods from '@/components/good/Goods'
import Comment from '@/components/comment/Comment'
import Merchant from '@/components/merchant/Merchant'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
      meta: {
        title: '店铺'
      },
      children: [
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
    }
  ]
})
