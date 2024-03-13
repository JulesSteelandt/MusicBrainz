import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from "@/views/NotFound.vue";
//import ArtistView from "@/views/ArtistView.vue";
//import TitleView from "@/views/TitleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: () => import('../views/ArtistView.vue')
    },
    {
      path: '/title/:id',
      name: 'title',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router
