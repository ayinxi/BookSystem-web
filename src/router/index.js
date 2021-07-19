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
    path: '/person',
    name: 'person',
    meta: { auth: true },//登录鉴权
    component: () => import('../components/personPage.vue')
  },
  {
    path: '/change',
    name: 'change',
    meta: { auth: true },//登录鉴权
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
    meta: { auth: true },//登录鉴权
    component: () => import('../components/shopManage/shopManage.vue')
  },
  {
    path: '/bookM',
    name: 'bookM',
    meta: { auth: true },//登录鉴权
    component: () => import('../components/shopManage/bookM.vue')
  },
  {
    path: '/orderM',
    name: 'orderM',
    meta: { auth: true },//登录鉴权
    component: () => import('../components/shopManage/orderM.vue')
  },
  {
    path: '/orderInfo',
    name: 'orderInfo',
    meta: { auth: true },//登录鉴权
    component: () => import('../components/shopManage/orderInfo.vue')
  },
  {
    path: '/shopIndex',
    name: 'shopIndex',
    meta: { auth: true },//登录鉴权
    component: () => import('../views/shopIndex.vue')
  },
  {
    path: '/adminManage',
    name: 'adminManage', 
    meta: { auth: true },//登录鉴权
    component: () => import('../components/admin/adminManage.vue')
  },
  {
    path: '/manageClass',
    name: 'manageClass',
    meta: { auth: true },//登录鉴权
    component: () => import('../components/admin/manageClass.vue')
  },
  {
    path: '/manageMerchant',
    name: 'manageMerchant', 
    meta: { auth: true },//登录鉴权
    component: () => import('../components/admin/manageMerchant.vue')
  },
  {
    path: '/manageUser',
    name: 'manageUser',
    meta: { auth: true },//登录鉴权
    component: () => import('../components/admin/manageUser.vue')
  },
  {
    path: '/manageOrder',
    name: 'manageOrder',
    meta: { auth: true },//登录鉴权
    component: () => import('../components/admin/manageOrder.vue')
  },
  {
    path: '/shopping',
    name: 'shopping',
    meta: { auth: true },//登录鉴权
    component: () => import('../components/shopping.vue')
  },
  {
    path: '/refundM',
    name: 'refundM',
    meta: { auth: true },//登录鉴权
    component: () => import('../components/shopManage/refundM.vue')
  },
  {
    path: '/refundInfo',
    name: 'refundInfo',
    meta: { auth: true },//登录鉴权
    component: () => import('../components/shopManage/refundInfo.vue')
  },
  {
    path: '/userorder/:orderId',
    name: 'userorder',
    meta: { auth: true },//登录鉴权
    component: () => import('../views/userOrder.vue')
  },
  {
    path: '/classSort',
    name: 'classSort',
    component: () => import('../views/classSort.vue')
  },
  {
    path: '/shopInfo',
    name: 'shopInfo',
    component: () => import('../components/shopManage/shopInfo.vue')
  },
  {
    path: '/searchBook',
    name: 'searchBook',
    component: () => import('../views/searchBook.vue')
  },
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
    if (sessionStorage.getItem("token")) {
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