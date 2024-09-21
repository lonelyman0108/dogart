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

export const adminGetWords = () => {
    return axios({
        url: '/admin/words',
        method: 'get'
    })
}

export const adminChangeWordsFlag = (id, flag) => {
    return axios({
        url: '/admin/words/changeFlag',
        method: 'post',
        params: {
            id,
            flag
        }
    })
}

export const adminDeleteWords = (id) => {
    return axios({
        url: '/admin/words',
        method: 'delete',
        params: {
            id
        }
    })
}