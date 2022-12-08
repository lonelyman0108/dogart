import axios from '../request';

//获取登录状态
export const checkLogin = () => {
    return axios({
        url: "/admin/checkLogin",
        method: "get",
        config: {
            timeout: 10000
        }
    })
}

//登录
export const login = (data) => {
    return axios({
        url: "/admin/login",
        method: "post",
        data: data,
        config: {
            timeout: 10000
        }
    })
}

//获取语录
export const wordsList = () => {
    return axios({
        url: "/admin/words",
        method: "get",
        config: {
            timeout: 10000
        }
    })
}

//获取日记
export const diaryList = () => {
    return axios({
        url: "/admin/diary",
        method: "get",
        config: {
            timeout: 10000
        }
    })
}

//修改语录审核状态
export const changeWordsFlag = (data) => {
    return axios({
        url: "/admin/words/changeFlag?id=" + data.id + "&flag=" + data.flag,
        method: "post",
        data: null,
        config: {
            timeout: 10000
        }
    })
}

//修改日记审核状态
export const changeDiaryFlag = (data) => {
    return axios({
        url: "/admin/diary/changeFlag?id=" + data.id + "&flag=" + data.flag,
        method: "post",
        data: null,
        config: {
            timeout: 10000
        }
    })
}