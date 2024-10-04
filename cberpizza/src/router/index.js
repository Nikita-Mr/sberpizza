import { createRouter, createWebHistory } from 'vue-router';
import AppPizza from '../views/AppPizza.vue';
import AppProfile from '../views/AppProfile.vue';
import AppBasket from '../views/AppBasket.vue';
import AppRegister from '../views/AppRegister.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pizza',
      name: 'pizza',
      component: AppPizza,
    },

    {
      path: '/profile',
      name: 'profile',
      component: AppProfile,
    },

    {
      path: '/basket',
      name: 'basket',
      component: AppBasket,
    },
    {
      path: '/register',
      name: 'register',
      component: AppRegister,
    },
  ],
});

export default router;
