import { createRouter, createWebHistory } from 'vue-router'
import Home from '../layout/Home.vue'
import Journeys from '../layout/Journeys.vue'
import Stations from '../layout/Stations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layout/Home.vue')
    },
    {
      path: '/journeys',
      name: 'journeys',
      component: () => import('../layout/Journeys.vue')
    },
    {
      path: '/stations',
      name: 'stations',
      component: () => import('../layout/Stations.vue')
    }
  ]
})

export default router
