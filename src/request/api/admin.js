import axios from '@/request'

export const login = (username, password) => {
    return axios({
        url: '/admin/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}