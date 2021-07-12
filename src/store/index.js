import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocalStorage = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    token:localStorage.getItem('token') || '',
    gobalSearchText:"",
    gobalSearchType:"",
    hasUnfinishedRoute: false,
    unfinishedRoute: {},
    permission:[],
    roleHasLoad:false,
    function:{},
    role:{},
  },
  mutations: {
    saveUnfinishedRoute(state, payload) {
      state.hasUnfinishedRoute = true
      state.unfinishedRoute = payload
    },
    clearUnfinishedRoute(state) {
      state.hasUnfinishedRoute = false
    },
    clearCache(state) {
      state.hasUnfinishedRoute=false
      state.unfinishedRoute= {}
      state.ainiyou=''
      state.token = ""
      state.function  ={}
      state.role ={}
      state.cardnum =""
      state.permission=[]
      state.gobalSearchText=""
      state.gobalSearchType=""
      state.name = ""
      state.roleHasLoad = false
    },
    clearCacheWithoutRoute(state){
      state.ainiyou=''
      state.token = ""
      state.function  ={}
      state.permission=[]
      state.gobalSearchText=""
      state.gobalSearchType=""
      state.roleHasLoad = false
    },
    token(state, payload) {
      state.token = payload
    },
    roleHasLoad(state,payload) {
      state.roleHasLoad = payload
    },
    permission(state, payload) {
      state.permission = payload
    },
    role(state,payload){
      state.role = payload;
    },
    function(state,payload){
      state.function = payload;
    },
    gobalSearchType(state, payload) {
      state.gobalSearchType = payload
    },
    gobalSearchText(state, payload) {
      state.gobalSearchText = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
