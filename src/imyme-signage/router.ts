import Vue from 'vue';
import Router from 'vue-router';
import Home from '@signage/views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@signage/views/About.vue'),
    },
    {
      path: '/about/clean',
      name: 'about-clean',
      component: () => import('@signage/views/AboutClean.vue'),
    },
    {
      path: '/about/recipe',
      name: 'about-recipe',
      component: () => import('@signage/views/AboutRecipe.vue'),
    },
    {
      path: '/about/step',
      name: 'about-step',
      component: () => import('@signage/views/AboutStep.vue'),
    },
    {
      path: '/about/essence',
      name: 'about-essence',
      component: () => import('@signage/views/AboutEssence.vue'),
    },
    {
      path: '/about/subscription',
      name: 'about-subscription',
      component: () => import('@signage/views/AboutSubscription.vue'),
    },
  ],
});
