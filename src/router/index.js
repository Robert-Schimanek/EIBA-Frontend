import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SelectionII from '../views/SelectionII.vue';
import Avise from '../views/Avise.vue';
import Goodsin from '../views/Goods_in.vue';
import Goodsout from '../views/Goods_out.vue';
import Boxes from '../views/Boxes.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/selection',
    name: 'Selection',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Selection,
  },
  {
    path: '/selectionII',
    name: 'SelectionII',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SelectionII,
  },
  {
    path: '/Avise',
    name: 'Avise',
    component: Avise,
  },
  {
    path: '/Goodsin',
    name: 'Goodsin',
    component: Goodsin,
  },
  {
    path: '/Goodsout',
    name: 'Goodsout',
    component: Goodsout,
  },
  {
    path: '/Boxes',
    name: 'Boxes',
    component: Boxes,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
