/*
 * File: router.js
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 13th February 2019
 * Last Modified: 22nd May 2019
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      component: () => import('./views/Section.vue'),
      meta: {
        title: 'La section Genevoise',
        header: 'Section Genevoise'
      }
    },
    {
      path: '/therapist',
      name: 'therapist',
      component: () => import('./views/Therapist.vue'),
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
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        title: 'Connectez-vous',
        header: 'Connection'
      }
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('./views/Management.vue'),
      meta: {
        title: 'Gestion des données',
        header: 'Management'
      }
    },
    {
      path: '/activate',
      name: 'activate',
      component: () => import('./views/Activate.vue'),
      meta: {
        title: 'Activer le compte',
        header: 'Activation'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
