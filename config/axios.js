import axios from 'axios'

// 配置默认的host,假如你的API host是：http://api.htmlx.club
//axios.defaults.baseURL = 'http://api.htmlx.club'   

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 判断是否存在token,如果存在将每个页面header添加token
    if (store.state.token) {
        config.headers.common['token'] = store.state.token
    }
    return config
}, function (error) {
    router.push('/login')
    return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
}, function (error) {
    // 对响应错误做点什么
    if (error.response) {
        switch (error.response.status) {
            case 401:
                store.commit('del_token')
                router.push('/login')
        }
    }
    return Promise.reject(error)
})
