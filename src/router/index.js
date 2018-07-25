import Vue from 'vue'
import Router from 'vue-router'

import Shop from '@/components/Shop'
import Home from '@/components/home/Home'
import Goods from '@/components/good/Goods'
import Comment from '@/components/comment/Comment'
import Merchant from '@/components/merchant/Merchant'
import My from '@/components/my/My'
import Order from '@/components/order/Order'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/home',
      name: '首页',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/shop',
      name: '店铺',
      component: Shop,
      meta: {
        title: '店铺'
      },
      children: [
        {
          path: '/shop/goods',
          name: '商品',
          component: Goods,
          meta: {
            title: '商品'
          }
        },
        {
          path: '/shop/comment',
          name: '评论',
          component: Comment,
          meta: {
            title: '评论'
          }
        },
        {
          path: '/shop/merchant',
          name: '商家',
          component: Merchant,
          meta: {
            title: '商家'
          }
        }
      ]
    },
    {
      path: '/order',
      name: '订单',
      component: Order,
      meta: {
        title: '订单'
      }
    },
    {
      path: '/my',
      name: '我的',
      component: My,
      meta: {
        title: '我的'
      }
    }
  ]
})
