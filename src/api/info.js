import {request} from "@/api/request";

export function getList(page,limit,type){
    return request({
        method:'GET',
        url:'/api/list',
        params:{
            page:page,
            limit:limit,
            type:type
        }
    })
}