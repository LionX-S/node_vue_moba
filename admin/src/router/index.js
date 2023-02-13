import VueRouter from 'vue-router';

import Main from '../components/Main.vue';

export default new VueRouter({
  routes:[
    {
      path:'/',
      name:'main',
      component:Main
    }
  ]
})