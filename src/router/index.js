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
        path:'/shopping',
        name:'shopping',
        component: () => import('../components/shopping.vue'),
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
       path:'/bookDetailedInfo',
       name:'bookDetailedInfo',
       component: () => import('../views/bookDetailedInfo.vue')
    },
    {
        path:'/adminManage',
        name:'adminManage',
        component: () => import('../components/adminManage.vue')
    },
    {
        path:'/manageClass',
        name:'manageClass',
        component: () => import('../components/manageClass.vue')
    },
    {
        path:'/manageMerchant',
        name:'manageMerchant',
        component: () => import('../components/manageMerchant.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router