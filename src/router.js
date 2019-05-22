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
import store from './store'
import axios from 'axios'

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
        header: 'Gestion'
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
  // TODO maybe we can handle the to.name login in the next
  if (store.getters.authorization === null && to.name !== 'login') {
    axios.get(`${process.env.VUE_APP_API_URL}/auth/token`, { withCredentials: true })
      .then(response => {
        store.commit('user', response.data.data.user)
        store.commit('authorization', response.data.data.authorization)
        next()
      })
      .catch(() => {
        store.commit('user', null)
        store.commit('authorization', null)
        next()
      })
  } else {
    next()
  }
})

export default router
