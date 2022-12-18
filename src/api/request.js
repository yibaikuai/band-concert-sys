import axios from "axios"

import {hideFullScreenLoading, showFullScreenLoading} from '@/utils/loading'
import {ElMessage} from "element-plus";

export function request(config) {
    const instance = axios.create({
        baseURL:'http://localhost:4000'
    })
    instance.interceptors.request.use(
        config=>{
            showFullScreenLoading()
            return config
        }
    )
    instance.interceptors.response.use(
        (response) => {
            hideFullScreenLoading()
            if(response.data.code!==0){
                ElMessage.error(response.data.msg)
                return Promise.reject()
            }
            return response
        },
        ({ response }) => {
            hideFullScreenLoading()
            return Promise.reject('网络异常，请检查后端服务是否启动')
        },
    )
    return instance(config)
}

