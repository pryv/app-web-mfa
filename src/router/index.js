import Vue from 'vue';
import Router from 'vue-router';
import Activation from '@/components/Activation';
import Deactivation from '@/components/Deactivation';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'activate',
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
  ],
});
