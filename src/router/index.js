import Vue from 'vue';
import Router from 'vue-router';
import ComplaintsSection from '@/components/ComplaintsSection.vue';
import ChatSection from '@/components/ChatSection.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Complaints',
      component: ComplaintsSection,
    },
    {
      path: '/chat',
      name: 'Chat',
      component: ChatSection,
      props: true // 允许通过 `props` 传递参数
    }
  ]
});
