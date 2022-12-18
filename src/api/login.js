import {request} from "@/api/request";

export function login(data){
    return request({
        method:'POST',
        url:'/api/login',
        data
    })
}

export function create(data) {
    return request({
        method: 'POST',
        url: '/api/user/register',
        data,
    })
}

export function loginOut(){
    return request({
        method:'POST',
        url:'/api/user/logout'
    })
}

export function reset(data){
    return request({
        method:'POST',
        url:'/api/user/forget',
        data
    })
}