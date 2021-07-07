import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),

    },
    {
        path:'/person',
        name:'person',
        component: () => import('../components/personPage.vue')
    },
    {
        path:'/shoppingTrolley',
        name:'shoppingTrolley',
        component: () => import('../components/shoppingTrolley.vue')
    },
  {
       path:'/pickBook',
       name:'pickBook',
       component: () => import('../components/pickBook.vue')
   },
   {
       path:'/index', 
       name:'index',
       component: () => import('../views/index.vue')
   },
   {
       path:'/bookInfo',
       name:'bookInfo',
       component: () => import('../views/bookInfo.vue')
   }
]

const router = new VueRouter({
    routes
})

export default router