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
          path: 'voteMap',
          name: 'voteMap',
          component: () => import('../views/VoteMap.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // {
    //   path: 'VoteMap',
    //   name: 'VoteMap',
    //   component: () => import('../views/VoteMap.vue'),
    // },
  ],
});

export default router;
