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
]

const router = new VueRouter({
    routes
})

export default router