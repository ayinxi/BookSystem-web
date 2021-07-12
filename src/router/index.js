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
        path: '/sign',
        name: 'sign',
        component: () => import('../views/sign.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),

    },
    {
        path: '/person',
        name: 'person',
      //meta: { auth: true },//登录鉴权
        component: () => import('../components/personPage.vue')
    },
    {
        path: '/shopping',
        name: 'shopping',
      //meta: { auth: true },//登录鉴权
        component: () => import('../components/shopping.vue')
    },
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue')
    },
    {
        path: '/bookInfo',
        name: 'bookInfo',
        component: () => import('../views/bookInfo.vue')
    },
    {
        path: '/shopManage',
        name: 'shopManage',
        component: () => import('../views/shopManage.vue')
    },
    {
        path: '/bookM',
        name: 'bookM',
        component: () => import('../views/bookM.vue')
    },
    {
        path: '/orderM',
        name: 'orderM',
        component: () => import('../views/orderM.vue')
    },
    {
        path:'/orderInfo',
        name:'orderInfo',
        component: () => import('../views/orderInfo.vue')
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to, from, next) => {
    //to.meta.auth 表示需要做登鉴权
    //不需要的 可以直接next
    if (to.meta.auth) {
      //store.state.token 表示已经登录 可以直接next
      //没有登录 跳转到/login 并携带参数redirect 方便登录后直接跳转到to.path
      if (this.$store.state.token) {
        next();
      } else {
        next({
          path: '/login',
          query: { redirect: to.path }
        })
      }
    } else {
      next();
    }
  })

export default router