import axios from '@/request'

export const getWords = () => {
    return axios({
        url: '/words',
        method: 'get'
    })
}

export const lickWords = (id) => {
    return axios({
        url: '/words/lick',
        method: 'post',
        params: {
            id
        }
    })
}

export const postWords = (content) => {
    return axios({
        url: '/words',
        method: 'post',
        data: {
            content
        }
    })
}