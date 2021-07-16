import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

if (sessionStorage.getItem('token')) {
  this.$store.commit('setToken', sessionStorage.getItem('token'))
}


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
    path: '/person',
    name: 'person',
    //meta: { auth: true },//登录鉴权
    component: () => import('../components/personPage.vue')
  },
  {
    path: '/change',
    name: 'change',
    //meta: { auth: true },//登录鉴权
    component: () => import('../components/userInfoChange.vue')
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
    component: () => import('../components/shopManage/shopManage.vue')
  },
  {
    path: '/bookM',
    name: 'bookM',
    component: () => import('../components/shopManage/bookM.vue')
  },
  {
    path: '/orderM',
    name: 'orderM',
    component: () => import('../components/shopManage/orderM.vue')
  },
  {
    path: '/orderInfo',
    name: 'orderInfo',
    component: () => import('../components/shopManage/orderInfo.vue')
  },
  {
    path: '/shopIndex',
    name: 'shopIndex',
    component: () => import('../views/shopIndex.vue')
  },
  {
    path: '/adminManage',
    name: 'adminManage',
    component: () => import('../components/adminManage.vue')
  },
  {
    path: '/manageClass',
    name: 'manageClass',
    component: () => import('../components/manageClass.vue')
  },
  {
    path: '/manageMerchant',
    name: 'manageMerchant',
    component: () => import('../components/manageMerchant.vue')
  },
  {
    path: '/manageUser',
    name: 'manageUser',
    component: () => import('../components/manageUser.vue')
  },
  {
    path: '/manageOrder',
    name: 'manageOrder',
    component: () => import('../components/manageOrder.vue')
  },
  {
    path: '/shopping',
    name: 'shopping',
    //meta: { auth: true },//登录鉴权
    component: () => import('../components/shopping.vue')
  },
  {
    path: '/refundM',
    name: 'refundM',
    component: () => import('../components/shopManage/refundM.vue')
  },
  {
    path: '/refundInfo',
    name: 'refundInfo',
    component: () => import('../components/shopManage/refundInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
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