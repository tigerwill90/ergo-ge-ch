import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Therapist from './views/Therapist'
import Section from './views/Section'
import Contact from './views/Contact'

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
      component: Section,
      meta: {
        title: 'La section Genevoise',
        header: 'Section Genevoise'
      }
    },
    {
      path: '/therapist',
      name: 'therapist',
      component: Therapist,
      meta: {
        title: 'Où trouver les ergothérapeutes',
        header: 'Où trouver les ergothérapeutes'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
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
