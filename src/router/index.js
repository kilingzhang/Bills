import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Welcome from '@/components/welcome'
import Customers from '@/components/customers'
import Bills from '@/components/bills'
import Settings from '@/components/settings'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      // ...
      console.log(to)
      next()
    }
  }, {
    path: '/',
    name: 'welcome',
    component: Welcome,
    beforeEnter: (to, from, next) => {
      // ...
      console.log(to)
      next()
    }
  },
    {
      path: '/customers',
      name: 'customers',
      component: Customers,
      beforeEnter: (to, from, next) => {
        // ...
        console.log(to)
        next()
      }
    },
    {
      path: '/bills/:customerId',
      name: 'bills',
      component: Bills,
      beforeEnter: (to, from, next) => {
        // ...
        console.log(to)
        next()
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      beforeEnter: (to, from, next) => {
        // ...
        console.log(to)
        next()
      }
    }
  ]
})
