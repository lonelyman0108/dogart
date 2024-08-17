import axiosInstance from "@/request/axiosConfig.js";

const axios = ({
                   url,
                   method,
                   params,
                   data,
                   config = {}
               }) => {
    method = method.toLowerCase();
    switch (method) {
        case 'get':
            return axiosInstance.get(
                url,
                {
                    params,
                    ...config
                });
        case 'post':
            return axiosInstance.post(
                url,
                data,
                {
                    params,
                    ...config
                }
            );
        case 'put':
            return axiosInstance.put(
                url,
                data,
                {
                    params,
                    ...config
                }
            );
        default:
            return axiosInstance.request({
                url,
                method,
                params,
                data,
                ...config
            });
    }
}

export default axios;