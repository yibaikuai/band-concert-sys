import {request} from "@/api/request";

export function addFanApi(fanInfo){
    return request({
        method:'POST',
        url:'/api/fan/addFan',
        data:fanInfo
    })
}

export function editFanApi(data){
    return request({
        method:'PUT',
        url:'/api/fan/editFan',
        data:data
    })
}

export function deleteFanApi(id){
    return request({
        method:'DELETE',
        url:'/api/fan/deleteFan',
        data:{
            id
        }
    })
}

export function getFanOverLookApi(){
    return request({
        method:'GET',
        url:'/api/fan/getFanOverLook'
    })
}