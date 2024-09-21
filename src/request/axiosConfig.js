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
            case 401:
                message = "未授权操作，请登录";
                window.localStorage.removeItem('token')
                router.push({path: '/login'});
                break;
            default:
                message = response.data.msg;
        }
        ElMessage.error(message);
    },
    error => {
        hideLoading();
    }
)

export default axiosInstance;


