import axios from 'axios'
export const getWeather = () => {
    return axios.get(
        'https://api.vvhan.com/api/weather'
    ).then(res => res.data)
}