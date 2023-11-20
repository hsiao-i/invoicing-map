import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frontView',
      component: () => import('../views/FrontView.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/HomePage.vue'),
        },
        {
          path: 'voteMap',
          name: 'voteMap',
          component: () => import('../views/VoteMap.vue'),
        },
        {
          path: 'votePage',
          name: 'votePage',
          component: () => import('../views/VotePage.vue'),
        },
      ],
    },
  ],
});

export default router;
