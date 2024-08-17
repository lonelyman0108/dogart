import axios from '@/request'

export const getDiary = () => {
    return axios({
        url: '/diary',
        method: 'get'
    })
}

export const lickDiary = (id) => {
    return axios({
        url: '/diary/lick',
        method: 'post',
        params: {
            id
        }
    })
}

export const postDiary = (content) => {
    return axios({
        url: '/diary',
        method: 'post',
        data: {
            content
        }
    })
}