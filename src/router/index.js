import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/dashboard/index'
import App from '../App.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Dashboard
    },
    {
      path: '/login',
      component: () => import('@/views/login/index')
    },
    {
      path: '/change-pass',
      component: () => import('@/views/login/change-pass')
    },
    {
      path: '/bonus-trial',
      component: () => import('@/views/bonus-trial')
    },
    {
      path: '/bonus-result',
      component: () => import('@/views/bonus-trial/result')
    },
    {
      path: '/bonus-bill',
      redirect: '/bonus-bill/index',
      component: App,
      children: [
        {
          path: 'index',
          component: () => import('@/views/bonus-bill/index'),
        },
        {
          path: 'detail',
          component: () => import('@/views/bonus-bill/components/detail'),
        },
        {
          path: 'sort',
          component: () => import('@/views/bonus-bill/components/sort'),
        },
        {
          path: 'list',
          component: () => import('@/views/bonus-bill/components/list'),
        }
      ]
    },
    {
      path: '/appeal',
      component: App,
      redirect: '/appeal/index',
      children: [
        {
          path: 'index',
          component: () => import ('@/views/appeal/index'),
        },
        {
          path: 'add',
          component: () => import('@/views/appeal/components/add'),
        },
        {
          path: 'detail',
          component: () => import('@/views/appeal/components/detail'),
        }
      ]
    },
    {
      path: '/policy',
      component: App,
      redirect: '/policy/index',
      children: [
        {
          path: 'index',
          component: () => import ('@/views/policy/index'),
        },
        {
          path: 'detail',
          component: () => import ('@/views/policy/detail'),
        },
        {
          path: 'view-pdf',
          component: () => import ('@/views/policy/components/view-pdf'),
        },
      ]
    }
  ]
})