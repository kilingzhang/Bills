import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/customers',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/bills',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/settings',
      name: 'welcome',
      component: Welcome
    }
  ]
})
