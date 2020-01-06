import Vue from 'vue';
import Router from 'vue-router';
import Activation from '@/components/Activation';
import Deactivation from '@/components/Deactivation';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'Activate' },
    },
    {
      path: '/activate',
      name: 'Activate',
      component: Activation,
    },
    {
      path: '/deactivate',
      name: 'Deactivate',
      component: Deactivation,
    },
    {
      path: '*',
      redirect: { path: '/' },
    },
  ],
});
