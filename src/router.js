import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Accueil - Bienvenue sur le portail ASE',
        header: 'Accueil'
      }
    },
    {
      path: '/geneva-section',
      name: 'section',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Section'),
      meta: {
        title: 'La section Genevoise',
        header: 'Section Genevoise'
      }
    },
    {
      path: '/therapist',
      name: 'therapist',
      component: () => import('./views/Therapist'),
      meta: {
        title: 'Où trouver les ergothérapeutes',
        header: 'Où trouver les ergothérapeutes'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact.vue'),
      meta: {
        title: 'Nous contacter',
        header: 'Contacte'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
