import Vue from 'vue'
import Router from 'vue-router'
import Programs from '../views/Programs'
import Program from '../views/Program'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Programs',
      component: Programs,
    },
    {
      path: '/program/:programId',
      name: 'Program',
      component: Program,
      props: true,
    },
  ],
})
