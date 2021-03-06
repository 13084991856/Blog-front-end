import axios from 'axios'
import store from '../store/index'
axios.defaults.baseURL = 'http://47.106.179.142:3000/';
export default function setAxios() {
    //请求拦截
    axios.interceptors.request.use(
        config => {
            if (store.state.token) {
                // 将token设置在headers ['Authorization'] 上面
                config.headers['Authorization'] = `Bearer ${store.state.token}`
            }
            return config
        }
    )
}