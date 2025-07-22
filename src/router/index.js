import { createWebHistory, createRouter } from "vue-router";
import Home from '../views/Home'
import SignIn from '../views/auth/SignIn'
import SignUp from '../views/auth/SignUp'
import BookList from '../views/book/BookList'
import BookEdit from '../views/book/BookEdit'
import BookDetail from '../views/book/BookDetail'
import NotFound from '../views/error/NotFound'
import store from '../store'

const routes = [
  { path: '/', component: Home },
  { path: '/signin', component: SignIn, meta: { requiresAuth: false } },
  { path: '/signup', component: SignUp, meta: { requiresAuth: false } },
  {
    path: '/books',
    children: [
      { path: '', component: BookList, meta: { requiresAuth: true } },
      { path: 'new', component: BookEdit, meta: { requiresAuth: true } },
      { path: ':slug', component: BookDetail, meta: { requiresAuth: true } },
      { path: ':slug/edit', component: BookEdit, meta: { requiresAuth: true } },
    ]
  },
  { path: '/:catchAll(.*)', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['user/isAuthenticated'];

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signin');
  } else if (isAuthenticated && (to.path === '/signin' || to.path === '/signup')) {
    next('/');
  } else {
    next();
  }
});

export default router;
