import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';

let loading: any;
const startLoading = () => {
    interface Options {
        lock: boolean;
        text: string;
        background: string;
    };
    const options = {
        lock: true,
        text: "加载中...",
        background: 'rgba(0,0,0,0.7)'
    };
    loading = ElLoading.service(options);
}

const endLoading = () => {
    loading.close();
}

//请求拦截
axios.interceptors.request.use((config:AxiosRequestConfig) => {
    startLoading();//加载动画
    return config;
})

// 响应拦截
axios.interceptors.response.use((response:AxiosResponse<any>) => {
    endLoading();
    return response;
}, error => {
    //错误提醒
    endLoading();
    return Promise.reject(error);
})

export default axios;
