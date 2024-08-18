import axios from "axios";

import {ElLoading, ElMessage} from "element-plus";

import router from "@/router";

let axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;'
    }
})

let loadingInstance;
let currentRequestCount = 0;

const showLoading = () => {
    if (currentRequestCount === 0) {
        loadingInstance = ElLoading.service({
            fullscreen: true,
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.7)'
        })
    }
    currentRequestCount++;
}

const hideLoading = () => {
    currentRequestCount--;
    if (currentRequestCount === 0) {
        loadingInstance.close()
    }
}

axiosInstance.interceptors.request.use(
    config => {
        showLoading();
        const token = window.localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        if (config.method === 'post') {
            config.data = JSON.stringify(config.data);
        }
        return config;
    },
    error => {
        hideLoading();
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    response => {
        hideLoading();
        const code = response.data.code;
        let message;
        switch (code) {
            case 200:
                return response.data;
            case 400:
                message = "请求错误";
                break;
            case 401:
                message = "未授权操作，请登录";
                router.push('login');
                break;
            case 404:
                message = "请求地址出错";
                break;
            case 408:
                message = "请求超时";
                break;
            case 500:
                message = "服务器内部错误";
                break;
            case 501:
                message = "服务未实现";
                break;
            case 502:
                message = "网关错误";
                break;
            case 503:
                message = "服务不可用";
                break;
            case 504:
                message = "网关超时";
                break;
            case 505:
                message = "HTTP版本不受支持";
                break;
            default:
                message = "请求失败";
        }
        ElMessage.error(message);
    },
    error => {
        hideLoading();
    }
)

export default axiosInstance;


