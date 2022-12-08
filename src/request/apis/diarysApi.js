import axios from "../request"

//get
export const getDiary = () => {
    return axios({
        url: "/diary",
        method: "get",
        config: {
            timeout: 10000
        }
    })
}
//舔一舔提交
export const lickDiary = (data) => {
    return axios({
        url: "/diary/lick?id=" + data.id,
        method: "post",
        data: null,
        config: {
            timeout: 10000
        }
    })
}
//日记投稿
export const postDiary = (data) => {
    return axios({
        url: "/diary",
        method: "post",
        data: data,
        config: {
            timeout: 10000
        }
    })
}
