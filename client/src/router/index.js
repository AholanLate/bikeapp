import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Journeys from '../views/Journeys.vue'
import Stations from '../views/Stations.vue'
import StationDetails from '../views/StationDetails.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/journeys',
    name: 'journeys',
    component: Journeys
  },
  {
    path: '/stations',
    name: 'stations',
    component: Stations
  },
  {
    path: '/stations/:id',
    name: 'stationDetails',
    component: StationDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
