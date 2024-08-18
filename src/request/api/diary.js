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

export const adminGetDiaries = () => {
    return axios({
        url: '/admin/diary',
        method: 'get'
    })
}

export const adminChangeDiaryFlag = (id, flag) => {
    return axios({
        url: '/admin/diary/changeFlag',
        method: 'post',
        params: {
            id,
            flag
        }
    })
}