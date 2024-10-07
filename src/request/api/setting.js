import axios from "@/request/index.js";

export const listSettingTypes = () => {
    return axios({
        url: 'admin/setting/types',
        method: 'get'
    })
}

export const listSettingOptions = (typeName) => {
    return axios({
        url: 'admin/setting/options',
        method: 'get',
        params: {
            typeName
        }
    })
}

export const updateSettingOption = (optionName, itemValues) => {
    return axios({
        url: 'admin/setting/option',
        method: 'post',
        data: {
            optionName,
            itemValues
        }
    })
}

export const getSettingOptionForm = (optionName) => {
    return axios({
        url: 'admin/setting/optionForm',
        method: 'get',
        params: {
            optionName
        }
    })
}