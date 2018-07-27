import Vue from 'vue'
import Router from 'vue-router'

import Shop from '@/components/Shop'
import Home from '@/components/home/Home'
import Goods from '@/components/good/Goods'
import Comment from '@/components/comment/Comment'
import Merchant from '@/components/merchant/Merchant'
import My from '@/components/my/My'
import Order from '@/components/order/Order'
import Login from '@/components/login/Login'
import Search from '@/components/search/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
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
          path: '/shop/goods',
          name: 'goods',
          component: Goods,
          meta: {
            title: '商品'
          }
        },
        {
          path: '/shop/comment',
          name: 'comment',
          component: Comment,
          meta: {
            title: '评论'
          }
        },
        {
          path: '/shop/merchant',
          name: 'merchant',
          component: Merchant,
          meta: {
            title: '商家'
          }
        }
      ]
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        title: '订单'
      }
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      meta: {
        title: '我的'
      }
    }
  ]
})
