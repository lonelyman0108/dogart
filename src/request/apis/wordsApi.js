import axios from "../request"

//获取语录
export const getWords = () => {
    return axios({
        url: "/words",
        method: "get",
        config: {
            timeout: 10000
        }
    })
}
//舔一舔提交
export const lickWords = (data) => {
    return axios({
        url: "/words/lick",
        method: "post",
        data: data,
        config: {
            timeout: 10000
        }
    })
}
//语录投稿
export const postWords = (data) => {
    return axios({
        url: "/words",
        method: "post",
        data: data,
        config: {
            timeout: 10000
        }
    })
}
