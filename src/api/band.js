import {request} from "@/api/request";

export function addBandApi(bandInfo){
    return request({
        method:'POST',
        url:'/api/band/addBand',
        data:bandInfo
    })
}

export function editBandApi(data){
    return request({
        method:'PUT',
        url:'/api/band/editBand',
        data:data
    })
}

export function deleteBandApi(bandName){
    return request({
        method:'DELETE',
        url:'/api/band/deleteBand',
        data:{
            bandName
        }
    })
}

export function addMemberApi(data){
    return request({
        method:'POST',
        url:'/api/band/addMember',
        data:data
    })
}

export function editMemberApi(data){
    return request({
        method:'PUT',
        url:'/api/band/editMember',
        data:data
    })
}

export function deleteMemberApi(id){
    return request({
        method:'DELETE',
        url:'/api/band/deleteMember',
        data:{
            id
        }
    })
}